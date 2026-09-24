import React, { useState } from 'react';
import { MUSCLES } from '../data/anatomyData';
import { Search, Filter, BookOpen, AlertTriangle, Eye, EyeOff, Play, Target } from 'lucide-react';

export default function MuscleAtlas({ userData, onSelectMuscle }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [revealedCards, setRevealedCards] = useState({});

  const filterOptions = [
    { id: 'all', label: 'Všechny svaly' },
    { id: 'mod-2', label: 'Záda a páteř' },
    { id: 'mod-3', label: 'Krční páteř & Šíje' },
    { id: 'mod-4', label: 'Lopatka' },
    { id: 'mod-5', label: 'Ramenní kloub' },
    { id: 'mod-6', label: 'Loket & Paže' },
    { id: 'mod-7', label: 'Hrudník' },
    { id: 'mod-8', label: 'Břicho' },
    { id: 'mod-9', label: 'Pánevní dno' },
    { id: 'mod-10', label: 'Kyčel' },
    { id: 'mod-11', label: 'Stehno & Koleno' },
    { id: 'mod-12', label: 'Bérec & Noha' },
    { id: 'tonic', label: 'Tonické svaly' },
    { id: 'phasic', label: 'Fázické svaly' }
  ];

  const filteredMuscles = MUSCLES.filter(m => {
    // Category filter
    if (selectedFilter === 'tonic' && m.tonicPhasic !== 'tonic' && m.tonicPhasic !== 'both') return false;
    if (selectedFilter === 'phasic' && m.tonicPhasic !== 'phasic' && m.tonicPhasic !== 'both') return false;
    if (selectedFilter !== 'all' && selectedFilter !== 'tonic' && selectedFilter !== 'phasic' && m.module !== selectedFilter) return false;

    // Search filter
    if (searchTerm.trim() !== '') {
      const q = searchTerm.toLowerCase();
      return (
        m.cz.toLowerCase().includes(q) ||
        m.lat.toLowerCase().includes(q) ||
        m.origo.toLowerCase().includes(q) ||
        m.insertio.toLowerCase().includes(q) ||
        m.function.toLowerCase().includes(q) ||
        (m.examNotes && m.examNotes.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const toggleRevealCard = (e, id) => {
    e.stopPropagation();
    setRevealedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      
      {/* Search & Filter Header */}
      <div className="glass-panel p-6 mb-8 border border-slate-700/80">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
              <BookOpen size={26} className="text-emerald-400" />
              <span>Anatomický atlas svalů</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Vyhledej jakýkoliv sval nebo klikni na kartu pro cílené procvičování jednoho svalu.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-3 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Hledat sval, začátek, úpon, funkci..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          <Filter size={16} className="text-slate-400 shrink-0 mr-1" />
          {filterOptions.map(f => (
            <button
              key={f.id}
              onClick={() => setSelectedFilter(f.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedFilter === f.id
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  : 'bg-slate-800/80 text-slate-400 border border-slate-700 hover:text-slate-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Muscle Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredMuscles.map(m => {
          const isRevealed = revealedCards[m.id];
          const mastery = userData.masteredMuscles?.[m.id] || { score: 0 };
          const isMastered = mastery.score >= 80;

          return (
            <div
              key={m.id}
              onClick={() => onSelectMuscle(m)}
              className={`glass-panel p-5 card-hover relative flex flex-col justify-between border cursor-pointer group ${
                isMastered ? 'border-emerald-500/40 bg-slate-900/90' : 'border-slate-800 bg-slate-900/60'
              }`}
            >
              <div>
                {/* Header: Names & Badges */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="font-extrabold text-white text-base leading-tight group-hover:text-emerald-400 transition-colors">
                      {m.cz}
                    </h3>
                    <div className="text-sm font-bold text-emerald-400 italic mt-0.5">
                      {m.lat}
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    {m.tonicPhasic === 'tonic' && <span className="badge badge-tonic">Tonický</span>}
                    {m.tonicPhasic === 'phasic' && <span className="badge badge-phasic">Fázický</span>}
                    {m.tonicPhasic === 'both' && <span className="badge badge-hss">Ton./Fáz.</span>}
                    {isMastered && (
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        80%+ Mastered
                      </span>
                    )}
                  </div>
                </div>

                {/* System Subtitle */}
                <div className="text-[11px] font-bold text-slate-400 tracking-wider uppercase mb-3">
                  {m.system}
                </div>

                {/* Active Recall Toggle Mode */}
                <div className="flex items-center justify-between mb-3 bg-slate-950/60 px-3 py-1.5 rounded-lg border border-slate-800 text-xs">
                  <span className="text-slate-400 font-semibold">Testování paměti:</span>
                  <button
                    onClick={(e) => toggleRevealCard(e, m.id)}
                    className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-bold transition-colors"
                  >
                    {isRevealed ? <EyeOff size={14} /> : <Eye size={14} />}
                    <span>{isRevealed ? 'Skrýt detaily' : 'Odkrýt kartu'}</span>
                  </button>
                </div>

                {/* Details Section (Origo, Insertio, Function) */}
                <div className={`space-y-3 text-xs leading-relaxed transition-all ${
                  !isRevealed ? 'blur-sm select-none opacity-40' : 'blur-none opacity-100'
                }`}>
                  {/* Origo */}
                  <div className="bg-slate-950/70 p-2.5 rounded-lg border border-slate-800">
                    <span className="font-extrabold text-emerald-400 block mb-0.5">
                      Začátek (Origo):
                    </span>
                    <span className="text-slate-200">{m.origo}</span>
                  </div>

                  {/* Insertio */}
                  <div className="bg-slate-950/70 p-2.5 rounded-lg border border-slate-800">
                    <span className="font-extrabold text-cyan-400 block mb-0.5">
                      Úpon (Insertio):
                    </span>
                    <span className="text-slate-200">{m.insertio}</span>
                  </div>

                  {/* Function */}
                  <div className="bg-slate-950/70 p-2.5 rounded-lg border border-slate-800">
                    <span className="font-extrabold text-amber-400 block mb-0.5">
                      Funkce:
                    </span>
                    <span className="text-slate-200">{m.function}</span>
                  </div>

                  {/* KE ZKOUŠCE Box */}
                  {m.examNotes && (
                    <div className="bg-amber-500/10 border border-amber-500/30 p-2.5 rounded-lg text-amber-300 font-semibold flex items-start gap-2">
                      <AlertTriangle size={16} className="shrink-0 text-amber-400 mt-0.5" />
                      <div>{m.examNotes}</div>
                    </div>
                  )}

                  {/* Unusual Formulation Warning */}
                  {m.unusualFormulation && (
                    <div className="bg-rose-500/10 border border-rose-500/30 p-2.5 rounded-lg text-rose-300 font-semibold text-[11px]">
                      ⚠️ {m.unusualFormulation}
                    </div>
                  )}
                </div>

              </div>

              {/* Action Footer */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-emerald-400 group-hover:text-emerald-300">
                <span className="flex items-center gap-1">
                  <Target size={14} />
                  <span>Procvičit samostatně</span>
                </span>
                <span>➔</span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
