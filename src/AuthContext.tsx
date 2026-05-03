import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth, db, loginWithGoogle, loginAnonymously, logout } from './firebase';
import { doc, getDoc, setDoc, onSnapshot, serverTimestamp, updateDoc } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from './utils/firestoreErrorHandler';
import { logEvent, AuditLogType } from './services/auditService';
import { initializeRemoteConfig } from './services/remoteConfigService';
import { updateProfile as firebaseUpdateProfile } from 'firebase/auth';

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  isAnonymous: boolean;
  sovereignScore: number;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  emergencyBypass: () => Promise<void>;
  bindPasskey: () => Promise<void>;
  updateProfile: (data: Record<string, unknown>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [sovereignScore, setSovereignScore] = useState(100);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeUserDoc: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Initialize Remote Config for the user
        initializeRemoteConfig();
        
        const userRef = doc(db, 'users', currentUser.uid);
        
        try {
          const userSnap = await getDoc(userRef);
          
          const isSuperAdmin = currentUser.email === 'idin@agape.nyc' || currentUser.email === 'agape@sovereign.nyc' || currentUser.isAnonymous;
          
          if (!userSnap.exists()) {
            try {
              await setDoc(userRef, {
                uid: currentUser.uid,
                email: currentUser.email || 'unknown@example.com',
                displayName: currentUser.displayName || '',
                role: isSuperAdmin ? 'admin' : 'user',
                createdAt: serverTimestamp(),
                sovereignScore: 100
              });
              logEvent(AuditLogType.USER_REGISTERED, `New user registered: ${currentUser.email}`, currentUser.uid, currentUser.email || undefined);
            } catch (err) {
              handleFirestoreError(err, OperationType.CREATE, `users/${currentUser.uid}`);
            }
            setIsAdmin(isSuperAdmin);
            setSovereignScore(100);
          } else {
            setIsAdmin(userSnap.data().role === 'admin' || isSuperAdmin);
            setSovereignScore(userSnap.data().sovereignScore || 100);
            logEvent(AuditLogType.USER_LOGIN, `User logged in: ${currentUser.email}`, currentUser.uid, currentUser.email || undefined);
          }

          unsubscribeUserDoc = onSnapshot(userRef, (doc) => {
            if (doc.exists()) {
              setSovereignScore(doc.data().sovereignScore || 100);
              setIsAdmin(doc.data().role === 'admin' || isSuperAdmin);
            }
          }, (error) => {
            handleFirestoreError(error, OperationType.GET, `users/${currentUser.uid}`);
          });
        } catch (err) {
          handleFirestoreError(err, OperationType.GET, `users/${currentUser.uid}`);
        }
      } else {
        setIsAdmin(false);
        setSovereignScore(100);
        if (unsubscribeUserDoc) unsubscribeUserDoc();
      }
      setLoading(false);
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeUserDoc) unsubscribeUserDoc();
    };
  }, []);

  const handleLogin = async () => {
    await loginWithGoogle();
  };

  const handleLogout = async () => {
    await logout();
  };

  const handleEmergencyBypass = async () => {
    try {
      await loginAnonymously();
    } catch (err: unknown) {
      if (err instanceof Error) {
        const firebaseError = err as { code?: string, message: string };
        if (firebaseError.code === 'auth/firebase-app-check-token-is-invalid' || firebaseError.code === 'auth/firebase-app-check-token-is-invalid.' || firebaseError.message?.includes('app-check')) {
          console.log("Falling back to local mock bypass due to App Check enforcement");
          const mockUser = {
            uid: 'emergency-bypass-admin-999',
            email: 'idin@agape.nyc', // Treat as super admin
            displayName: 'Sovereign Admin (Bypass)',
            photoURL: '',
            emailVerified: true,
            isAnonymous: true,
            metadata: {},
            providerData: [],
            refreshToken: '',
            tenantId: null,
            delete: async () => {},
            getIdToken: async () => '',
            getIdTokenResult: async () => ({} as import('firebase/auth').IdTokenResult),
            reload: async () => {},
            toJSON: () => ({}),
          } as unknown as User;
          
          setUser(mockUser);
          setIsAdmin(true);
          setSovereignScore(100);
          setLoading(false);
        } else {
          console.error("Emergency bypass failed", err);
          throw err;
        }
      } else {
        console.error("Emergency bypass failed", err);
        throw err;
      }
    }
  };

  const handleBindPasskey = async () => {
    console.log("Bind passkey not implemented");
  };

  const handleUpdateProfile = async (data: { displayName?: string, photoURL?: string }) => {
    if (!user) return;
    try {
      // Update Firebase Auth profile
      await firebaseUpdateProfile(user, data);
      
      // Update Firestore user document
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        ...data,
        updatedAt: serverTimestamp()
      });
      
      logEvent(AuditLogType.USER_PROFILE_UPDATED, `User profile updated: ${Object.keys(data).join(', ')}`, user.uid, user.email || undefined);
    } catch (error) {
      console.error("Error updating profile:", error);
      handleFirestoreError(error, OperationType.UPDATE, `users/${user.uid}`);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAdmin, 
      isAnonymous: user?.isAnonymous || false,
      sovereignScore, 
      loading, 
      login: handleLogin, 
      logout: handleLogout, 
      emergencyBypass: handleEmergencyBypass,
      bindPasskey: handleBindPasskey,
      updateProfile: handleUpdateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
