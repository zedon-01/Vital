import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { MUSCLES } from '../data/anatomyData';
import { Zap, RotateCcw, Award, CheckCircle2, Flame, Clock } from 'lucide-react';
import { recordQuestionResult } from '../utils/storageManager';

export default function MatchingGame({ onRefreshData }) {
  const [gameState, setGameState] = useState('idle'); // 'idle' | 'playing' | 'gameover'
  const [pairs, setPairs] = useState([]);
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [matchedIds, setMatchedIds] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);

  // Start new matching round
  const startGame = () => {
    // Pick 6 random muscles
    const randomMuscles = [...MUSCLES].sort(() => 0.5 - Math.random()).slice(0, 6);
    const newPairs = randomMuscles.map(m => ({
      id: m.id,
      left: m.cz,
      right: m.lat,
      insertio: m.insertio
    }));

    setPairs(newPairs);
    setSelectedLeft(null);
    setMatchedIds([]);
    setScore(0);
    setTimeLeft(60);
    setGameState('playing');
  };

  // Timer effect
  useEffect(() => {
    if (gameState !== 'playing') return;
    if (timeLeft <= 0) {
      setGameState('gameover');
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  // Trigger win confetti
  useEffect(() => {
    if (gameState === 'gameover' && score > 0) {
      try {
        confetti({ particleCount: 80, spread: 60 });
      } catch (e) {}
    }
  }, [gameState, score]);

  const handleLeftClick = (item) => {
    if (matchedIds.includes(item.id)) return;
    setSelectedLeft(item);
  };

  const handleRightClick = (rightText) => {
    if (!selectedLeft || matchedIds.includes(selectedLeft.id)) return;
    const isCorrect = pairs.find(p => p.left === selectedLeft.left)?.right === rightText;

    if (isCorrect) {
      const newMatched = [...matchedIds, selectedLeft.id];
      setMatchedIds(newMatched);
      setScore(prev => prev + 20);
      recordQuestionResult(selectedLeft.id, true, 20);
      onRefreshData();
      setSelectedLeft(null);

      // Check if all matched, load next round
      if (newMatched.length === pairs.length) {
        setTimeout(() => {
          const randomMuscles = [...MUSCLES].sort(() => 0.5 - Math.random()).slice(0, 6);
          setPairs(randomMuscles.map(m => ({ id: m.id, left: m.cz, right: m.lat, insertio: m.insertio })));
          setMatchedIds([]);
        }, 500);
      }
    } else {
      setSelectedLeft(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      
      {/* Intro Screen */}
      {gameState === 'idle' && (
        <div className="glass-panel p-8 text-center border border-slate-700/80">
          <div className="w-20 h-20 bg-gradient-to-tr from-cyan-500 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-5 text-slate-950 shadow-xl shadow-cyan-500/20">
            <Zap size={44} />
          </div>
          <h1 className="text-3xl font-extrabold text-white mb-2">
            Rychlá Anatomická Spojovačka
          </h1>
          <p className="text-slate-300 text-sm max-w-xl mx-auto mb-6 leading-relaxed">
            Otestuj svou rychlost a paměť! Spojuj české a latinské názvy svalů v časovém limitu 60 sekund. Získej maximální skóre a XP.
          </p>

          <button
            onClick={startGame}
            className="btn btn-primary px-8 py-4 text-base font-bold shadow-xl shadow-emerald-500/30"
          >
            <Zap size={18} className="fill-current" />
            <span>Spustit spojovačku (60s)</span>
          </button>
        </div>
      )}

      {/* Playing Screen */}
      {gameState === 'playing' && (
        <div className="glass-panel p-6 border border-slate-700/80">
          {/* Top Scoreboard & Timer */}
          <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Clock size={20} className="text-cyan-400" />
              <span className={`text-xl font-extrabold ${timeLeft <= 10 ? 'text-rose-400 animate-pulse' : 'text-white'}`}>
                {timeLeft}s
              </span>
            </div>

            <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-xl">
              <Award size={18} className="text-emerald-400" />
              <span className="text-sm font-bold text-emerald-400">{score} Bodů</span>
            </div>
          </div>

          <p className="text-xs text-slate-400 mb-4 font-semibold text-center">
            Klikni na český název vlevo a pak na odpovídající latinský název vpravo:
          </p>

          {/* Matching Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Left Column (Czech) */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Česky</div>
              {pairs.map(p => {
                const isMatched = matchedIds.includes(p.id);
                const isSelected = selectedLeft?.id === p.id;
                return (
                  <button
                    key={p.id}
                    disabled={isMatched}
                    onClick={() => handleLeftClick(p)}
                    className={`w-full p-4 rounded-xl text-xs font-bold text-left border transition-all ${
                      isMatched
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 opacity-40 cursor-default'
                        : isSelected
                        ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-md scale-[1.02]'
                        : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700'
                    }`}
                  >
                    {p.left} {isMatched && '✓'}
                  </button>
                );
              })}
            </div>

            {/* Right Column (Latin) */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Latinsky</div>
              {[...pairs].sort((a, b) => a.right.localeCompare(b.right)).map(p => {
                const isMatched = matchedIds.includes(p.id);
                return (
                  <button
                    key={p.id}
                    disabled={isMatched || !selectedLeft}
                    onClick={() => handleRightClick(p.right)}
                    className={`w-full p-4 rounded-xl text-xs font-bold text-left border transition-all ${
                      isMatched
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 opacity-40 cursor-default'
                        : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700'
                    }`}
                  >
                    {p.right}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Game Over Screen */}
      {gameState === 'gameover' && (
        <div className="glass-panel p-8 text-center border border-slate-700/80">
          <div className="w-20 h-20 bg-gradient-to-tr from-emerald-500 to-cyan-500 rounded-3xl flex items-center justify-center mx-auto mb-4 text-slate-950 font-black text-3xl shadow-xl shadow-emerald-500/20">
            <Award size={44} />
          </div>
          <h2 className="text-2xl font-extrabold text-white mb-1">Čas vypršel!</h2>
          <p className="text-sm text-slate-300 mb-6">
            Dosáhl jsi skóre <strong className="text-emerald-400">{score} bodů</strong>!
          </p>

          <button
            onClick={startGame}
            className="btn btn-primary px-8 py-3.5 text-base font-bold shadow-lg shadow-emerald-500/20"
          >
            <RotateCcw size={18} />
            <span>Hrát znovu</span>
          </button>
        </div>
      )}

    </div>
  );
}
