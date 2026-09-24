import React from 'react';
import { FINAL_CHECKLIST } from '../data/anatomyData';
import { CheckSquare, Square, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { toggleChecklistItem } from '../utils/storageManager';

export default function FinalChecklist({ userData, onRefreshData }) {
  const checklistState = userData.checklist || {};

  const handleToggle = (id) => {
    toggleChecklistItem(id);
    onRefreshData();
  };

  const checkedCount = FINAL_CHECKLIST.filter(item => checklistState[item.id]).length;
  const progressPercent = Math.round((checkedCount / FINAL_CHECKLIST.length) * 100);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 mb-8 border border-slate-700/80">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-3">
              <Sparkles size={14} />
              <span>Strana 17 z Vital Institut skript</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
              Finální Zkouškový Checklist
            </h1>
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              Odsouhlas si každou kapitolu. Jakmile zvládneš všechny body bez nápovědy, máš anatomickou část zkoušky skutečně naučenou!
            </p>
          </div>

          {/* Progress Circle / Gauge */}
          <div className="flex flex-col items-center justify-center p-4 bg-slate-950/80 rounded-2xl border border-slate-800 shrink-0 min-w-[160px]">
            <div className="text-3xl font-black text-emerald-400">{progressPercent}%</div>
            <div className="text-xs text-slate-400 font-semibold mt-1">Příprava ke zkoušce</div>
            <div className="text-[11px] text-slate-500 font-bold mt-0.5">{checkedCount} / {FINAL_CHECKLIST.length} splněno</div>
          </div>
        </div>
      </div>

      {/* POSLEDNÍ RADA Box */}
      <div className="p-5 bg-gradient-to-r from-emerald-950/80 via-slate-900 to-emerald-950/80 border border-emerald-500/40 rounded-2xl mb-8 shadow-lg shadow-emerald-500/10">
        <div className="flex items-start gap-3">
          <Award size={24} className="text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-extrabold text-emerald-300 text-base mb-1">
              POSLEDNÍ RADA ZE SKRIPT
            </h3>
            <p className="text-xs text-slate-200 leading-relaxed">
              U každého svalu si při opakování řekni nahlas 3 věci:{' '}
              <strong className="text-emerald-400">ZAČÁTEK ➔ ÚPON ➔ FUNKCE</strong>. Jakmile je umíš bez nápovědy a zvládneš Test A1–A21, máš anatomickou část této osnovy skutečně naučenou.
            </p>
          </div>
        </div>
      </div>

      {/* Checklist Grid */}
      <div className="space-y-3">
        {FINAL_CHECKLIST.map(item => {
          const isChecked = Boolean(checklistState[item.id]);

          return (
            <div
              key={item.id}
              onClick={() => handleToggle(item.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                isChecked
                  ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                  : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                {isChecked ? (
                  <CheckSquare size={22} className="text-emerald-400 shrink-0" />
                ) : (
                  <Square size={22} className="text-slate-600 shrink-0" />
                )}
                <div>
                  <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase block mb-0.5">
                    {item.category}
                  </span>
                  <span className={`text-sm font-semibold ${isChecked ? 'line-through opacity-80' : ''}`}>
                    {item.text}
                  </span>
                </div>
              </div>

              {isChecked && (
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30 shrink-0">
                  Splněno ✓
                </span>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
