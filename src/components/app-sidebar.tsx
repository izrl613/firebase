"use client"

import * as React from "react"
import {
  ShieldCheck,
  Zap,
  Mail,
  Share2,
  Smartphone,
  Laptop,
  Globe,
  Database,
  Search,
  Key,
  Fingerprint,
  Lock,
  UserCheck,
  Network,
  Trash2,
  FileText,
  LayoutDashboard
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"

const groups = [
  {
    label: "Main",
    items: [
      { title: "Enclave Dashboard", url: "/", icon: LayoutDashboard },
      { title: "Architect AI", url: "/ai", icon: Zap },
    ]
  },
  {
    label: "Identity & Communication",
    items: [
      { title: "Email Breach Scanner", url: "/modules/email-breach", icon: Mail },
      { title: "Email Metadata Analyzer", url: "/modules/email-metadata", icon: Database },
      { title: "Username Footprint", url: "/modules/usernames", icon: Fingerprint },
    ]
  },
  {
    label: "Social & Presence",
    items: [
      { title: "Social Post Scanner", url: "/modules/social-posts", icon: Share2 },
      { title: "Account Reuse Detection", url: "/modules/account-reuse", icon: UserCheck },
      { title: "Public Identity Indexing", url: "/modules/public-id", icon: Globe },
      { title: "Reputation Vulnerability", url: "/modules/reputation", icon: ShieldCheck },
    ]
  },
  {
    label: "Devices & Cloud",
    items: [
      { title: "Local Device File Scan", url: "/modules/local-files", icon: FileText },
      { title: "Cloud Storage Scan", url: "/modules/cloud-files", icon: Search },
      { title: "Mobile OS Posture", url: "/modules/mobile-security", icon: Smartphone },
      { title: "Laptop Security", url: "/modules/laptop-security", icon: Laptop },
    ]
  },
  {
    label: "Privacy Control",
    items: [
      { title: "2FA Enforcement", url: "/modules/2fa", icon: Lock },
      { title: "Deep Web Monitoring", url: "/modules/deep-web", icon: Network },
      { title: "Data Broker Removal", url: "/modules/data-brokers", icon: Trash2 },
      { title: "Sovereign Score Auditor", url: "/modules/sovereign-audit", icon: Key },
    ]
  }
]

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-r border-white/5 bg-card/80 backdrop-blur-xl">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-gradient-to-br from-neon-magenta via-neon-blue to-neon-orange p-[2px] neon-pulse">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-background">
              <ShieldCheck className="text-neon-blue" size={24} />
            </div>
          </div>
          <div>
            <h1 className="font-headline font-bold text-lg tracking-tight">ARCHITECT AI</h1>
            <p className="text-[10px] font-medium text-neon-magenta uppercase tracking-widest">Agape Sovereign</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {groups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel className="font-headline text-xs font-semibold uppercase tracking-widest text-foreground/40 px-6 py-2">
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={pathname === item.url}
                      className="px-6 py-5 group transition-all duration-300 hover:bg-white/5"
                    >
                      <Link href={item.url}>
                        <item.icon className={`transition-colors duration-300 ${pathname === item.url ? 'text-neon-blue' : 'text-foreground/60 group-hover:text-neon-magenta'}`} />
                        <span className={`font-medium tracking-tight ${pathname === item.url ? 'text-white' : 'text-foreground/60 group-hover:text-white'}`}>
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarSeparator className="bg-white/5" />
      <div className="p-6 mt-auto">
        <div className="p-4 rounded-xl glass-panel border border-neon-blue/20">
          <p className="text-[10px] font-bold text-neon-blue uppercase mb-1">DIFF Status</p>
          <div className="flex items-center justify-between">
            <span className="text-xs font-headline">SOVEREIGN SCORE</span>
            <span className="text-lg font-bold text-neon-orange font-headline">84%</span>
          </div>
        </div>
      </div>
    </Sidebar>
  )
}