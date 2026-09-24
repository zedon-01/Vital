import React from 'react';
import { Flame, Award, BookOpen, Layers, CheckSquare, Target, AlertTriangle, Activity, Zap } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, userData }) {
  const navItems = [
    { id: 'path', label: 'Učební mapa', icon: BookOpen },
    { id: 'bodymap', label: 'Mapa těla', icon: Activity },
    { id: 'atlas', label: 'Anatomický atlas', icon: Layers },
    { id: 'matching', label: 'Rychlá spojovačka', icon: Zap },
    { id: 'exam', label: 'Test A1–A21', icon: Award },
    { id: 'weak', label: 'Slabá místa', icon: AlertTriangle, count: userData?.weakTopics?.length || 0 },
    { id: 'checklist', label: 'Kontrolní checklist', icon: CheckSquare }
  ];

  return (
    <nav className="glass-nav sticky top-0 z-40 px-4 py-3 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-3">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer shrink-0" onClick={() => setActiveTab('path')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-emerald-500/20">
            V
          </div>
          <div>
            <div className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              VITAL ANATOMIE
            </div>
            <div className="text-xs text-slate-400 font-medium">
              Fitness Instruktor Exam Prep
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0 no-scrollbar justify-start">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon size={16} />
                <span>{item.label}</span>
                {item.count > 0 && (
                  <span className="bg-amber-500/20 text-amber-400 text-xs px-1.5 py-0.5 rounded-full font-bold border border-amber-500/30">
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* User Stats: Streak & XP */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Streak */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400 font-bold text-xs md:text-sm">
            <Flame size={16} className="text-amber-500 fill-amber-500 pulse-element" />
            <span>{userData.streak || 1} dny</span>
          </div>

          {/* XP */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 font-bold text-xs md:text-sm">
            <Target size={16} className="text-emerald-400" />
            <span>{userData.xp || 0} XP</span>
          </div>
        </div>

      </div>
    </nav>
  );
}
