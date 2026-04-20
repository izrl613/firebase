import type {Metadata} from 'next';
import './globals.css';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'Architect AI | Digital Sovereignty',
  description: 'Agape Sovereign Enclave 2026 - Digital Identity Federated Footprint Intelligence',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground overflow-x-hidden">
        <SidebarProvider>
          <div className="flex min-h-screen w-full relative">
            <AppSidebar />
            <main className="flex-1 overflow-y-auto relative z-10 p-4 md:p-8">
              {children}
            </main>
            {/* Visual Edge Border */}
            <div className="fixed inset-0 pointer-events-none border-[1px] border-white/5 z-50">
               <div className="absolute inset-0 bg-gradient-to-r from-neon-magenta via-neon-blue to-neon-orange opacity-10 blur-xl"></div>
            </div>
          </div>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}