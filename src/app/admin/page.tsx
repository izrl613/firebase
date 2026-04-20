import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock, Terminal, Activity, Server, Users, EyeOff } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function AdminPortal() {
  return (
    <div className="space-y-8 animate-in fade-in duration-1000">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="font-headline text-3xl font-bold tracking-tighter text-white">ADMIN SOVEREIGN ENCLAVE</h2>
          <p className="text-foreground/60 font-medium">Backend Security & Infrastructure Monitoring</p>
        </div>
        <Badge variant="outline" className="border-neon-orange text-neon-orange font-bold px-4 py-1">ADMIN: idin@agape.nyc</Badge>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Sessions", value: "1,284", icon: Users, color: "text-neon-blue" },
          { label: "AI Inference Latency", value: "420ms", icon: Activity, color: "text-neon-magenta" },
          { label: "Encrypted Shards", value: "15,892", icon: Lock, color: "text-neon-orange" },
          { label: "Node Health", value: "99.99%", icon: Server, color: "text-neon-blue" },
        ].map((stat) => (
          <Card key={stat.label} className="glass-panel border-white/5">
            <CardHeader className="p-4 pb-2">
              <div className="flex items-center gap-3">
                <stat.icon size={16} className={stat.color} />
                <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/50">{stat.label}</span>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
               <p className="text-2xl font-headline font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="glass-panel border-white/5">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="font-headline text-lg">WebAuthn Audit Logs</CardTitle>
              <CardDescription>Passkey authentication events</CardDescription>
            </div>
            <Lock size={18} className="text-neon-orange" />
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="text-foreground/50 uppercase text-[10px] font-bold">Timestamp</TableHead>
                  <TableHead className="text-foreground/50 uppercase text-[10px] font-bold">Action</TableHead>
                  <TableHead className="text-foreground/50 uppercase text-[10px] font-bold">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { time: "2024-05-20 14:22:01", action: "PASSKEY_VERIFY", status: "SUCCESS" },
                  { time: "2024-05-20 13:45:12", action: "ENROLLMENT_REQ", status: "PENDING" },
                  { time: "2024-05-20 12:10:05", action: "FEDERATED_BIND", status: "SUCCESS" },
                  { time: "2024-05-20 10:30:44", action: "PASSKEY_VERIFY", status: "SUCCESS" },
                  { time: "2024-05-20 09:12:18", action: "REVOCATION_REQ", status: "DENIED" },
                ].map((log, i) => (
                  <TableRow key={i} className="border-white/5 hover:bg-white/5">
                    <TableCell className="text-xs font-mono">{log.time}</TableCell>
                    <TableCell className="text-xs font-bold">{log.action}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`text-[10px] border-none font-bold ${log.status === 'SUCCESS' ? 'text-neon-blue' : log.status === 'PENDING' ? 'text-neon-orange' : 'text-neon-magenta'}`}>
                        {log.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="glass-panel border-white/5">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="font-headline text-lg">System Terminal</CardTitle>
              <CardDescription>Cloud Run & Firestore Operations</CardDescription>
            </div>
            <Terminal size={18} className="text-neon-blue" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-black/40 rounded-xl p-4 font-mono text-xs space-y-2 border border-white/5">
               <p className="text-neon-blue"># systemctl status architect-ai-engine</p>
               <p className="text-foreground/70">● architect-ai-engine.service - Architect AI Core Intelligence</p>
               <p className="text-foreground/70">   Loaded: loaded (/etc/systemd/system/architect-ai-engine.service; enabled; vendor preset: enabled)</p>
               <p className="text-foreground/70">   Active: active (running) since Mon 2024-05-20 08:00:01 UTC; 6h ago</p>
               <p className="text-neon-magenta mt-4">[ENCRYPTION] Zero-plaintext enforcement ACTIVE</p>
               <p className="text-neon-orange">[COMPLIANCE] ECRA 2026 Audit Trail verified</p>
               <p className="text-neon-blue animate-pulse">_</p>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/5">
               <EyeOff className="text-foreground/40" />
               <p className="text-xs text-foreground/60 italic">Privacy Shield active. Raw user data is obscured by SHA256 hashes in this view.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}