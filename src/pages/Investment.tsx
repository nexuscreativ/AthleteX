import React, { useState } from 'react';
import { mockAthletes, mockUser } from '../data/mockData';
import { ArrowRight, Wallet, ShieldCheck, PieChart, Info, X, CheckCircle2, Loader2, Search, SlidersHorizontal } from 'lucide-react';
import { Athlete } from '../types';

export function Investment() {
  const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(null);
  const [purchaseStep, setPurchaseStep] = useState<'amount' | 'confirm' | 'success'>('amount');
  const [tokenCount, setTokenCount] = useState<number | ''>(10);
  const [isProcessing, setIsProcessing] = useState(false);
  const [localBalance, setLocalBalance] = useState(mockUser.balances.cNGN);
  const [searchTerm, setSearchTerm] = useState('');

  const handleBuyClick = (athlete: Athlete) => {
    setSelectedAthlete(athlete);
    setPurchaseStep('amount');
    setTokenCount(10);
  };

  const closeFlow = () => {
    setSelectedAthlete(null);
    setTimeout(() => setPurchaseStep('amount'), 300);
  };

  const handleConfirm = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setLocalBalance(prev => prev - (Number(tokenCount) * (selectedAthlete?.tokenPrice || 0)));
      setPurchaseStep('success');
    }, 1500);
  };

  const tokenAmount = Number(tokenCount) || 0;
  const totalCost = selectedAthlete ? tokenAmount * selectedAthlete.tokenPrice : 0;
  const canAfford = totalCost <= localBalance && tokenAmount > 0;

  const filteredAthletes = mockAthletes.filter(athlete => 
    athlete.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in relative z-0">
      <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
        <div>
          <h1 className="page-title mb-2">The Exchange.</h1>
          <p className="text-zinc-500 font-medium text-sm sm:text-base">Invest in fractional rights of verified upcoming stars.</p>
        </div>
        <div className="premium-glass p-1.5 pl-4 rounded-2xl flex items-center gap-4 w-full md:w-auto">
           <div className="flex flex-col">
             <span className="metric-label">Purchasing Power</span>
             <span className="font-display font-bold text-xl text-zinc-900 leading-none">₦ {localBalance.toLocaleString()}</span>
           </div>
           <button className="bg-zinc-900 hover:bg-zinc-800 text-white p-3 rounded-xl ml-auto transition-all active:scale-[0.98] shadow-sm flex items-center justify-center">
             <Wallet className="h-5 w-5" />
           </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 xl:grid-cols-4">
        <div className="lg:col-span-2 xl:col-span-3 space-y-4">
           {/* Filters Bar */}
           <div className="flex flex-col sm:flex-row gap-3 mb-6">
             <div className="relative flex-1">
                <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-zinc-400" />
                <input 
                  type="text" 
                  placeholder="Search assets..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white border border-zinc-200/80 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm"
                />
             </div>
             <div className="flex gap-2">
                <button className="flex items-center gap-2 bg-white border border-zinc-200/80 rounded-xl px-4 py-3 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 transition-colors shadow-sm">
                   <SlidersHorizontal className="h-4 w-4" /> Filters
                </button>
                <button className="flex items-center gap-2 bg-white border border-zinc-200/80 rounded-xl px-4 py-3 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 transition-colors shadow-sm whitespace-nowrap">
                   <PieChart className="h-4 w-4 text-emerald-500" /> Potential
                </button>
             </div>
           </div>
           
           {filteredAthletes.map(athlete => {
             const userInvestment = mockUser.portfolio.find(p => p.athleteId === athlete.id);
             return (
               <div key={athlete.id} className="premium-card premium-card-hover p-4 sm:p-5 flex flex-col sm:flex-row gap-5 items-center">
                 <div className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-[20px] overflow-hidden shrink-0">
                    <img src={athlete.imageUrl} alt={athlete.name} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                    <div className="absolute top-2 left-2 bg-white/90 backdrop-blur px-2 py-0.5 rounded text-[9px] font-bold tracking-widest uppercase text-emerald-800 shadow-sm border border-white/20">
                       PROSPECT
                    </div>
                 </div>
                 
                 <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-3 gap-4 md:items-center">
                   {/* Info */}
                   <div className="flex flex-col text-center sm:text-left">
                     <h3 className="font-display text-xl font-bold text-zinc-900 tracking-tight">{athlete.name}</h3>
                     <p className="text-xs text-zinc-500 font-medium mt-0.5">{athlete.position} &bull; {athlete.currentClub}</p>
                     {userInvestment && (
                       <span className="mt-3 inline-flex items-center justify-center sm:justify-start gap-1 text-[10px] uppercase font-bold tracking-widest text-emerald-600">
                         <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> You own {userInvestment.shares} tokens
                       </span>
                     )}
                   </div>

                   {/* Pricing */}
                   <div className="flex flex-row md:flex-col justify-between md:justify-center items-center md:items-start gap-4 md:gap-1 bg-zinc-50 md:bg-transparent p-3 md:p-0 rounded-xl">
                      <div>
                        <span className="metric-label block mb-1">Current Price</span>
                        <span className="font-display text-lg font-bold text-zinc-900 block leading-none">₦ {athlete.tokenPrice.toFixed(2)}</span>
                      </div>
                      <div className="md:mt-2 text-right md:text-left">
                        <span className="metric-label block mb-1">Net Valuation</span>
                        <span className="font-bold text-zinc-600 text-sm block leading-none">₦ {(athlete.aiValuation / 1000000).toFixed(1)}M</span>
                      </div>
                   </div>

                   {/* Actions */}
                   <div className="flex gap-2 w-full mt-2 md:mt-0">
                     <button onClick={() => handleBuyClick(athlete)} className="flex-1 btn-primary py-3 text-sm">
                       Buy
                     </button>
                     <button className="flex-1 btn-secondary py-3 text-sm">
                       Sell
                     </button>
                   </div>
                 </div>
               </div>
             )
           })}
        </div>

        <div className="lg:col-span-1">
          <div className="premium-card p-6 sticky top-28 overflow-hidden bg-emerald-900 border-emerald-800 shadow-xl group">
            <div className="absolute top-0 right-0 p-8 opacity-[0.05] pointer-events-none group-hover:scale-110 transition-transform duration-700">
              <ShieldCheck className="w-48 h-48 text-white" />
            </div>
            <div className="flex items-center gap-3 text-white mb-6 relative z-10">
               <div className="bg-emerald-800 p-2 rounded-xl text-emerald-400 border border-emerald-700">
                 <ShieldCheck className="h-5 w-5" />
               </div>
               <h3 className="font-display text-lg font-bold tracking-tight">SEC Registered</h3>
            </div>
            
            <p className="text-sm text-emerald-100/90 font-medium leading-relaxed mb-6 relative z-10">
              Talent Tokens are digital asset securities registered under the ISA 2025. Transactions settle on high-speed chains using cNGN, a Naira-backed stablecoin supervised by the CBN.
            </p>
            
            <div className="bg-emerald-950/50 p-4 rounded-xl flex items-center justify-between border border-emerald-800 mb-8 relative z-10">
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">KYC Status</span>
              <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-sm shadow-sm uppercase tracking-wider">Tier 3 Verified</span>
            </div>
            
            <button className="w-full bg-white hover:bg-zinc-50 text-emerald-900 rounded-xl py-3.5 text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.98] relative z-10">
              Increase Limits
            </button>
            <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-emerald-500/70 font-medium uppercase tracking-widest relative z-10">
              <Info className="w-3 h-3" /> Capital at risk
            </div>
          </div>
        </div>
      </div>

      {/* Investment Modal */}
      {selectedAthlete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-zinc-900/40 backdrop-blur-md transition-opacity" onClick={closeFlow}></div>
          <div className="bg-white rounded-[32px] w-full max-w-md relative z-10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-zinc-200/50 animate-fade-in scale-100 origin-bottom sm:origin-center">
            
            <div className="flex items-center justify-between p-6 pb-4">
              <h2 className="font-display text-xl font-bold text-zinc-900 tracking-tight">
                {purchaseStep === 'amount' && 'Purchase Tokens'}
                {purchaseStep === 'confirm' && 'Review Order'}
                {purchaseStep === 'success' && 'Order Complete'}
              </h2>
              {purchaseStep !== 'success' && (
                <button onClick={closeFlow} className="text-zinc-400 hover:text-zinc-600 p-1.5 rounded-full hover:bg-zinc-100 transition-colors cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            <div className="p-6 pt-0 overflow-y-auto no-scrollbar">
               {purchaseStep === 'amount' && (
                 <div className="space-y-6">
                   <div className="flex items-center gap-4 bg-zinc-50 p-3 rounded-2xl border border-zinc-100">
                     <img src={selectedAthlete.imageUrl} alt={selectedAthlete.name} className="w-14 h-14 rounded-[14px] object-cover" />
                     <div>
                       <h3 className="font-bold text-zinc-900">{selectedAthlete.name}</h3>
                       <p className="text-xs text-zinc-500 font-semibold mt-0.5">1 Token = ₦{selectedAthlete.tokenPrice.toFixed(2)}</p>
                     </div>
                   </div>

                   <div>
                     <label className="block text-xs font-bold text-zinc-600 uppercase tracking-widest mb-2">Quantity</label>
                     <div className="relative">
                       <input 
                         type="number" 
                         min="1"
                         value={tokenCount}
                         onChange={(e) => setTokenCount(e.target.value === '' ? '' : parseInt(e.target.value))}
                         className="w-full bg-white border-2 border-zinc-200 focus:border-emerald-500 focus:ring-0 rounded-2xl py-4 px-5 text-xl font-bold text-zinc-900 outline-none transition-colors shadow-sm"
                         placeholder="0"
                       />
                       <div className="absolute right-5 top-1/2 -translate-y-1/2 text-sm font-bold text-zinc-400">Tokens</div>
                     </div>
                   </div>

                   <div className="bg-zinc-50 p-5 rounded-2xl border border-zinc-100 flex justify-between items-center">
                     <span className="text-sm font-bold text-zinc-500">Total Est. Cost</span>
                     <span className="font-display text-2xl font-bold text-zinc-900 tracking-tight">₦ {totalCost.toLocaleString()}</span>
                   </div>

                   {!canAfford && tokenAmount > 0 && (
                     <div className="text-xs text-red-600 font-bold flex items-center gap-2 bg-red-50 p-3 rounded-xl border border-red-100">
                       <Info className="w-4 h-4"/> Insufficient purchasing power.
                     </div>
                   )}

                   <button 
                     disabled={!canAfford}
                     onClick={() => setPurchaseStep('confirm')}
                     className="w-full btn-primary py-4 mt-2 text-base"
                   >
                     Review Order
                   </button>
                 </div>
               )}

               {purchaseStep === 'confirm' && (
                 <div className="space-y-6">
                   <div className="space-y-4 bg-zinc-50 p-6 rounded-3xl border border-zinc-100">
                     <div className="flex justify-between items-center text-sm">
                       <span className="text-zinc-500 font-semibold">Asset</span>
                       <span className="text-zinc-900 font-bold">{selectedAthlete.name}</span>
                     </div>
                     <div className="flex justify-between items-center text-sm">
                       <span className="text-zinc-500 font-semibold">Quantity</span>
                       <span className="text-zinc-900 font-bold">{tokenAmount}</span>
                     </div>
                     <div className="flex justify-between items-center text-sm">
                       <span className="text-zinc-500 font-semibold">Execution Price</span>
                       <span className="text-zinc-900 font-bold">₦ {selectedAthlete.tokenPrice.toFixed(2)}</span>
                     </div>
                     <div className="flex justify-between items-center text-sm">
                       <span className="text-zinc-500 font-semibold">Network Fee</span>
                       <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-sm">Free</span>
                     </div>
                     <div className="pt-4 mt-2 border-t border-zinc-200/60 flex justify-between items-center">
                       <span className="text-zinc-500 font-bold text-xs uppercase tracking-widest">Total Cost</span>
                       <span className="font-display text-2xl font-bold text-zinc-900 tracking-tight">₦ {totalCost.toLocaleString()}</span>
                     </div>
                   </div>

                   <button 
                     disabled={isProcessing}
                     onClick={handleConfirm}
                     className="w-full btn-emerald py-4 flex items-center justify-center gap-2 text-base"
                   >
                     {isProcessing ? (
                       <><Loader2 className="w-5 h-5 animate-spin" /> Executing Transaction...</>
                     ) : (
                       'Confirm Purchase'
                     )}
                   </button>
                 </div>
               )}

               {purchaseStep === 'success' && (
                 <div className="text-center py-8 space-y-4">
                   <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                     <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                   </div>
                   <h3 className="font-display text-2xl font-bold text-zinc-900 tracking-tight">Order Executed</h3>
                   <p className="text-zinc-500 text-sm font-medium leading-relaxed max-w-[240px] mx-auto">
                     Successfully purchased <strong className="text-zinc-900">{tokenAmount} tokens</strong> of {selectedAthlete.name}. Settlement is complete.
                   </p>
                   <div className="pt-6">
                     <button onClick={closeFlow} className="w-full btn-secondary py-4 text-base">
                       Return to Exchange
                     </button>
                   </div>
                 </div>
               )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
