import React from "react";
import { Search, Wallet, Coins, Trophy, BarChart3, Menu, Bell, ShieldCheck, LogOut, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../lib/utils";

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userBalance: { cNGN: number; aCoins: number };
}

export function Layout({ children, activeTab, setActiveTab, userBalance }: LayoutProps) {
  const [isSidebarOpen, setSidebarOpen] = React.useState(true);

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "discovery", label: "Talent Discovery", icon: Search },
    { id: "investment", label: "Marketplace", icon: Wallet },
    { id: "engagement", label: "Fan Zone", icon: Trophy },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 flex font-sans overflow-hidden">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 bg-white border-r border-zinc-200/50 transition-all duration-300 ease-in-out md:static flex flex-col",
          isSidebarOpen ? "w-64 translate-x-0" : "-translate-x-full hidden md:flex md:w-20 md:translate-x-0"
        )}
      >
        <div className="h-20 flex items-center justify-between px-6 border-b border-zinc-100 shrink-0">
           <div className="flex items-center gap-2.5">
             <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center">
               <ShieldCheck className="h-5 w-5 text-emerald-400" />
             </div>
             <span className={cn("font-display text-xl font-bold tracking-tight text-zinc-900", !isSidebarOpen && "md:hidden")}>
               AthleteX<span className="text-emerald-500">.</span>
             </span>
           </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-8 flex flex-col gap-1.5 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "flex items-center gap-3.5 rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-200 group",
                  isActive
                    ? "bg-zinc-900 text-white shadow-md shadow-zinc-900/10"
                    : "text-zinc-500 hover:bg-zinc-100/80 hover:text-zinc-900",
                  !isSidebarOpen && "md:justify-center"
                )}
              >
                <Icon className={cn("h-5 w-5 shrink-0 transition-transform group-hover:scale-110", isActive ? "text-emerald-400" : "opacity-70 group-hover:opacity-100")} />
                <span className={cn(!isSidebarOpen && "md:hidden whitespace-nowrap")}>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className={cn("p-4 border-t border-zinc-100", !isSidebarOpen && "md:hidden")}>
           <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-200/50">
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1">Purchasing Power</p>
              <p className="font-display text-xl font-bold text-zinc-900 mb-4">₦ {userBalance.cNGN.toLocaleString()}</p>
              <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl py-2.5 text-sm font-bold transition-all active:scale-[0.98] shadow-sm">Deposit cNGN</button>
           </div>
           <button 
             onClick={() => setActiveTab('landing')}
             className="mt-4 flex items-center gap-2 text-zinc-400 hover:text-zinc-600 text-sm font-medium transition-colors w-full justify-center"
           >
              <LogOut className="h-4 w-4" /> Back to Home
           </button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden relative">
        {/* Simplified Header */}
        <header className="sticky top-0 z-30 flex h-20 w-full items-center justify-between bg-[#FAFAFA]/80 backdrop-blur-xl px-4 sm:px-8 border-b border-zinc-200/50">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="rounded-xl p-2.5 bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-600 focus:outline-none transition-colors shadow-sm"
            >
              {isSidebarOpen ? <Menu className="h-4 w-4 md:hidden" /> : <ChevronRight className="h-4 w-4 hidden md:block" />}
              {isSidebarOpen && <ChevronLeft className="h-4 w-4 hidden md:block" />}
            </button>
            <h2 className="font-display text-2xl font-bold text-zinc-900 hidden sm:block">
              {navItems.find(i => i.id === activeTab)?.label}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-2 sm:flex">
              <div className="flex items-center gap-1.5 rounded-full bg-orange-100/50 border border-orange-200 px-3 py-1.5 text-sm font-bold text-orange-700">
                <Coins className="h-4 w-4 text-orange-500" />
                <span>{userBalance.aCoins.toLocaleString()} A</span>
              </div>
            </div>
            <button className="h-10 w-10 flex items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-600 shadow-sm hover:bg-zinc-50 relative transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
            </button>
            <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-white shadow-md bg-zinc-100">
              <img src="https://picsum.photos/seed/user/100/100" alt="Avatar" className="h-full w-full object-cover" />
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto w-full no-scrollbar">
          <div className="max-w-6xl mx-auto p-4 sm:p-8 lg:p-10 transition-all duration-300">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
