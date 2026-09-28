import React, { useState } from 'react';
import { ShoppingBag, Flame, Award, Shield, Palette, CheckCircle2, Lock, Sparkles, Star, Dumbbell, Activity, Keyboard, Trophy, Play } from 'lucide-react';
import { buyTheme, selectTheme, buyStreakFreeze, unlockBadge } from '../utils/storageManager';
import BadgeUnlockModal from './BadgeUnlockModal';

export default function XPShop({ userData, onRefreshData }) {
  const [activeTab, setActiveTab] = useState('themes'); // 'themes' | 'freeze' | 'badges'
  const [previewBadgeModal, setPreviewBadgeModal] = useState(null);

  const themes = [
    {
      id: 'emerald',
      name: 'Emerald Obsidian',
      description: 'Klasický tmavý smaragdový vzhled aplikace.',
      cost: 0,
      gradient: 'from-emerald-500 to-teal-600',
      borderColor: 'border-emerald-500'
    },
    {
      id: 'golden',
      name: 'Golden Instructor',
      description: 'Exkluzivní zlaté téma pro úspěšné instruktory.',
      cost: 500,
      gradient: 'from-amber-500 to-yellow-400',
      borderColor: 'border-amber-500'
    },
    {
      id: 'cyan',
      name: 'Cyber Neon Cyan',
      description: 'Moderní azurové neonové téma s tmavomodrým pozadím.',
      cost: 800,
      gradient: 'from-cyan-500 to-blue-500',
      borderColor: 'border-cyan-500'
    },
    {
      id: 'purple',
      name: 'Deep Space Purple',
      description: 'Temné noční fialové téma s hvězdným třpytem.',
      cost: 1200,
      gradient: 'from-purple-600 to-indigo-500',
      borderColor: 'border-purple-500'
    }
  ];

  const badges = [
    {
      id: 'b-streak-3',
      name: 'Stálý Student',
      description: 'Udržuj denní sérii alespoň 3 dny v řadě.',
      icon: Flame,
      color: 'text-amber-400',
      req: (data) => data.streak >= 3
    },
    {
      id: 'b-xp-500',
      name: 'XP Sběratel',
      description: 'Získej celkově alespoň 500 XP bodů.',
      icon: Star,
      color: 'text-yellow-400',
      req: (data) => data.xp >= 500
    },
    {
      id: 'b-rotator',
      name: 'Mistr Rotátorové Manžety',
      description: 'Zvládnuty svaly supraspinatus, infraspinatus, teres minor a subscapularis.',
      icon: Shield,
      color: 'text-emerald-400',
      req: (data) => {
        const rm = ['supraspinatus', 'infraspinatus', 'teres-minor', 'subscapularis'];
        return rm.every(id => data.masteredMuscles?.[id]?.score >= 80);
      }
    },
    {
      id: 'b-exam-100',
      name: 'Jedničkář A1–A21',
      description: 'Získej 100 % v ostrém zkouškovém testu.',
      icon: Award,
      color: 'text-cyan-400',
      req: (data) => data.examHistory?.some(h => h.percent === 100)
    },
    {
      id: 'b-marathon',
      name: 'Svalový Maratonist',
      description: 'Zodpovězeno alespoň 20 anatomických otázek.',
      icon: Dumbbell,
      color: 'text-rose-400',
      req: (data) => Object.values(data.masteredMuscles || {}).reduce((acc, m) => acc + (m.total || 0), 0) >= 20
    },
    {
      id: 'b-cervical',
      name: 'Mistr Šíje a Krku',
      description: 'Zvládnuty svaly mm. suboccipitales, scaleni a SCM.',
      icon: Activity,
      color: 'text-purple-400',
      req: (data) => {
        const neck = ['rectus-capitis-posterior-minor', 'scalenus-anterior', 'sternocleidomastoideus'];
        return neck.every(id => data.masteredMuscles?.[id]?.score >= 80);
      }
    },
    {
      id: 'b-exam-done',
      name: 'Zkouškový Bojovník',
      description: 'Dokonči alespoň 1 kompletní test A1–A21.',
      icon: Trophy,
      color: 'text-amber-500',
      req: (data) => data.examHistory?.length > 0
    },
    {
      id: 'b-typer-pro',
      name: 'Mistr Klávesnice',
      description: 'Správně zodpovězeny ruční vypisovací otázky v lekcích.',
      icon: Keyboard,
      color: 'text-teal-400',
      req: (data) => data.xp >= 300
    }
  ];

  const handleBuyTheme = (t) => {
    if (userData.unlockedThemes?.includes(t.id)) {
      selectTheme(t.id);
    } else {
      const res = buyTheme(t.id, t.cost);
      if (!res.success) {
        alert('Nemáš dostatek XP bodů!');
      }
    }
    onRefreshData();
  };

  const handleBuyFreeze = () => {
    const res = buyStreakFreeze(250);
    if (!res.success) {
      alert('Nemáš dostatek XP bodů (250 XP) nebo již štít vlastníš!');
    }
    onRefreshData();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      
      {/* Header */}
      <div className="glass-panel p-6 mb-8 border border-slate-700/80">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold mb-2">
              <Sparkles size={14} />
              <span>Studijní Obchůdek & Odznaky Úspěchů</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
              <ShoppingBag size={28} className="text-amber-400" />
              <span>Využití XP bodů (Bez peněz)</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Tvůj zisk XP bodů za učení můžeš proměnit ve vizuální témata, ochranu denní série nebo odznaky.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-950 p-3 rounded-2xl border border-slate-800">
            <Star className="text-emerald-400" size={20} />
            <div>
              <div className="text-xs text-slate-400 font-semibold">Tvoje XP konto:</div>
              <div className="text-lg font-black text-emerald-400">{userData.xp || 0} XP</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 mb-6 bg-slate-950/60 p-1.5 rounded-2xl border border-slate-800">
        <button
          onClick={() => setActiveTab('themes')}
          className={`flex-1 py-2.5 text-xs font-extrabold rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === 'themes' ? 'bg-slate-800 text-amber-400 border border-slate-700 shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Palette size={16} />
          <span>Vizuální Témata</span>
        </button>
        <button
          onClick={() => setActiveTab('freeze')}
          className={`flex-1 py-2.5 text-xs font-extrabold rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === 'freeze' ? 'bg-slate-800 text-amber-400 border border-slate-700 shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Flame size={16} />
          <span>Ochrana Série (Streak)</span>
        </button>
        <button
          onClick={() => setActiveTab('badges')}
          className={`flex-1 py-2.5 text-xs font-extrabold rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === 'badges' ? 'bg-slate-800 text-amber-400 border border-slate-700 shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Award size={16} />
          <span>Odznaky ({badges.filter(b => b.req(userData)).length}/{badges.length})</span>
        </button>
      </div>

      {/* Tab 1: Themes */}
      {activeTab === 'themes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {themes.map(t => {
            const isUnlocked = userData.unlockedThemes?.includes(t.id);
            const isActive = userData.activeTheme === t.id;

            return (
              <div
                key={t.id}
                className={`glass-panel p-5 border relative flex flex-col justify-between ${
                  isActive ? `${t.borderColor} bg-slate-900/90 shadow-lg` : 'border-slate-800 bg-slate-950/60'
                }`}
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${t.gradient} shadow-md`}></div>
                    <div>
                      <h3 className="font-extrabold text-white text-base">{t.name}</h3>
                      <p className="text-xs text-slate-400">{t.description}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-900 flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400">
                    {t.cost === 0 ? 'Zdarma' : `${t.cost} XP`}
                  </span>

                  <button
                    onClick={() => handleBuyTheme(t)}
                    disabled={isActive}
                    className={`btn text-xs py-2 px-4 ${
                      isActive
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 cursor-default'
                        : isUnlocked
                        ? 'btn-secondary'
                        : 'btn-primary'
                    }`}
                  >
                    {isActive ? 'Aktivní téma ✓' : isUnlocked ? 'Aktivovat' : `Koupit za ${t.cost} XP`}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 2: Streak Freeze */}
      {activeTab === 'freeze' && (
        <div className="glass-panel p-8 text-center border border-slate-700/80 max-w-xl mx-auto">
          <div className="w-20 h-20 bg-amber-500/15 border border-amber-500/30 text-amber-400 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl">
            <Flame size={44} className="fill-current pulse-element" />
          </div>
          <h2 className="text-2xl font-extrabold text-white mb-2">Štít Denní Série (Streak Freeze)</h2>
          <p className="text-xs text-slate-300 mb-6 leading-relaxed">
            Pokud si koupíš tento štít za 250 XP, tvá těžce vybudovaná denní série nezmizí, i když v náročný den vynecháš studium!
          </p>

          <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 mb-6 inline-block">
            <span className="text-xs text-slate-400 font-semibold block">Stav štítu:</span>
            <span className={`text-base font-black ${userData.streakFreeze ? 'text-emerald-400' : 'text-slate-500'}`}>
              {userData.streakFreeze ? 'ŠTÍT JE AKTIVNÍ ✓' : 'NEMÁŠ AKTIVNÍ ŠTÍT'}
            </span>
          </div>

          <div className="block">
            <button
              disabled={userData.streakFreeze || (userData.xp || 0) < 250}
              onClick={handleBuyFreeze}
              className="btn btn-primary px-8 py-3 text-sm font-bold shadow-lg disabled:opacity-50"
            >
              {userData.streakFreeze ? 'Štít již vlastníš' : 'Koupit Štít Série (250 XP)'}
            </button>
          </div>
        </div>
      )}

      {/* Tab 3: Achievement Badges */}
      {activeTab === 'badges' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {badges.map(b => {
            const Icon = b.icon;
            const isUnlocked = b.req(userData);

            return (
              <div
                key={b.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col justify-between gap-3 ${
                  isUnlocked
                    ? 'bg-slate-900/90 border-emerald-500/40 shadow-md'
                    : 'bg-slate-950/40 border-slate-800 opacity-80'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0 ${b.color}`}>
                    <Icon size={24} />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="font-extrabold text-white text-sm">{b.name}</h3>
                      {isUnlocked && (
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                          Odemčeno ✓
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{b.description}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-900 flex justify-end">
                  <button
                    onClick={() => setPreviewBadgeModal(b)}
                    className="btn btn-secondary text-[11px] py-1.5 px-3 font-bold text-amber-400 hover:text-amber-300"
                  >
                    <Sparkles size={14} />
                    <span>Otestovat animaci odemknutí 🎉</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Badge Unlock Celebration Modal */}
      {previewBadgeModal && (
        <BadgeUnlockModal
          badge={previewBadgeModal}
          onClose={() => setPreviewBadgeModal(null)}
        />
      )}

    </div>
  );
}
