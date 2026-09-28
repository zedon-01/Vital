import React from 'react';
import { MUSCLES, MODULES } from '../data/anatomyData';
import { BarChart3, Target, Award, Shield, CheckCircle2, AlertTriangle, TrendingUp } from 'lucide-react';

export default function PersonalStats({ userData }) {
  const mastered = userData.masteredMuscles || {};
  const entries = Object.entries(mastered);
  
  let totalCorrect = 0;
  let totalAnswered = 0;
  entries.forEach(([_, data]) => {
    totalCorrect += data.correct || 0;
    totalAnswered += data.total || 0;
  });

  const overallAccuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
  const masteredCount = entries.filter(([_, d]) => d.score >= 80).length;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      
      {/* Header */}
      <div className="glass-panel p-6 mb-8 border border-slate-700/80">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
              <BarChart3 size={28} className="text-emerald-400" />
              <span>Osobní statistiky & Analýza učení</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Přehledná analytika tvého pokroku a přesnosti odpovědí pro zkoušku fitness instruktora.
            </p>
          </div>
        </div>
      </div>

      {/* Top Stat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="glass-panel p-5 border border-slate-800 bg-slate-950/80 text-center">
          <div className="text-3xl font-black text-emerald-400">{overallAccuracy}%</div>
          <div className="text-xs text-slate-400 font-semibold mt-1">Celková úspěšnost</div>
        </div>
        <div className="glass-panel p-5 border border-slate-800 bg-slate-950/80 text-center">
          <div className="text-3xl font-black text-cyan-400">{totalAnswered}</div>
          <div className="text-xs text-slate-400 font-semibold mt-1">Celkem odpovědí</div>
        </div>
        <div className="glass-panel p-5 border border-slate-800 bg-slate-950/80 text-center">
          <div className="text-3xl font-black text-amber-400">{masteredCount} / {MUSCLES.length}</div>
          <div className="text-xs text-slate-400 font-semibold mt-1">Svalů 80%+ Mastered</div>
        </div>
        <div className="glass-panel p-5 border border-slate-800 bg-slate-950/80 text-center">
          <div className="text-3xl font-black text-purple-400">{userData.streak || 1}</div>
          <div className="text-xs text-slate-400 font-semibold mt-1">Dny v řadě (Streak)</div>
        </div>
      </div>

      {/* Accuracy breakdown per Anatomical Module */}
      <div className="glass-panel p-6 border border-slate-700/80 mb-8">
        <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <TrendingUp size={18} className="text-emerald-400" />
          <span>Úspěšnost podle anatomických modulů:</span>
        </h2>

        <div className="space-y-4">
          {MODULES.map(mod => {
            const modMuscles = MUSCLES.filter(m => m.module === mod.id);
            let modCorr = 0;
            let modTot = 0;

            modMuscles.forEach(m => {
              const d = mastered[m.id];
              if (d) {
                modCorr += d.correct || 0;
                modTot += d.total || 0;
              }
            });

            const percent = modTot > 0 ? Math.round((modCorr / modTot) * 100) : 0;

            return (
              <div key={mod.id} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-300">
                  <span>{mod.number}. {mod.title}</span>
                  <span className="font-extrabold text-emerald-400">{percent}% ({modCorr}/{modTot})</span>
                </div>
                <div className="duo-progress-container h-2.5">
                  <div className="duo-progress-fill" style={{ width: `${percent}%` }}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
