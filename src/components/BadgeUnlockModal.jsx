import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Award, Star, X, Sparkles, Trophy } from 'lucide-react';

export default function BadgeUnlockModal({ badge, onClose }) {
  useEffect(() => {
    if (badge) {
      try {
        // Double burst confetti explosion!
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.5 }
        });
        setTimeout(() => {
          confetti({
            particleCount: 80,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
          });
          confetti({
            particleCount: 80,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
          });
        }, 250);
      } catch (e) {}
    }
  }, [badge]);

  if (!badge) return null;

  const Icon = badge.icon || Award;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-md glass-panel border border-amber-500/50 bg-slate-900/95 p-8 text-center rounded-3xl shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        
        {/* Glowing Background Glow Radial */}
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Animated Badge Icon Shield */}
        <div className="relative mb-6">
          <div className="w-24 h-24 mx-auto bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 rounded-3xl p-0.5 shadow-2xl shadow-amber-500/40 animate-pulse">
            <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center text-amber-400">
              <Icon size={48} className="pulse-element" />
            </div>
          </div>
          <div className="absolute -bottom-2 right-1/3 bg-amber-500 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full uppercase tracking-widest shadow-md">
            UNLOCKED!
          </div>
        </div>

        {/* Badge Title & Subtitle */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-extrabold mb-2">
          <Sparkles size={14} />
          <span>NOVÝ ODZNAK ODEMČEN!</span>
        </div>

        <h2 className="text-2xl font-black text-white mb-2 tracking-tight">
          {badge.name}
        </h2>

        <p className="text-xs text-slate-300 leading-relaxed max-w-xs mx-auto mb-6">
          {badge.description}
        </p>

        {/* XP Bonus Toast */}
        <div className="p-3 bg-emerald-500/15 border border-emerald-500/30 rounded-xl text-emerald-300 font-extrabold text-sm mb-6 flex items-center justify-center gap-2">
          <Star size={18} className="text-emerald-400 fill-emerald-400" />
          <span>+50 BONUS XP PŘIPSÁNO!</span>
        </div>

        {/* Confirm Button */}
        <button
          onClick={onClose}
          className="btn btn-primary w-full py-3.5 text-base font-extrabold shadow-lg shadow-amber-500/25"
        >
          <span>Skvělé! Pokračovat</span>
        </button>

      </div>
    </div>
  );
}
