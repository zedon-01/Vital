import React from 'react';
import { MUSCLES } from '../data/anatomyData';
import { AlertTriangle, Play, CheckCircle2, ShieldAlert, Sparkles, RefreshCw } from 'lucide-react';

export default function WeakSpots({ userData, onStartWeakSession }) {
  const weakIds = userData.weakTopics || [];
  const weakMuscles = MUSCLES.filter(m => weakIds.includes(m.id));

  // Spaced Repetition Due List
  const todayStr = new Date().toISOString().split('T')[0];
  const dueSR = Object.entries(userData.spacedRepetition || {})
    .filter(([id, data]) => data.dueDate <= todayStr)
    .map(([id]) => MUSCLES.find(m => m.id === id))
    .filter(Boolean);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      
      {/* Header */}
      <div className="glass-panel p-6 mb-8 border border-slate-700/80">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
              <AlertTriangle className="text-amber-400" size={26} />
              <span>Opakování slabých míst & Spaced Repetition</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Chytrý algoritmický systém, který automaticky detekuje svaly a otázky s vyšší chybovostí a plánuje jejich opakování.
            </p>
          </div>

          <button
            onClick={() => onStartWeakSession(weakIds)}
            className="btn btn-primary px-6 py-3 text-sm shrink-0 shadow-lg shadow-emerald-500/20"
          >
            <Play size={16} className="fill-current" />
            <span>Spustit trénink slabých míst ({weakIds.length})</span>
          </button>
        </div>
      </div>

      {/* Grid of Weak Muscles */}
      {weakMuscles.length > 0 ? (
        <div className="space-y-4 mb-8">
          <h2 className="text-base font-bold text-slate-300 flex items-center gap-2">
            <ShieldAlert size={18} className="text-amber-400" />
            <span>Svaly vyžadující procvičení ({weakMuscles.length}):</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {weakMuscles.map(m => {
              const stats = userData.masteredMuscles?.[m.id] || { score: 0, correct: 0, total: 0 };
              return (
                <div
                  key={m.id}
                  className="glass-panel p-4 border border-amber-500/30 bg-amber-500/5 rounded-xl flex items-start justify-between gap-3"
                >
                  <div>
                    <h3 className="font-extrabold text-white text-sm">
                      {m.cz}
                    </h3>
                    <div className="text-xs font-bold text-amber-400 italic">
                      {m.lat}
                    </div>
                    <div className="text-xs text-slate-400 mt-2 line-clamp-1">
                      <span className="font-semibold text-slate-300">Úpon:</span> {m.insertio}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-black text-rose-400 bg-rose-500/10 border border-rose-500/30 px-2.5 py-1 rounded-full">
                      {stats.score}% uspěšnost
                    </span>
                    <div className="text-[10px] text-slate-500 mt-1 font-semibold">
                      ({stats.correct}/{stats.total} správně)
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="glass-panel p-8 text-center border border-slate-700/80 mb-8">
          <CheckCircle2 size={48} className="text-emerald-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-1">Žádná kritická slabá místa!</h3>
          <p className="text-xs text-slate-400">
            Skvělá práce! Všechny dosud procvičované svaly zvládáš s vysokou úspěšností.
          </p>
        </div>
      )}

      {/* Spaced Repetition Schedule Section */}
      <div className="glass-panel p-6 border border-slate-700/80">
        <h2 className="text-base font-bold text-slate-300 flex items-center gap-2 mb-3">
          <RefreshCw size={18} className="text-cyan-400" />
          <span>Plánovač inteligentního opakování (Spaced Repetition)</span>
        </h2>
        <p className="text-xs text-slate-400 mb-4 leading-relaxed">
          Algoritmus vypočítává optimální časové intervaly pro nejefektivnější dlouhodobé zapamatování začátků, úponů a funkcí.
        </p>

        {dueSR.length > 0 ? (
          <div className="space-y-2">
            <div className="text-xs font-bold text-cyan-400 mb-2">Dnes na řadě k zopakování:</div>
            {dueSR.map(m => (
              <div key={m.id} className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                <span className="font-bold text-white">{m.cz} ({m.lat})</span>
                <span className="text-emerald-400 font-semibold">Nařadě k zopakování dnes</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-xs text-slate-500 italic">
            Všechna naplánovaná opakování pro dnešek jsou dokončena. Další karty se odemknou zítra!
          </div>
        )}
      </div>

    </div>
  );
}
