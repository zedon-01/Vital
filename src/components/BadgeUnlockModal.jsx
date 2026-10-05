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
      <div className="w-full max-w-sm glass-panel border border-amber-500/50 bg-slate-900/95 p-6 rounded-3xl shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-300 flex flex-col items-center text-center">
        
        {/* Glowing Background Glow Radial */}
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors z-20"
        >
          <X size={20} />
        </button>

        {/* Badge Icon Shield */}
        <div className="w-20 h-20 bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 rounded-3xl p-0.5 shadow-xl shadow-amber-500/30 mb-4 mt-2 flex items-center justify-center shrink-0">
          <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center text-amber-400">
            <Icon size={40} />
          </div>
        </div>

        {/* Header Tag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-extrabold mb-3">
          <Sparkles size={14} />
          <span>NOVÝ ODZNAK ODEMČEN!</span>
        </div>

        {/* Badge Title */}
        <h2 className="text-xl font-black text-white mb-2 tracking-tight">
          {badge.name}
        </h2>

        {/* Badge Description */}
        <p className="text-xs text-slate-300 leading-relaxed max-w-xs mb-5 px-2">
          {badge.description}
        </p>

        {/* XP Bonus Toast */}
        <div className="w-full p-2.5 bg-emerald-500/15 border border-emerald-500/30 rounded-xl text-emerald-300 font-extrabold text-xs mb-5 flex items-center justify-center gap-2">
          <Star size={16} className="text-emerald-400 fill-emerald-400" />
          <span>+50 BONUS XP PŘIPSÁNO!</span>
        </div>

        {/* Confirm Button */}
        <button
          onClick={onClose}
          className="btn btn-primary w-full py-3 text-sm font-extrabold shadow-lg shadow-amber-500/25"
        >
          <span>Skvělé! Pokračovat</span>
        </button>

      </div>
    </div>
  );
}
