import React, { useState } from 'react';
import { MUSCLES } from '../data/anatomyData';
import { Activity, Play, ChevronRight, Sparkles, Layers } from 'lucide-react';

export default function BodyMapSelector({ onSelectMuscle, onStartRegionSession }) {
  const [selectedRegion, setSelectedRegion] = useState('shoulder');

  const regions = [
    {
      id: 'cervical',
      name: 'Krční páteř & Šíje',
      module: 'mod-3',
      color: 'from-blue-500 to-indigo-600',
      muscles: MUSCLES.filter(m => m.module === 'mod-3'),
      description: 'Hluboké šíjové svaly (mm. suboccipitales), scaleni, sternocleidomastoideus.'
    },
    {
      id: 'back',
      name: 'Páteř & Hluboké zádové svaly',
      module: 'mod-2',
      color: 'from-emerald-500 to-teal-600',
      muscles: MUSCLES.filter(m => m.module === 'mod-2'),
      description: 'Erector spinae, splenius, spinalis, interspinales, intertransversarii, multifidi, rotatores.'
    },
    {
      id: 'scapula',
      name: 'Lopatka & Pletenec ramenní',
      module: 'mod-4',
      color: 'from-cyan-500 to-blue-600',
      muscles: MUSCLES.filter(m => m.module === 'mod-4'),
      description: 'Trapezius, rhomboidei, levator scapulae, pectoralis minor, subclavius, serratus anterior.'
    },
    {
      id: 'shoulder',
      name: 'Rameno & Rotátorová manžeta',
      module: 'mod-5',
      color: 'from-purple-500 to-indigo-600',
      muscles: MUSCLES.filter(m => m.module === 'mod-5'),
      description: 'Pectoralis major, latissimus dorsi, teres major/minor, infraspinatus, supraspinatus, subscapularis, deltoideus, coracobrachialis.'
    },
    {
      id: 'arm',
      name: 'Paže & Loketní kloub',
      module: 'mod-6',
      color: 'from-amber-500 to-orange-600',
      muscles: MUSCLES.filter(m => m.module === 'mod-6'),
      description: 'Biceps brachii, brachialis, brachioradialis, triceps brachii.'
    },
    {
      id: 'thorax',
      name: 'Hrudník & Dýchací svaly',
      module: 'mod-7',
      color: 'from-rose-500 to-pink-600',
      muscles: MUSCLES.filter(m => m.module === 'mod-7'),
      description: 'Diaphragma (bránice), intercostales externi et interni.'
    },
    {
      id: 'abdomen',
      name: 'Břicho & Bedra',
      module: 'mod-8',
      color: 'from-emerald-600 to-green-700',
      muscles: MUSCLES.filter(m => m.module === 'mod-8'),
      description: 'Rectus abdominis, obliqui, transversus abdominis, quadratus lumborum.'
    },
    {
      id: 'hip',
      name: 'Kyčel & Pánev',
      module: 'mod-10',
      color: 'from-indigo-600 to-purple-700',
      muscles: MUSCLES.filter(m => m.module === 'mod-10'),
      description: 'Iliopsoas, gluteus maximus, gluteus medius, TFL, pectineus, adduktory, gracilis.'
    },
    {
      id: 'thigh',
      name: 'Stehno & Koleno',
      module: 'mod-11',
      color: 'from-yellow-500 to-amber-600',
      muscles: MUSCLES.filter(m => m.module === 'mod-11'),
      description: 'Quadriceps femoris, sartorius, hamstringy (biceps femoris, semimembranosus, semitendinosus).'
    },
    {
      id: 'leg',
      name: 'Bérec, Hlezen & Noha',
      module: 'mod-12',
      color: 'from-teal-500 to-cyan-600',
      muscles: MUSCLES.filter(m => m.module === 'mod-12'),
      description: 'Tibialis anterior, gastrocnemius, soleus.'
    }
  ];

  const activeRegionObj = regions.find(r => r.id === selectedRegion) || regions[0];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 mb-8 border border-slate-700/80">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-xs font-bold mb-2">
              <Sparkles size={14} />
              <span>Interaktivní Anatomická Mapa Těla</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white">
              Výuka a procvičování podle anatomické oblasti
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Vyber si část těla, prohlédni si svalový aparát a spusť cílený trénink pro danou oblast.
            </p>
          </div>

          <button
            onClick={() => onStartRegionSession(activeRegionObj.module)}
            className="btn btn-primary px-6 py-3 text-sm shrink-0 shadow-lg shadow-emerald-500/20"
          >
            <Play size={16} className="fill-current" />
            <span>Spustit test pro {activeRegionObj.name}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Region Selector Sidebar + Muscles Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Region List Sidebar */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">
            Vyber oblast těla:
          </h2>

          {regions.map(r => {
            const isSelected = r.id === selectedRegion;
            return (
              <button
                key={r.id}
                onClick={() => setSelectedRegion(r.id)}
                className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-slate-800 border-emerald-500/60 shadow-md text-white font-bold'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${r.color}`}></div>
                  <span className="text-sm leading-snug">{r.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500 bg-slate-950 px-2 py-0.5 rounded-full border border-slate-800">
                    {r.muscles.length} svalů
                  </span>
                  <ChevronRight size={16} className={isSelected ? 'text-emerald-400' : 'text-slate-600'} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Region Muscle Explorer Panel */}
        <div className="lg:col-span-2 glass-panel p-6 border border-slate-700/80">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Detail oblasti</span>
              <h2 className="text-xl font-extrabold text-white">{activeRegionObj.name}</h2>
              <p className="text-xs text-slate-400 mt-1">{activeRegionObj.description}</p>
            </div>

            <button
              onClick={() => onStartRegionSession(activeRegionObj.module)}
              className="btn btn-primary text-xs px-4 py-2 shrink-0"
            >
              <Play size={14} className="fill-current" />
              <span>Otestovat oblast</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeRegionObj.muscles.map(m => (
              <div
                key={m.id}
                onClick={() => onSelectMuscle(m)}
                className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-extrabold text-white text-sm group-hover:text-emerald-400 transition-colors">
                      {m.cz}
                    </h3>
                    {m.tonicPhasic === 'tonic' && <span className="badge badge-tonic text-[10px] py-0">Ton.</span>}
                    {m.tonicPhasic === 'phasic' && <span className="badge badge-phasic text-[10px] py-0">Fáz.</span>}
                  </div>
                  <div className="text-xs font-bold text-emerald-400 italic mb-2">
                    {m.lat}
                  </div>

                  <div className="space-y-1 text-xs text-slate-300">
                    <div className="line-clamp-2">
                      <span className="font-semibold text-slate-500">Začátek:</span> {m.origo}
                    </div>
                    <div className="line-clamp-2">
                      <span className="font-semibold text-slate-500">Úpon:</span> {m.insertio}
                    </div>
                    <div className="line-clamp-2">
                      <span className="font-semibold text-slate-500">Funkce:</span> {m.function}
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-900 flex items-center justify-between text-[11px] font-bold text-emerald-400 group-hover:underline">
                  <span>Procvičit tento sval ➔</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
