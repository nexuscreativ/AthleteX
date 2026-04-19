import React, { useState } from 'react';
import { Trophy, Flame, Gift, Coins, CheckCircle2, Ticket, Search, ArrowRight } from 'lucide-react';
import { mockUser } from '../data/mockData';

export function FanEngagement() {
  const [predicted, setPredicted] = useState<string | null>(null);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in relative z-0">
      <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
        <div>
          <h1 className="page-title mb-2">Rewards Zone.</h1>
          <p className="text-zinc-500 font-medium text-sm sm:text-base">Predict match outcomes and earn A-Coins on Solana.</p>
        </div>
        <div className="premium-glass p-1.5 pl-4 rounded-2xl flex items-center gap-4 w-full md:w-auto">
           <div className="flex flex-col">
             <span className="metric-label text-orange-600/70">A-Coins Balance</span>
             <span className="font-display font-bold text-xl text-orange-600 leading-none">{mockUser.balances.aCoins.toLocaleString()}</span>
           </div>
           <button className="bg-orange-50/50 hover:bg-orange-100/50 border border-orange-200 text-orange-600 p-3 rounded-xl ml-auto transition-all active:scale-[0.98] shadow-sm flex items-center justify-center">
             <Trophy className="h-5 w-5" />
           </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="premium-card overflow-hidden flex flex-col relative border-zinc-200/50 shadow-lg">
          <div className="bg-zinc-900 p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/pitch/800/400?blur=4')] opacity-20 bg-cover mix-blend-overlay"></div>
            <Flame className="absolute top-[-20px] right-[-20px] h-40 w-40 text-emerald-500 opacity-20 pointer-events-none" />
            <h3 className="font-display text-2xl font-bold relative z-10 flex items-center gap-3">
               Match Prediction 
               <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-widest">+50 A-Coins</span>
            </h3>
            <p className="text-zinc-400 text-sm mt-2 relative z-10 font-medium">NPFL Game Week 24</p>
          </div>
          
          <div className="p-8 flex-1 flex flex-col bg-white">
            <div className="flex items-center justify-between mb-10 pb-10 border-b border-zinc-100">
              <div className="text-center flex-1">
                <div className="h-20 w-20 bg-white text-emerald-700 rounded-[20px] mx-auto flex items-center justify-center font-display font-bold text-3xl mb-4 shadow-sm border border-zinc-200 relative overflow-hidden">
                  RNG
                  <div className="absolute inset-0 border-2 border-emerald-500/10 pointer-events-none"></div>
                </div>
                <p className="font-bold text-zinc-900">Rangers Int.</p>
              </div>
              <div className="px-6 text-zinc-300 font-display italic font-black text-2xl opacity-50">VS</div>
              <div className="text-center flex-1">
                <div className="h-20 w-20 bg-white text-blue-700 rounded-[20px] mx-auto flex items-center justify-center font-display font-bold text-3xl mb-4 shadow-sm border border-zinc-200 relative overflow-hidden">
                  EYM
                  <div className="absolute inset-0 border-2 border-blue-500/10 pointer-events-none"></div>
                </div>
                <p className="font-bold text-zinc-900">Enyimba FC</p>
              </div>
            </div>

            <div className="mt-auto">
               <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest text-center mb-4">Make Your Pick</p>
               {predicted ? (
                 <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-6 text-center">
                   <div className="bg-emerald-100/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200/50">
                     <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                   </div>
                   <p className="text-emerald-900 font-display font-bold text-xl mb-1 tracking-tight">Prediction Locked</p>
                   <p className="text-emerald-700 font-bold mb-2">Outcome: <span className="text-emerald-900">{predicted}</span></p>
                   <p className="text-[10px] text-emerald-600/70 font-bold uppercase tracking-widest">Awaiting final whistle</p>
                 </div>
               ) : (
                 <div className="grid grid-cols-3 gap-3">
                   <button 
                     onClick={() => setPredicted('Home Win')}
                     className="bg-zinc-50 border border-zinc-200 hover:border-emerald-500/50 hover:bg-emerald-50/50 hover:text-emerald-700 text-zinc-800 font-display font-bold text-2xl pb-3 pt-4 rounded-[20px] transition-all"
                   >
                     1
                   </button>
                   <button 
                     onClick={() => setPredicted('Draw')}
                     className="bg-zinc-50 border border-zinc-200 hover:border-emerald-500/50 hover:bg-emerald-50/50 hover:text-emerald-700 text-zinc-800 font-display font-bold text-2xl pb-3 pt-4 rounded-[20px] transition-all"
                   >
                     X
                   </button>
                   <button 
                     onClick={() => setPredicted('Away Win')}
                     className="bg-zinc-50 border border-zinc-200 hover:border-emerald-500/50 hover:bg-emerald-50/50 hover:text-emerald-700 text-zinc-800 font-display font-bold text-2xl pb-3 pt-4 rounded-[20px] transition-all"
                   >
                     2
                   </button>
                 </div>
               )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
           <div className="premium-card p-6">
             <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-100">
               <h3 className="font-display font-bold text-lg text-zinc-900 flex items-center gap-2">
                 <Coins className="h-5 w-5 text-orange-500" />
                 Rewards Store
               </h3>
               <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest border border-emerald-200/50 bg-emerald-50/50 px-2 py-1 rounded-sm">Solana Network</span>
             </div>
             
             <div className="space-y-3">
               <div className="border border-zinc-200/80 bg-zinc-50 rounded-2xl p-4 flex items-center justify-between hover:bg-white hover:border-zinc-300 transition-all cursor-pointer group shadow-sm">
                 <div className="flex items-center gap-4">
                   <div className="h-12 w-12 bg-white rounded-xl flex items-center justify-center border border-zinc-200 shadow-sm group-hover:scale-105 transition-transform">
                     <Gift className="h-5 w-5 text-zinc-600" />
                   </div>
                   <div>
                     <p className="font-display font-bold text-zinc-900 tracking-tight">Signed Jersey NFT</p>
                     <p className="text-[11px] text-zinc-500 font-semibold">Digital Collectible</p>
                   </div>
                 </div>
                 <button className="bg-orange-100/50 text-orange-700 px-3 py-1.5 rounded-lg text-xs font-bold border border-orange-200/50 group-hover:bg-orange-500 group-hover:text-white group-hover:border-transparent transition-all">
                   2,500 <span className="text-[9px] uppercase font-bold text-inherit">A-Coins</span>
                 </button>
               </div>
               
               <div className="border border-zinc-100 bg-zinc-50/50 rounded-2xl p-4 flex items-center justify-between cursor-not-allowed opacity-60 grayscale group">
                 <div className="flex items-center gap-4">
                   <div className="h-12 w-12 bg-white rounded-xl flex items-center justify-center border border-zinc-200 shadow-sm">
                     <Ticket className="h-5 w-5 text-zinc-400" />
                   </div>
                   <div>
                     <p className="font-display font-bold text-zinc-400 tracking-tight">Match Day Tickets</p>
                     <p className="text-[11px] text-zinc-400 font-semibold">NPFL Super 6</p>
                   </div>
                 </div>
                 <button className="bg-zinc-100 text-zinc-400 px-3 py-1.5 rounded-lg text-xs font-bold border border-zinc-200/50">
                   5,000 <span className="text-[9px] uppercase font-bold text-inherit">A-Coins</span>
                 </button>
               </div>
             </div>
           </div>

           <div className="premium-card p-8 border-emerald-500/20 bg-emerald-950 text-white relative overflow-hidden group">
             <div className="absolute top-0 left-0 w-full h-full bg-[url('https://picsum.photos/seed/nigeriafootball/800/400?blur=1')] opacity-[0.05] mix-blend-overlay"></div>
             <div className="absolute top-0 right-0 h-48 w-48 bg-emerald-500 opacity-20 rounded-full blur-3xl transform translate-x-10 -translate-y-10 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none"></div>
             
             <div className="relative z-10">
               <div className="bg-emerald-900 border border-emerald-800 shadow-sm w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
                 <Search className="h-5 w-5 text-emerald-400" />
               </div>
               <h3 className="font-display font-bold text-2xl mb-2 tracking-tight">Scout Like a Pro</h3>
               <p className="text-sm text-emerald-100/70 mb-8 xl:w-5/6 leading-relaxed font-medium">
                 Watch short highlights, rate player performances, and earn A-Coins while helping train our AI models!
               </p>
               <button className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3 px-6 rounded-xl text-sm transition-colors flex items-center justify-center gap-2 w-full sm:w-auto">
                 Start Micro-Scouting <ArrowRight className="w-4 h-4 ml-1" />
               </button>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
