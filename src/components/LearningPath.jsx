import React from 'react';
import { MODULES, MUSCLES } from '../data/anatomyData';
import { Star, Play, CheckCircle2, Lock, Sparkles, Shield, Award, BookOpen } from 'lucide-react';

export default function LearningPath({ userData, onStartSession }) {
  // Calculate total mastery statistics
  const totalMuscles = MUSCLES.length;
  const masteredCount = Object.values(userData.masteredMuscles || {}).filter(m => m.score >= 80).length;
  const overallMasteryPercent = Math.round((masteredCount / totalMuscles) * 100);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      
      {/* Top Banner Dashboard */}
      <div className="glass-panel p-6 mb-8 relative overflow-hidden bg-gradient-to-r from-slate-900/90 via-slate-800/80 to-slate-900/90 border border-slate-700/60">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute right-1/3 top-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-3">
              <Sparkles size={14} />
              <span>Studijní plán Vital Institut</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
              Funkční Anatomie Svalů
            </h1>
            <p className="text-slate-300 text-sm max-w-xl">
              Propracovaný výukový systém vytvořený 100% z dodaných skript. Zvládni začátek, úpon, funkci a testové otázky A1–A21 pro fitness instruktora.
            </p>
          </div>

          {/* Quick Stats Panel */}
          <div className="flex items-center gap-4 bg-slate-900/80 p-4 rounded-2xl border border-slate-700/80 w-full md:w-auto justify-around">
            <div className="text-center px-3">
              <div className="text-2xl font-black text-emerald-400">{overallMasteryPercent}%</div>
              <div className="text-xs text-slate-400 font-semibold">Zvlánuto svalů</div>
            </div>
            <div className="h-8 w-px bg-slate-700"></div>
            <div className="text-center px-3">
              <div className="text-2xl font-black text-cyan-400">{masteredCount}/{totalMuscles}</div>
              <div className="text-xs text-slate-400 font-semibold">Mastery svaly</div>
            </div>
            <div className="h-8 w-px bg-slate-700"></div>
            <div className="text-center px-3">
              <div className="text-2xl font-black text-amber-400">
                {Object.keys(userData.completedModules || {}).length}/{MODULES.length}
              </div>
              <div className="text-xs text-slate-400 font-semibold">Lekcí dokončeno</div>
            </div>
          </div>
        </div>
      </div>

      {/* Duolingo Module Path Tree */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-slate-200 flex items-center gap-2 px-2">
          <BookOpen className="text-emerald-400" size={22} />
          <span>Výukové moduly podle skript</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MODULES.map((mod, index) => {
            const modStats = userData.completedModules?.[mod.id] || { stars: 0, bestAccuracy: 0 };
            const isUnlocked = index === 0 || userData.completedModules?.[MODULES[index - 1]?.id]?.stars > 0 || index < 3; // unlock first 3 by default or progress
            
            return (
              <div
                key={mod.id}
                className={`glass-panel p-5 relative overflow-hidden transition-all duration-300 ${
                  isUnlocked
                    ? 'border-slate-700/80 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10'
                    : 'opacity-70 border-slate-800 bg-slate-950/40'
                }`}
              >
                {/* Module Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-lg ${
                      modStats.stars > 0
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : isUnlocked
                        ? 'bg-slate-800 text-slate-200 border border-slate-700'
                        : 'bg-slate-900 text-slate-600 border border-slate-800'
                    }`}>
                      {mod.number}
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-emerald-400 tracking-wider uppercase">
                        {mod.system}
                      </span>
                      <h3 className="font-bold text-white text-base leading-snug">
                        {mod.title}
                      </h3>
                    </div>
                  </div>

                  {/* Stars Rating */}
                  <div className="flex items-center gap-1 bg-slate-950/60 px-2.5 py-1 rounded-full border border-slate-800">
                    {[1, 2, 3].map(starNum => (
                      <Star
                        key={starNum}
                        size={14}
                        className={
                          starNum <= modStats.stars
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-700'
                        }
                      />
                    ))}
                  </div>
                </div>

                {/* Module Description */}
                <p className="text-xs text-slate-400 mb-4 line-clamp-2 leading-relaxed">
                  {mod.description}
                </p>

                {/* Action Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                  <div className="text-xs text-slate-500 font-medium">
                    {modStats.bestAccuracy > 0 ? `Nejlepší úspěšnost: ${modStats.bestAccuracy}%` : 'Zatím nesplněno'}
                  </div>

                  {isUnlocked ? (
                    <button
                      onClick={() => onStartSession(mod.id)}
                      className="btn btn-primary text-xs py-2 px-4 shadow-sm"
                    >
                      <Play size={14} className="fill-current" />
                      <span>{modStats.stars > 0 ? 'Procvičit znovu' : 'Spustit lekci'}</span>
                    </button>
                  ) : (
                    <button disabled className="btn btn-secondary text-xs py-2 px-4 opacity-50 cursor-not-allowed">
                      <Lock size={14} />
                      <span>Uzamčeno</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
