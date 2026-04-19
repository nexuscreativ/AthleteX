import React from 'react';
import { Play, ArrowRight, ShieldCheck, TrendingUp, Trophy, Globe, Activity } from 'lucide-react';

export function Landing({ onEnterApp }: { onEnterApp: () => void }) {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-emerald-500/30 overflow-x-hidden relative">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-30 mix-blend-screen"
        >
          <source src="https://cdn.pixabay.com/video/2016/08/22/4762-180877688_large.mp4" type="video/mp4" />
          <img 
            src="https://picsum.photos/seed/nigeriafootball/1920/1080?blur=4" 
            alt="Fallback Background" 
            className="w-full h-full object-cover" 
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/80 via-[#0A0A0A]/95 to-[#0A0A0A]"></div>
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[128px] mix-blend-screen animate-pulse duration-1000"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-700/20 rounded-full blur-[128px] mix-blend-screen"></div>
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-white/5 bg-[#0A0A0A]/40 backdrop-blur-xl px-6 py-4 flex justify-between items-center">
         <div className="flex items-center gap-3">
            <div className="bg-emerald-500/10 p-2 rounded-xl border border-emerald-500/20">
              <ShieldCheck className="text-emerald-400 h-5 w-5" />
            </div>
            <div className="font-display font-bold tracking-tight text-xl text-white">AthleteX<span className="text-emerald-400">.</span></div>
         </div>
         <div className="hidden md:flex items-center gap-8 text-[13px] font-semibold text-zinc-400 uppercase tracking-widest">
            <a href="#vision" className="hover:text-emerald-400 transition-colors">Vision</a>
            <a href="#discovery" className="hover:text-emerald-400 transition-colors">AI Discovery</a>
            <a href="#tokenization" className="hover:text-emerald-400 transition-colors">Marketplace</a>
         </div>
         <button onClick={onEnterApp} className="bg-white text-[#0A0A0A] hover:bg-zinc-200 px-6 py-2.5 rounded-full text-sm font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
           Enter App
         </button>
      </nav>
      
      {/* Hero Section */}
      <div className="relative z-10 pt-40 pb-20 sm:pt-56 sm:pb-32 min-h-[90vh] flex flex-col justify-center">
         <div className="max-w-7xl mx-auto px-6 text-center flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 tracking-widest uppercase font-bold text-[10px] mb-8 animate-fade-in backdrop-blur-md">
              <ShieldCheck className="w-3 h-3"/> SEC Registered Digital Asset Platform
            </div>
            <h1 className="text-6xl sm:text-8xl font-display font-medium tracking-tighter mb-8 leading-[1.05] max-w-5xl text-white drop-shadow-2xl">
              Back the Streets.<br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-emerald-400 to-emerald-600 italic pr-4">Own the Stadium.</span>
            </h1>
            <p className="max-w-2xl text-lg sm:text-xl text-zinc-400 mb-12 leading-relaxed font-medium">
              AthleteX is Nigeria's first regulated sports exchange. Scout raw talent with AI vision, tokenize their potential, and invest using cNGN.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
               <button onClick={onEnterApp} className="group relative bg-[#0A0A0A] border border-white/20 hover:border-emerald-500/50 hover:bg-emerald-950/30 text-white px-8 py-4 rounded-full font-bold text-sm tracking-widest uppercase transition-all overflow-hidden flex items-center justify-center gap-3">
                 <span className="relative z-10">Access Exchange</span>
                 <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                 <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
               </button>
               <button className="text-zinc-300 hover:text-white px-8 py-4 rounded-full font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-3 transition-colors">
                 <Play className="w-4 h-4 text-emerald-400"/> Play Vision Video
               </button>
            </div>
         </div>
      </div>

      {/* Value Pillars */}
      <div className="max-w-7xl mx-auto px-6 py-32 relative z-10" id="vision">
         <div className="grid lg:grid-cols-3 gap-6">
            <div className="bg-[#111111] border border-white/5 p-10 rounded-[32px] relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
               <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity -scale-x-100 group-hover:scale-110 duration-700">
                  <Activity className="h-32 w-32 text-emerald-500" />
               </div>
               <div className="h-14 w-14 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center mb-8 border border-emerald-500/20 backdrop-blur-md">
                  <Activity className="h-6 w-6" />
               </div>
               <h3 className="text-2xl font-display font-medium tracking-tight text-white mb-4">AI-Powered Scouting</h3>
               <p className="text-zinc-400 leading-relaxed font-medium text-sm">
                 Using customized YOLO and MediaPipe models, we analyze iPhone footage from local academies to extract professional-grade physical metrics and tactical data.
               </p>
            </div>

            <div className="bg-[#111111] border border-white/5 p-10 rounded-[32px] relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
               <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity -scale-x-100 group-hover:scale-110 duration-700">
                  <TrendingUp className="h-32 w-32 text-emerald-500" />
               </div>
               <div className="h-14 w-14 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center mb-8 border border-emerald-500/20 backdrop-blur-md">
                  <TrendingUp className="h-6 w-6" />
               </div>
               <h3 className="text-2xl font-display font-medium tracking-tight text-white mb-4">Tokenized Potential</h3>
               <p className="text-zinc-400 leading-relaxed font-medium text-sm">
                 Retail investors and fans can buy fractional rights in securing future transfers. Transactions settle on high-speed chains using the cNGN stablecoin.
               </p>
            </div>

            <div className="bg-[#111111] border border-white/5 p-10 rounded-[32px] relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
               <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity -scale-x-100 group-hover:scale-110 duration-700">
                  <Trophy className="h-32 w-32 text-emerald-500" />
               </div>
               <div className="h-14 w-14 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center mb-8 border border-emerald-500/20 backdrop-blur-md">
                  <Trophy className="h-6 w-6" />
               </div>
               <h3 className="text-2xl font-display font-medium tracking-tight text-white mb-4">Gamified Engagement</h3>
               <p className="text-zinc-400 leading-relaxed font-medium text-sm">
                 Predict match outcomes, scout like a pro for bounties, and climb the Solana-powered A-Coin leaderboards to earn VIP tickets and rare digital collectibles.
               </p>
            </div>
         </div>
      </div>

      {/* Social Proof & Footer */}
      <footer className="border-t border-white/5 bg-[#0A0A0A] pt-24 pb-12 relative z-10">
         <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-zinc-600 font-bold text-[10px] tracking-[0.3em] uppercase mb-12">Integrated Ecosystem</h2>
            <div className="flex flex-wrap justify-center items-center gap-12 sm:gap-20 opacity-40 hover:opacity-80 transition-opacity duration-500 mb-20 text-zinc-300">
               <div className="flex items-center gap-3 font-display text-xl sm:text-2xl font-bold tracking-tight"><Globe className="h-6 w-6 text-emerald-500"/> Solana</div>
               <div className="flex items-center gap-3 font-display text-xl sm:text-2xl font-bold tracking-tight"><ShieldCheck className="h-6 w-6 text-emerald-500"/> SEC Nigeria</div>
               <div className="flex items-center gap-3 font-display text-xl sm:text-2xl font-bold tracking-tight"><ShieldCheck className="h-6 w-6 text-emerald-500"/> NDPA</div>
            </div>
            <div className="w-12 h-1 bg-emerald-500/20 mx-auto rounded-full mb-8"></div>
            <p className="text-zinc-600 text-xs font-bold uppercase tracking-widest">
              © 2026 AthleteX Nigeria. Not investment advice.
            </p>
         </div>
      </footer>
    </div>
  );
}
