import React, { useState } from 'react';
import { mockAthletes } from '../data/mockData';
import { Search, Play, Activity, Scale, X, Layers, Share2, Facebook, Twitter, MessageCircle, Link as LinkIcon, CheckCircle2 } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Legend } from 'recharts';
import { Athlete } from '../types';

const CHART_COLORS = ['#10b981', '#3b82f6', '#f97316', '#a855f7'];

export function TalentDiscovery() {
  const [searchTerm, setSearchTerm] = useState("");
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [shareAthlete, setShareAthlete] = useState<Athlete | null>(null);
  const [copied, setCopied] = useState(false);

  const filteredAthletes = mockAthletes.filter(athlete => 
    athlete.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    athlete.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleCompare = (id: string) => {
    setCompareIds(prev => {
      if (prev.includes(id)) return prev.filter(p => p !== id);
      if (prev.length >= 4) return prev; // Max 4 athletes to compare
      return [...prev, id];
    });
  };

  const handleShare = async (athlete: Athlete) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${athlete.name} - AthleteX Prospect`,
          text: `Check out ${athlete.name}, an incredible ${athlete.position} prospect on AthleteX Nigeria! Projected Value: ₦${(athlete.aiValuation / 1000000).toFixed(1)}M.`,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Error sharing", err);
        setShareAthlete(athlete); // Fallback to modal if aborted or fails
      }
    } else {
      setShareAthlete(athlete);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCombinedRadarData = () => {
    const comparedAthletes = mockAthletes.filter(a => compareIds.includes(a.id));
    const stats: Array<'pace' | 'shooting' | 'passing' | 'dribbling' | 'defending' | 'physical'> = 
      ['pace', 'shooting', 'passing', 'dribbling', 'defending', 'physical'];
      
    const labels = {
      pace: 'PACE', shooting: 'SHO', passing: 'PAS', 
      dribbling: 'DRI', defending: 'DEF', physical: 'PHY'
    };

    return stats.map(statKey => {
      const row: any = { subject: labels[statKey], fullMark: 100 };
      comparedAthletes.forEach(a => {
        row[a.id] = a.stats[statKey];
      });
      return row;
    });
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in pb-24 relative z-0">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between premium-card p-6 sm:p-8 bg-zinc-900 border-zinc-800 text-white overflow-hidden shadow-xl group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full blur-[100px] opacity-[0.15] -translate-y-1/2 translate-x-1/3 group-hover:opacity-30 transition-opacity duration-1000"></div>
        <div className="relative z-10 w-full sm:w-1/2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 text-zinc-300 text-[10px] uppercase font-bold tracking-widest mb-4">
             <Activity className="w-3 h-3 text-emerald-400" /> AI Vision Active
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold mb-3 tracking-tight">Scout the Streets.</h1>
          <p className="text-zinc-400 text-sm font-medium leading-relaxed max-w-sm">Our YOLO-powered models process iPhone footage from Nigeria's grassroots academies to find your next star.</p>
        </div>
        
        <div className="relative z-10 flex flex-col gap-3 w-full sm:w-80">
          <div className="relative">
            <Search className="absolute left-4 top-[18px] h-4 w-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search prospects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-14 w-full rounded-2xl border border-white/10 pl-12 pr-4 text-sm focus:ring-2 focus:ring-emerald-500/50 bg-white/5 backdrop-blur-md text-white placeholder:text-zinc-500 transition-all font-medium outline-none"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredAthletes.map((athlete) => {
          const isComparing = compareIds.includes(athlete.id);
          const radarData = [
            { subject: 'PACE', A: athlete.stats.pace, fullMark: 100 },
            { subject: 'SHO', A: athlete.stats.shooting, fullMark: 100 },
            { subject: 'PAS', A: athlete.stats.passing, fullMark: 100 },
            { subject: 'DRI', A: athlete.stats.dribbling, fullMark: 100 },
            { subject: 'DEF', A: athlete.stats.defending, fullMark: 100 },
            { subject: 'PHY', A: athlete.stats.physical, fullMark: 100 },
          ];

          return (
            <div key={athlete.id} className={`group premium-card overflow-hidden flex flex-col justify-between transition-all duration-300 ${isComparing ? 'border-emerald-500 shadow-[0_12px_40px_rgba(16,185,129,0.15)] bg-emerald-50/20' : 'hover:shadow-[0_12px_48px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:border-zinc-300'}`}>
              <div className="relative h-64 w-full bg-zinc-900 overflow-hidden">
                <img 
                  src={athlete.imageUrl} 
                  alt={athlete.name} 
                  className="h-full w-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 saturate-[0.85] group-hover:saturate-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/30 to-transparent mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
                
                <div className="absolute top-4 left-4 flex justify-between items-start pointer-events-none">
                   <div className="bg-white/10 backdrop-blur-md text-white text-[9px] uppercase font-bold tracking-widest px-2.5 py-1 rounded shadow-sm border border-white/20">
                     94.2% FIT Target
                   </div>
                </div>

                <div className="absolute top-4 right-4 flex gap-2">
                  <button 
                    onClick={() => handleShare(athlete)}
                    className="h-9 w-9 flex items-center justify-center rounded-full backdrop-blur-md border shadow-sm transition-colors bg-white/20 border-white/20 text-white hover:bg-white/40 active:scale-95"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={() => toggleCompare(athlete.id)}
                    className={`h-9 w-9 flex items-center justify-center rounded-full backdrop-blur-md border shadow-sm transition-colors active:scale-95 ${
                      isComparing ? 'bg-emerald-500 border-emerald-400 text-white' : 'bg-white/20 border-white/20 text-white hover:bg-white/40'
                    }`}
                  >
                    <Scale className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <div className="flex justify-between items-end">
                    <div>
                      <h3 className="text-2xl font-display font-bold leading-none mb-1 tracking-tight text-white">{athlete.name}</h3>
                      <p className="text-xs text-zinc-300 font-bold flex gap-2 items-center uppercase tracking-widest">
                         <span className="bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-sm">{athlete.position}</span>
                         <span>{athlete.age} yrs</span>
                      </p>
                    </div>
                    <button className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-zinc-900 backdrop-blur-sm hover:scale-105 transition-transform shadow-md cursor-pointer">
                      <Play className="h-4 w-4 ml-0.5 fill-zinc-900" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col bg-white">
                 <div className="h-[180px] w-full mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="65%" data={radarData}>
                        <PolarGrid stroke={isComparing ? '#d1fae5' : '#F4F4F5'} />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#A1A1AA', fontSize: 9, fontWeight: 700, letterSpacing: '0.05em' }} />
                        <Radar name={athlete.name} dataKey="A" stroke="#10b981" strokeWidth={2} fill="#10b981" fillOpacity={isComparing ? 0.3 : 0.15} />
                      </RadarChart>
                    </ResponsiveContainer>
                 </div>
                 
                 <div className="mt-auto flex justify-between items-center bg-zinc-50 p-3 rounded-2xl border border-zinc-100">
                    <div className="pl-2">
                       <span className="metric-label block">Projected Value</span>
                       <span className="font-display text-lg font-bold text-zinc-900 leading-none">₦ {(athlete.aiValuation / 1000000).toFixed(1)}M</span>
                    </div>
                    <button 
                      onClick={() => toggleCompare(athlete.id)}
                      className={`rounded-xl px-4 py-2.5 text-xs font-bold transition-colors active:scale-95 ${
                        isComparing 
                          ? 'bg-emerald-100/50 text-emerald-700 border border-emerald-200/50' 
                          : 'bg-zinc-900 text-white hover:bg-zinc-800'
                      }`}
                    >
                       {isComparing ? 'SELECTED' : 'COMPARE'}
                    </button>
                 </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Compare Action Bar */}
      {compareIds.length > 0 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 bg-zinc-900/90 backdrop-blur-md text-white rounded-full p-2 pl-6 pr-2 shadow-[0_10px_40px_rgba(0,0,0,0.2)] border border-white/10 flex items-center gap-6 animate-fade-in">
          <div className="flex flex-col">
            <span className="text-emerald-400 font-bold text-sm leading-none">{compareIds.length} Athletes</span>
            <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mt-0.5">Selected to Info-Sync</span>
          </div>
          <div className="flex items-center gap-2">
             <button 
               onClick={() => setCompareIds([])}
               className="text-zinc-400 hover:text-white px-3 py-2 text-xs font-bold transition-colors"
             >
               Clear
             </button>
             <button 
               onClick={() => setShowCompareModal(true)}
               disabled={compareIds.length < 2}
               className="btn-emerald px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 shadow-sm disabled:bg-zinc-700 disabled:text-zinc-500 disabled:border-zinc-600 disabled:shadow-none"
             >
               <Layers className="w-4 h-4" /> Compare Now
             </button>
          </div>
        </div>
      )}

      {/* Comparison Modal */}
      {showCompareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-zinc-900/40 backdrop-blur-md animate-fade-in" onClick={() => setShowCompareModal(false)}></div>
          <div className="bg-white rounded-[32px] w-full max-w-4xl relative z-10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-fade-in border border-zinc-200/50">
            <div className="flex items-center justify-between p-6 pb-4 border-b border-zinc-100 bg-white">
              <div className="flex items-center gap-3">
                <div className="bg-emerald-50 p-2.5 rounded-xl text-emerald-600 border border-emerald-100">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold text-zinc-900 leading-tight tracking-tight">Head-to-Head</h2>
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-0.5">AI Metrics Comparison</p>
                </div>
              </div>
              <button onClick={() => setShowCompareModal(false)} className="text-zinc-400 hover:text-zinc-600 p-2 rounded-full hover:bg-zinc-100 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 flex flex-col lg:flex-row gap-8 bg-zinc-50/30">
              <div className="w-full lg:w-1/2 flex flex-col items-center justify-center min-h-[350px] bg-white rounded-3xl border border-zinc-100 p-4 shadow-sm">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={getCombinedRadarData()}>
                    <PolarGrid stroke="#F4F4F5" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#71717A', fontSize: 10, fontWeight: 700 }} />
                    {compareIds.map((id, index) => {
                      const athlete = mockAthletes.find(a => a.id === id);
                      if (!athlete) return null;
                      return (
                        <Radar 
                          key={id} 
                          name={athlete.name} 
                          dataKey={id} 
                          stroke={CHART_COLORS[index % CHART_COLORS.length]} 
                          strokeWidth={2} 
                          fill={CHART_COLORS[index % CHART_COLORS.length]} 
                          fillOpacity={0.15} 
                        />
                      );
                    })}
                    <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '11px', fontWeight: 'bold' }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <div className="w-full lg:w-1/2 space-y-3">
                 {compareIds.map((id, index) => {
                   const athlete = mockAthletes.find(a => a.id === id);
                   if (!athlete) return null;
                   const color = CHART_COLORS[index % CHART_COLORS.length];
                   
                   return (
                     <div key={id} className="p-3 pl-4 rounded-2xl border border-zinc-200/80 bg-white shadow-sm flex items-center gap-4 relative overflow-hidden group">
                        <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: color }}></div>
                        <img src={athlete.imageUrl} alt={athlete.name} className="w-14 h-14 rounded-[14px] object-cover bg-zinc-100" />
                        <div className="flex-1">
                           <div className="flex justify-between items-start mb-0.5">
                              <h4 className="font-display font-bold text-zinc-900 tracking-tight">{athlete.name}</h4>
                              <span className="text-[9px] bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded-sm font-bold uppercase tracking-widest">{athlete.position}</span>
                           </div>
                           <p className="text-[11px] text-zinc-500 font-semibold">{athlete.age} yrs &bull; {athlete.currentClub}</p>
                           <div className="mt-1 text-[11px] font-bold text-zinc-600">
                              Estimated Valuation: <span className="text-zinc-900">₦{(athlete.aiValuation / 1000000).toFixed(1)}M</span>
                           </div>
                        </div>
                     </div>
                   );
                 })}
                 <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 mt-6 text-center">
                   Select up to 4 athletes at once for optimal radar visibility.
                 </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal (Fallback) */}
      {shareAthlete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-zinc-900/40 backdrop-blur-md animate-fade-in" onClick={() => setShareAthlete(null)}></div>
          <div className="bg-white rounded-[32px] w-full max-w-sm relative z-10 shadow-2xl overflow-hidden flex flex-col p-6 animate-fade-in border border-zinc-200/50">
             <div className="flex items-center justify-between mb-6">
               <div>
                 <h2 className="font-display text-xl font-bold text-zinc-900">Share Prospect</h2>
                 <p className="text-xs text-zinc-500 font-medium">Circulate the profile link</p>
               </div>
               <button onClick={() => setShareAthlete(null)} className="text-zinc-400 hover:text-zinc-600 p-1.5 rounded-full hover:bg-zinc-100 transition-colors">
                  <X className="w-5 h-5" />
               </button>
             </div>
             
             <div className="flex items-center gap-4 mb-6 bg-zinc-50 p-3 rounded-2xl border border-zinc-100">
               <img src={shareAthlete.imageUrl} className="w-12 h-12 rounded-[12px] object-cover bg-zinc-200" alt={shareAthlete.name} />
               <div>
                 <h3 className="font-bold text-zinc-900 tracking-tight leading-none mb-1">{shareAthlete.name}</h3>
                 <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{shareAthlete.position} &bull; {shareAthlete.currentClub}</p>
               </div>
             </div>

             <div className="grid grid-cols-4 gap-2 mb-6">
                <button className="flex flex-col items-center gap-2 group">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50/50 text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform border border-blue-100/50">
                    <Facebook className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Post</span>
                </button>
                <button className="flex flex-col items-center gap-2 group">
                  <div className="w-14 h-14 rounded-2xl bg-zinc-100/50 text-zinc-900 flex items-center justify-center group-hover:scale-105 transition-transform border border-zinc-200/50">
                    <Twitter className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Tweet</span>
                </button>
                <button className="flex flex-col items-center gap-2 group">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform border border-emerald-100/50">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Chat</span>
                </button>
                <button onClick={handleCopyLink} className="flex flex-col items-center gap-2 group">
                  <div className="w-14 h-14 rounded-2xl bg-zinc-100/50 text-zinc-700 flex items-center justify-center group-hover:scale-105 transition-transform border border-zinc-200/50">
                    {copied ? <CheckCircle2 className="w-6 h-6 text-emerald-500" /> : <LinkIcon className="w-5 h-5" />}
                  </div>
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{copied ? 'Copied' : 'Copy'}</span>
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}

