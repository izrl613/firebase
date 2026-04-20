import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldAlert, ShieldCheck, Activity, Fingerprint, Lock, Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function Home() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="font-headline text-4xl font-bold tracking-tighter text-white">ENCLAVE DASHBOARD</h2>
          <p className="text-foreground/60 font-medium">Digital Identity Federated Footprint (DIFF) Intelligence</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="border-neon-magenta text-neon-magenta px-4 py-1 font-bold">LIVE SCAN ACTIVE</Badge>
          <div className="size-12 rounded-full border border-neon-blue/30 flex items-center justify-center bg-neon-blue/5">
             <Activity className="text-neon-blue animate-pulse" />
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-panel border-neon-magenta/20 overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
            <ShieldAlert size={80} className="text-neon-magenta" />
          </div>
          <CardHeader>
            <CardTitle className="font-headline text-sm font-bold uppercase tracking-widest text-neon-magenta">NUKED ITEMS</CardTitle>
            <CardDescription className="font-headline text-4xl font-extrabold text-white">14</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-foreground/50 font-medium">Critical exposures requiring immediate remediation or deletion.</p>
          </CardContent>
        </Card>

        <Card className="glass-panel border-neon-blue/20 overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
            <ShieldCheck size={80} className="text-neon-blue" />
          </div>
          <CardHeader>
            <CardTitle className="font-headline text-sm font-bold uppercase tracking-widest text-neon-blue">KNOXED ITEMS</CardTitle>
            <CardDescription className="font-headline text-4xl font-extrabold text-white">42</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-foreground/50 font-medium">Verified secured elements protected by passkeys and encryption.</p>
          </CardContent>
        </Card>

        <Card className="glass-panel border-neon-orange/20 overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
            <Zap size={80} className="text-neon-orange" />
          </div>
          <CardHeader>
            <CardTitle className="font-headline text-sm font-bold uppercase tracking-widest text-neon-orange">SOVEREIGN SCORE</CardTitle>
            <CardDescription className="font-headline text-4xl font-extrabold text-white">84%</CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={84} className="h-2 mb-2 bg-white/5" />
            <p className="text-xs text-foreground/50 font-medium">Global security posture relative to ECRA 2026 standards.</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="glass-panel border-white/5">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="font-headline text-xl">Identity Vector Health</CardTitle>
                <CardDescription>Real-time analysis of the 16 DIFF modules</CardDescription>
              </div>
              <Activity size={20} className="text-neon-blue" />
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Identity & Comm", value: 92, color: "text-neon-blue" },
                { label: "Social Presence", value: 65, color: "text-neon-magenta" },
                { label: "Hardware/Devices", value: 88, color: "text-neon-orange" },
                { label: "Cloud Integrity", value: 74, color: "text-neon-blue" },
              ].map((item) => (
                <div key={item.label} className="space-y-1">
                  <div className="flex justify-between text-xs font-bold uppercase">
                    <span>{item.label}</span>
                    <span className={item.color}>{item.value}%</span>
                  </div>
                  <Progress value={item.value} className="h-1.5 bg-white/5" />
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <Card className="glass-panel border-white/5 bg-gradient-to-br from-neon-blue/10 to-transparent">
                <CardHeader>
                  <CardTitle className="font-headline text-lg flex items-center gap-2">
                    <Fingerprint className="text-neon-blue" /> SHA256 Integrity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs font-mono text-foreground/70 break-all bg-black/30 p-3 rounded-lg border border-white/5">
                    a1e4c76d29b8c5e3f1a0d9c8b7a6f5e4d3c2b1a0987654321fedcba987654321
                  </p>
                  <p className="mt-2 text-[10px] text-foreground/40 font-bold uppercase tracking-widest">Master Identity Hash Verified</p>
                </CardContent>
             </Card>
             <Card className="glass-panel border-white/5 bg-gradient-to-br from-neon-orange/10 to-transparent">
                <CardHeader>
                  <CardTitle className="font-headline text-lg flex items-center gap-2">
                    <Lock className="text-neon-orange" /> Enclave Storage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <p className="text-sm font-bold">2.4 GB Protected</p>
                      <p className="text-xs text-foreground/40">Zero-knowledge encrypted</p>
                    </div>
                    <Badge variant="secondary" className="bg-neon-orange/20 text-neon-orange border-none uppercase font-bold text-[10px]">AES-256</Badge>
                  </div>
                </CardContent>
             </Card>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="glass-panel border-neon-blue/20 bg-neon-blue/5 h-full">
            <CardHeader>
              <CardTitle className="font-headline text-xl">Architect AI Advice</CardTitle>
              <CardDescription>AI-generated security recommendations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2 relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-neon-magenta"></div>
                <h4 className="font-bold text-xs uppercase tracking-widest text-neon-magenta">High Priority</h4>
                <p className="text-sm">Metadata detected in 42 social media posts. Suggest NUKED action to strip geolocation data.</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2 relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-neon-orange"></div>
                <h4 className="font-bold text-xs uppercase tracking-widest text-neon-orange">Improvement</h4>
                <p className="text-sm">Laptop encryption is active, but fallback keys are not in a vault. Suggest KNOXED hardening.</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2 relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-neon-blue"></div>
                <h4 className="font-bold text-xs uppercase tracking-widest text-neon-blue">Privacy Insight</h4>
                <p className="text-sm">Your username "enigma2k" is mapped to 8 data brokers. Launch removal requests engine.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}