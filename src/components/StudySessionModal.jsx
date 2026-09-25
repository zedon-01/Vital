import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { X, CheckCircle2, XCircle, ArrowRight, RotateCcw, Award, Star, HelpCircle, Check, Keyboard } from 'lucide-react';
import { recordQuestionResult, recordModuleCompletion } from '../utils/storageManager';
import { isFlexibleMatch } from '../utils/questionGenerator';

export default function StudySessionModal({ moduleId, questions, onClose, onRefreshData }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [typedAnswer, setTypedAnswer] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  
  // Matching exercise state
  const [matchedPairs, setMatchedPairs] = useState({});
  const [selectedLeft, setSelectedLeft] = useState(null);

  // Active recall state
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);

  // Session results summary
  const [correctCount, setCorrectCount] = useState(0);
  const [totalXpEarned, setTotalXpEarned] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = questions[currentIndex];
  const progressPercent = Math.round(((currentIndex) / questions.length) * 100);

  // Trigger confetti on completion
  useEffect(() => {
    if (isCompleted) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // fallback if confetti fails
      }
    }
  }, [isCompleted]);

  if (!currentQ && !isCompleted) return null;

  // Handle Check Answer
  const handleCheckAnswer = () => {
    if (isChecked) return;

    let correct = false;

    if (currentQ.type === 'multiple-choice') {
      correct = selectedOption === currentQ.correctAnswer;
    } else if (currentQ.type === 'type-in') {
      correct = isFlexibleMatch(typedAnswer, currentQ.correctAnswer);
    } else if (currentQ.type === 'true-false') {
      correct = selectedOption === currentQ.isTrue;
    } else if (currentQ.type === 'matching') {
      correct = Object.keys(matchedPairs).length === currentQ.pairs.length;
    }

    setIsCorrect(correct);
    setIsChecked(true);

    if (correct) {
      setCorrectCount(prev => prev + 1);
      setTotalXpEarned(prev => prev + 20);
    } else {
      setTotalXpEarned(prev => prev + 5);
    }

    // Record result in storage
    recordQuestionResult(currentQ.muscleId, correct, 20);
  };

  // Handle Active Recall Self-Assessment
  const handleRecallRating = (quality) => {
    const correct = quality === 'easy' || quality === 'good';
    if (correct) {
      setCorrectCount(prev => prev + 1);
      setTotalXpEarned(prev => prev + 20);
    } else {
      setTotalXpEarned(prev => prev + 5);
    }
    recordQuestionResult(currentQ.muscleId, correct, 20);
    handleNextQuestion();
  };

  // Handle Next Question
  const handleNextQuestion = () => {
    setIsChecked(false);
    setSelectedOption(null);
    setTypedAnswer('');
    setSelectedLeft(null);
    setMatchedPairs({});
    setIsAnswerRevealed(false);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Session finished
      const accuracy = Math.round(((correctCount + (isCorrect ? 1 : 0)) / questions.length) * 100);
      recordModuleCompletion(moduleId, accuracy);
      onRefreshData();
      setIsCompleted(true);
    }
  };

  // Handle Matching click
  const handleLeftClick = (item) => {
    if (isChecked) return;
    setSelectedLeft(item);
  };

  const handleRightClick = (rightText) => {
    if (!selectedLeft || isChecked) return;
    const isPairCorrect = currentQ.pairs.find(p => p.left === selectedLeft.left)?.right === rightText;
    if (isPairCorrect) {
      const updated = { ...matchedPairs, [selectedLeft.id]: true };
      setMatchedPairs(updated);
      setSelectedLeft(null);
      if (Object.keys(updated).length === currentQ.pairs.length) {
        setIsCorrect(true);
        setIsChecked(true);
        setCorrectCount(prev => prev + 1);
        setTotalXpEarned(prev => prev + 20);
        recordQuestionResult(null, true, 20);
      }
    } else {
      setSelectedLeft(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 md:p-6 overflow-y-auto">
      <div className="w-full max-w-2xl glass-panel border border-slate-700/80 bg-slate-900/95 rounded-2xl shadow-2xl overflow-hidden flex flex-col min-h-[540px]">
        
        {/* Header with Progress Bar & Close */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X size={22} />
          </button>

          {/* Duolingo Progress Bar */}
          {!isCompleted && (
            <div className="flex-1 max-w-md">
              <div className="flex justify-between text-xs font-semibold text-slate-400 mb-1">
                <span>Lekce {currentIndex + 1} z {questions.length}</span>
                <span>{progressPercent}%</span>
              </div>
              <div className="duo-progress-container">
                <div
                  className="duo-progress-fill"
                  style={{ width: `${((currentIndex) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          <div className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
            +{totalXpEarned} XP
          </div>
        </div>

        {/* Main Content Area */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          {!isCompleted ? (
            <div>
              {/* Category Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-bold mb-4 border border-slate-700">
                {currentQ.type === 'type-in' ? (
                  <Keyboard size={14} className="text-cyan-400" />
                ) : (
                  <HelpCircle size={14} className="text-emerald-400" />
                )}
                <span>{currentQ.category} {currentQ.type === 'type-in' && '(Ruční vypisování)'}</span>
              </div>

              {/* Question Title & Highlight Text */}
              <h2 className="text-lg md:text-xl font-bold text-white mb-2 leading-snug">
                {currentQ.title}
              </h2>

              {currentQ.highlightText && (
                <div className="text-xl md:text-2xl font-black text-emerald-400 mb-6 tracking-tight bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 text-center">
                  {currentQ.highlightText}
                </div>
              )}

              {/* Exercise Type 0: Type-in (Ruční vypisování textu) */}
              {currentQ.type === 'type-in' && (
                <div className="mb-6 space-y-3">
                  <div className="relative">
                    <input
                      type="text"
                      disabled={isChecked}
                      placeholder={currentQ.placeholder || 'Napiš odpověď...'}
                      value={typedAnswer}
                      onChange={(e) => setTypedAnswer(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && typedAnswer.trim() && !isChecked) {
                          handleCheckAnswer();
                        }
                      }}
                      className="w-full p-4 rounded-xl bg-slate-950 border border-slate-700 text-white font-semibold text-base outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all placeholder:text-slate-600"
                      autoFocus
                    />
                  </div>
                  <p className="text-xs text-slate-400 italic">
                    💡 Malá a velká písmena ani háčky/čárky se nerozlišují. Stiskni Enter nebo tlačítko Zkontrolovat.
                  </p>
                </div>
              )}

              {/* Exercise Type 1: Multiple Choice */}
              {currentQ.type === 'multiple-choice' && (
                <div className="space-y-3 mb-6">
                  {currentQ.options.map((opt, idx) => {
                    const isSelected = selectedOption === opt;
                    let optStyle = "bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700/80";

                    if (isChecked) {
                      if (opt === currentQ.correctAnswer) {
                        optStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold";
                      } else if (isSelected) {
                        optStyle = "bg-rose-500/20 border-rose-500 text-rose-300";
                      }
                    } else if (isSelected) {
                      optStyle = "bg-emerald-500/15 border-emerald-500 text-emerald-300 font-semibold shadow-sm";
                    }

                    return (
                      <button
                        key={idx}
                        disabled={isChecked}
                        onClick={() => setSelectedOption(opt)}
                        className={`w-full p-4 text-left rounded-xl border transition-all text-sm flex items-start gap-3 ${optStyle}`}
                      >
                        <span className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="leading-relaxed">{opt}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Exercise Type 2: True / False */}
              {currentQ.type === 'true-false' && (
                <div className="space-y-4 mb-6">
                  <div className="p-4 bg-slate-950/70 rounded-xl border border-slate-800 text-slate-200 text-sm leading-relaxed mb-4 italic">
                    "{currentQ.statement}"
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'Pravda (Ano)', value: true },
                      { label: 'Lež (Ne)', value: false }
                    ].map((btn, idx) => {
                      const isSelected = selectedOption === btn.value;
                      let btnStyle = "bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700";
                      if (isSelected) {
                        btnStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-400 font-bold";
                      }
                      return (
                        <button
                          key={idx}
                          disabled={isChecked}
                          onClick={() => setSelectedOption(btn.value)}
                          className={`p-4 rounded-xl border font-bold text-base transition-all ${btnStyle}`}
                        >
                          {btn.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Exercise Type 3: Matching Pairs */}
              {currentQ.type === 'matching' && (
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Česky</div>
                    {currentQ.pairs.map(pair => {
                      const isMatched = matchedPairs[pair.id];
                      const isSelected = selectedLeft?.id === pair.id;
                      return (
                        <button
                          key={pair.id}
                          disabled={isMatched || isChecked}
                          onClick={() => handleLeftClick(pair)}
                          className={`w-full p-3 rounded-xl text-xs font-semibold text-left border transition-all ${
                            isMatched
                              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 opacity-60'
                              : isSelected
                              ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                              : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                          }`}
                        >
                          {pair.left} {isMatched && '✓'}
                        </button>
                      );
                    })}
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Latinsky</div>
                    {currentQ.pairs.map(pair => {
                      const isMatched = Object.values(matchedPairs).length > 0 && currentQ.pairs.find(p => p.left === pair.left && matchedPairs[p.id]);
                      return (
                        <button
                          key={pair.id}
                          disabled={isMatched || !selectedLeft || isChecked}
                          onClick={() => handleRightClick(pair.right)}
                          className={`w-full p-3 rounded-xl text-xs font-semibold text-left border transition-all ${
                            isMatched
                              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 opacity-60'
                              : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                          }`}
                        >
                          {pair.right}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Exercise Type 4: Active Recall Flashcard */}
              {currentQ.type === 'active-recall' && (
                <div className="space-y-4 mb-6">
                  {!isAnswerRevealed ? (
                    <div className="text-center p-8 bg-slate-950/60 rounded-2xl border border-slate-800">
                      <p className="text-slate-300 text-sm mb-4">
                        Řekni si nahlas nebo si vybav 3 klíčové věci z anatomické osnovy:
                      </p>
                      <div className="text-emerald-400 font-bold text-base mb-6">
                        ZAČÁTEK (Origo) ➔ ÚPON (Insertio) ➔ FUNKCE
                      </div>
                      <button
                        onClick={() => setIsAnswerRevealed(true)}
                        className="btn btn-primary"
                      >
                        Zobrazit správnou odpověď z PDF
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3 bg-slate-950 p-5 rounded-2xl border border-slate-800 text-sm">
                      <div>
                        <span className="font-bold text-emerald-400">Začátek (origo):</span>{' '}
                        <span className="text-slate-200">{currentQ.origo}</span>
                      </div>
                      <div className="border-t border-slate-800 pt-2">
                        <span className="font-bold text-cyan-400">Úpon (insertio):</span>{' '}
                        <span className="text-slate-200">{currentQ.insertio}</span>
                      </div>
                      <div className="border-t border-slate-800 pt-2">
                        <span className="font-bold text-amber-400">Funkce:</span>{' '}
                        <span className="text-slate-200">{currentQ.function}</span>
                      </div>
                      {currentQ.examNotes && (
                        <div className="border-t border-slate-800 pt-2 text-rose-300 font-semibold bg-rose-500/10 p-2.5 rounded-lg">
                          {currentQ.examNotes}
                        </div>
                      )}

                      <div className="pt-4 border-t border-slate-800 text-center">
                        <p className="text-xs text-slate-400 font-semibold mb-3">Jak dobře jsi si to vybavil?</p>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            onClick={() => handleRecallRating('hard')}
                            className="p-3 bg-rose-500/15 border border-rose-500/30 text-rose-300 rounded-xl font-bold text-xs hover:bg-rose-500/25"
                          >
                            Těžké / Chybovalo se (+5 XP)
                          </button>
                          <button
                            onClick={() => handleRecallRating('easy')}
                            className="p-3 bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 rounded-xl font-bold text-xs hover:bg-emerald-500/25"
                          >
                            Výborně! Správně (+20 XP)
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            /* Completion Screen */
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-gradient-to-tr from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-950 shadow-xl shadow-emerald-500/30">
                <Award size={44} />
              </div>
              <h2 className="text-2xl font-extrabold text-white mb-2">
                Lekce úspěšně dokončena!
              </h2>
              <p className="text-slate-300 text-sm mb-6">
                Skvělá práce! Rozšiřuješ své znalosti pro zkoušku fitness instruktora.
              </p>

              <div className="grid grid-cols-3 gap-3 max-w-md mx-auto mb-8 bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
                <div className="text-center">
                  <div className="text-2xl font-black text-emerald-400">+{totalXpEarned}</div>
                  <div className="text-xs text-slate-400 font-semibold">Získané XP</div>
                </div>
                <div className="text-center border-x border-slate-800">
                  <div className="text-2xl font-black text-cyan-400">
                    {Math.round((correctCount / questions.length) * 100)}%
                  </div>
                  <div className="text-xs text-slate-400 font-semibold">Úspěšnost</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-black text-amber-400">
                    {correctCount}/{questions.length}
                  </div>
                  <div className="text-xs text-slate-400 font-semibold">Správně</div>
                </div>
              </div>

              <button
                onClick={onClose}
                className="btn btn-primary px-8 py-3.5 text-base shadow-lg shadow-emerald-500/25"
              >
                Pokračovat v učení
              </button>
            </div>
          )}

          {/* Bottom Action Footer for Standard & Type-in Questions */}
          {!isCompleted && currentQ.type !== 'active-recall' && (
            <div>
              {!isChecked ? (
                <button
                  disabled={
                    (currentQ.type === 'multiple-choice' && selectedOption === null) ||
                    (currentQ.type === 'type-in' && !typedAnswer.trim()) ||
                    (currentQ.type === 'true-false' && selectedOption === null)
                  }
                  onClick={handleCheckAnswer}
                  className="btn btn-primary w-full py-3.5 text-base shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Zkontrolovat
                </button>
              ) : (
                <div className={`p-4 rounded-xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                  isCorrect
                    ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-200'
                    : 'bg-rose-950/80 border-rose-500/60 text-rose-200'
                }`}>
                  <div className="flex items-start gap-3">
                    {isCorrect ? (
                      <CheckCircle2 size={26} className="text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle size={26} className="text-rose-400 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <div className="font-bold text-base">
                        {isCorrect ? 'Skvělá práce! Přesně tak!' : 'Neshoduje se se skripty!'}
                      </div>
                      <div className="text-xs leading-relaxed mt-1 opacity-90">
                        {currentQ.type === 'type-in' && !isCorrect && (
                          <div className="font-bold text-white mb-1">
                            Správná odpoveď ze skript: <span className="text-emerald-300">{currentQ.correctAnswer}</span>
                          </div>
                        )}
                        {currentQ.explanation}
                      </div>
                      {currentQ.unusualFormulation && (
                        <div className="text-xs font-semibold text-amber-300 mt-1">
                          ⚠️ {currentQ.unusualFormulation}
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={handleNextQuestion}
                    className={`btn text-xs px-5 py-2.5 shrink-0 ${
                      isCorrect ? 'btn-primary' : 'bg-rose-600 text-white hover:bg-rose-500'
                    }`}
                  >
                    <span>Pokračovat</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
