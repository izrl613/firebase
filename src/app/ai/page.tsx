"use client"

import * as React from "react"
import { Send, Bot, User, Sparkles, ShieldAlert, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { architectAISecurityChat } from "@/ai/flows/architect-ai-security-chat"

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function AIChatPage() {
  const [messages, setMessages] = React.useState<Message[]>([
    { role: 'assistant', content: 'Greeting. I am Architect AI, your Digital Identity Federated Footprint intelligence agent. How may I secure your sovereignty today?' }
  ])
  const [input, setInput] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMsg = input
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMsg }])
    setIsLoading(true)

    try {
      const response = await architectAISecurityChat(userMsg)
      setMessages(prev => [...prev, { role: 'assistant', content: response }])
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "An error occurred in the intelligence enclave. Please verify your passkey and try again." }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-120px)] flex flex-col space-y-6 animate-in slide-in-from-bottom-4 duration-700">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="font-headline text-3xl font-bold tracking-tighter text-white">ARCHITECT AI ENGINE</h2>
          <p className="text-foreground/60 font-medium">Conversational Digital Sovereignty Intelligence</p>
        </div>
        <div className="flex gap-2">
           <div className="px-3 py-1 rounded-full bg-neon-blue/10 border border-neon-blue/20 text-[10px] font-bold text-neon-blue uppercase">Model: Gemini 2.5 Flash</div>
        </div>
      </header>

      <Card className="flex-1 glass-panel border-white/5 relative overflow-hidden flex flex-col">
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-neon-magenta via-neon-blue to-neon-orange opacity-50"></div>
        
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-6">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-4 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`size-10 rounded-xl flex items-center justify-center shrink-0 ${m.role === 'user' ? 'bg-neon-magenta/20 border border-neon-magenta/40' : 'bg-neon-blue/20 border border-neon-blue/40'}`}>
                  {m.role === 'user' ? <User className="text-neon-magenta" size={20} /> : <Bot className="text-neon-blue" size={20} />}
                </div>
                <div className={`max-w-[80%] p-4 rounded-2xl ${m.role === 'user' ? 'bg-neon-magenta/10 rounded-tr-none' : 'bg-white/5 rounded-tl-none border border-white/5'}`}>
                  <p className="text-sm leading-relaxed">{m.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-4">
                <div className="size-10 rounded-xl bg-neon-blue/20 border border-neon-blue/40 flex items-center justify-center shrink-0">
                  <Bot className="text-neon-blue animate-pulse" size={20} />
                </div>
                <div className="max-w-[80%] p-4 rounded-2xl bg-white/5 rounded-tl-none border border-white/5">
                  <div className="flex gap-1">
                    <span className="size-1.5 bg-neon-blue rounded-full animate-bounce"></span>
                    <span className="size-1.5 bg-neon-blue rounded-full animate-bounce delay-100"></span>
                    <span className="size-1.5 bg-neon-blue rounded-full animate-bounce delay-200"></span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-6 border-t border-white/5">
          <div className="flex gap-2">
            <Input 
              placeholder="Ask anything about security, privacy, or your DIFF..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="bg-white/5 border-white/10 h-12 text-white"
            />
            <Button 
              size="icon" 
              className="h-12 w-12 bg-neon-blue hover:bg-neon-blue/80 text-black neon-pulse"
              onClick={handleSend}
            >
              <Send size={18} />
            </Button>
          </div>
          <div className="mt-3 flex gap-4">
            <button className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 hover:text-neon-magenta transition-colors">NUKED GUIDANCE</button>
            <button className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 hover:text-neon-blue transition-colors">KNOXED HARDENING</button>
            <button className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 hover:text-neon-orange transition-colors">DIFF AUDIT</button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-4">
        <div className="p-4 rounded-xl glass-panel border border-neon-magenta/20 flex items-center gap-4 group cursor-pointer hover:bg-neon-magenta/5 transition-all">
          <div className="p-2 rounded-lg bg-neon-magenta/10 group-hover:bg-neon-magenta/20">
            <ShieldAlert className="text-neon-magenta" size={20} />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest">NUKED Scan</h4>
            <p className="text-[10px] text-foreground/50">Find critical leaks</p>
          </div>
        </div>
        <div className="p-4 rounded-xl glass-panel border border-neon-blue/20 flex items-center gap-4 group cursor-pointer hover:bg-neon-blue/5 transition-all">
          <div className="p-2 rounded-lg bg-neon-blue/10 group-hover:bg-neon-blue/20">
            <ShieldCheck className="text-neon-blue" size={20} />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest">KNOXED Check</h4>
            <p className="text-[10px] text-foreground/50">Verify encryption</p>
          </div>
        </div>
        <div className="p-4 rounded-xl glass-panel border border-neon-orange/20 flex items-center gap-4 group cursor-pointer hover:bg-neon-orange/5 transition-all">
          <div className="p-2 rounded-lg bg-neon-orange/10 group-hover:bg-neon-orange/20">
            <Sparkles className="text-neon-orange" size={20} />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest">DIFF Summary</h4>
            <p className="text-[10px] text-foreground/50">AI Posture Report</p>
          </div>
        </div>
      </div>
    </div>
  )
}