import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockUser, mockAthletes } from '../data/mockData';
import { TrendingUp, Users, Wallet, ArrowRight } from 'lucide-react';

const performanceData = [
  { name: 'Jan', value: 3000 },
  { name: 'Feb', value: 3400 },
  { name: 'Mar', value: 2900 },
  { name: 'Apr', value: 4200 },
  { name: 'May', value: 3800 },
  { name: 'Jun', value: 5100 },
  { name: 'Jul', value: 6490 },
];

export function Dashboard() {
  const totalPortfolioValue = mockUser.portfolio.reduce((acc, item) => {
    const athlete = mockAthletes.find(a => a.id === item.athleteId);
    return acc + (athlete ? athlete.tokenPrice * item.shares : 0);
  }, 0);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in relative">
      <div>
        <h1 className="page-title mb-2">Welcome back, Scout.</h1>
        <p className="text-zinc-500 font-medium text-sm sm:text-base">Here is your portfolio overview and scouting performance.</p>
      </div>

      {/* KPI Cards - Bento Grid */}
      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="premium-card premium-card-hover p-6 relative overflow-hidden group">
          <div className="absolute -right-12 -top-12 bg-emerald-500/10 w-48 h-48 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all duration-500 pointer-events-none"></div>
          <div className="flex items-center justify-between pb-6 relative z-10">
            <h3 className="metric-label">Portfolio Value</h3>
            <div className="bg-zinc-100 p-2 rounded-xl text-zinc-600 border border-zinc-200 shadow-sm">
               <Wallet className="h-4 w-4" />
            </div>
          </div>
          <div className="font-display text-4xl font-bold text-zinc-900 relative z-10 tracking-tight">₦ {totalPortfolioValue.toLocaleString()}</div>
          <p className="text-sm text-emerald-600 font-bold mt-4 flex items-center gap-1.5 relative z-10">
            <TrendingUp className="h-4 w-4" /> +14.2% This Month
          </p>
        </div>

        <div className="premium-card premium-card-hover p-6 relative overflow-hidden group">
          <div className="absolute -right-12 -top-12 bg-blue-500/10 w-48 h-48 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-500 pointer-events-none"></div>
          <div className="flex items-center justify-between pb-6 relative z-10">
            <h3 className="metric-label">Athletes Scouting</h3>
            <div className="bg-zinc-100 p-2 rounded-xl text-zinc-600 border border-zinc-200 shadow-sm">
               <Users className="h-4 w-4" />
            </div>
          </div>
          <div className="font-display text-4xl font-bold text-zinc-900 relative z-10 tracking-tight">12</div>
          <p className="text-sm text-blue-600 font-bold mt-4 flex items-center gap-1.5 relative z-10">
            3 New AI Matches
          </p>
        </div>

        <div className="premium-card premium-card-hover p-6 relative overflow-hidden sm:col-span-2 lg:col-span-1 group">
          <div className="absolute -right-12 -top-12 bg-orange-500/10 w-48 h-48 rounded-full blur-3xl group-hover:bg-orange-500/20 transition-all duration-500 pointer-events-none"></div>
          <div className="flex items-center justify-between pb-6 relative z-10">
            <h3 className="metric-label">A-Coin Rank</h3>
            <div className="bg-zinc-100 p-2 rounded-xl text-zinc-600 border border-zinc-200 shadow-sm">
               <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="font-display text-4xl font-bold text-zinc-900 relative z-10 tracking-tight">#4,291</div>
          <p className="text-sm text-orange-500 font-bold mt-4 flex items-center gap-1.5 relative z-10">
            Top 15% in Nigeria
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:gap-6 md:grid-cols-7">
        <div className="md:col-span-4 premium-card p-6 flex flex-col">
          <div className="flex items-center justify-between mb-8">
             <h3 className="text-lg font-display font-bold text-zinc-900">Performance Over Time</h3>
             <select className="bg-white border border-zinc-200 text-zinc-600 text-xs font-bold rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow">
               <option>Last 6 Months</option>
               <option>This Year</option>
             </select>
          </div>
          <div className="h-[300px] w-full flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#A1A1AA" fontSize={11} fontWeight={600} tickLine={false} axisLine={false} tickMargin={12} />
                <YAxis stroke="#A1A1AA" fontSize={11} fontWeight={600} tickLine={false} axisLine={false} tickFormatter={(value) => `₦${value}`} tickMargin={12} />
                <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#F4F4F5" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', borderColor: '#E4E4E7', boxShadow: '0 10px 40px -10px rgb(0 0 0 / 0.1)', padding: '12px 16px' }}
                  itemStyle={{ color: '#059669', fontWeight: 700, fontSize: '14px' }}
                  labelStyle={{ color: '#71717A', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}
                />
                <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" activeDot={{ r: 5, strokeWidth: 0, fill: '#059669' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="md:col-span-3 premium-card p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
             <h3 className="text-lg font-display font-bold text-zinc-900">Your Tokens</h3>
             <button className="text-emerald-600 text-xs font-bold hover:text-emerald-700 transition-colors">VIEW ALL</button>
          </div>
          <div className="flex flex-col gap-3 flex-1">
            {mockUser.portfolio.map((item) => {
              const athlete = mockAthletes.find(a => a.id === item.athleteId);
              if (!athlete) return null;
              const currentValue = item.shares * athlete.tokenPrice;
              const profit = currentValue - (item.shares * item.averageBuyPrice);
              const isProfit = profit >= 0;
              
              return (
                <div key={item.athleteId} className="group flex items-center justify-between p-3 rounded-2xl border border-transparent hover:border-zinc-200 hover:bg-zinc-50 transition-all cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                       <img src={athlete.imageUrl} alt={athlete.name} className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl object-cover shadow-sm bg-zinc-200" referrerPolicy="no-referrer" />
                    </div>
                    <div>
                      <p className="font-display font-bold text-zinc-900 leading-tight tracking-tight group-hover:text-emerald-700 transition-colors">{athlete.name}</p>
                      <p className="text-[11px] font-bold text-zinc-500 mt-0.5">{item.shares} <span className="text-zinc-400 font-medium">Tokens</span></p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-display font-bold text-zinc-900 tracking-tight">₦{currentValue.toLocaleString()}</p>
                    <div className={`inline-flex items-center gap-1 font-mono text-[10px] mt-1 tracking-tight font-bold ${isProfit ? 'text-emerald-600' : 'text-red-500'}`}>
                      {isProfit ? '+' : '-'}₦{Math.abs(profit).toLocaleString()}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <button className="w-full mt-6 btn-primary py-3.5 flex items-center justify-center gap-2">
            Explore Marketplace <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
