import React, { useState } from 'react';
import { X, Play, AlertTriangle, Eye, EyeOff, CheckCircle2, XCircle, RotateCcw, HelpCircle } from 'lucide-react';
import { MUSCLES } from '../data/anatomyData';
import { recordQuestionResult } from '../utils/storageManager';
import { shuffleArray } from '../utils/questionGenerator';

export default function SingleMuscleDrillModal({ muscle, onClose, onRefreshData }) {
  const [activeTab, setActiveTab] = useState('card'); // 'card' | 'quiz'
  const [isRevealed, setIsRevealed] = useState(false);

  // Micro-quiz state for single muscle
  const [quizQuestions, setQuizQuestions] = useState(() => generateSingleMuscleQuiz(muscle));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  if (!muscle) return null;

  const currentQ = quizQuestions[currentIndex];

  const handleCheck = () => {
    if (isChecked) return;
    const correct = selectedOption === currentQ.correctAnswer;
    setIsCorrect(correct);
    setIsChecked(true);
    if (correct) setScore(prev => prev + 1);

    recordQuestionResult(muscle.id, correct, 15);
    onRefreshData();
  };

  const handleNext = () => {
    setIsChecked(false);
    setSelectedOption(null);
    if (currentIndex + 1 < quizQuestions.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const resetQuiz = () => {
    setQuizQuestions(generateSingleMuscleQuiz(muscle));
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsChecked(false);
    setIsCorrect(false);
    setScore(0);
    setIsFinished(false);
    setActiveTab('quiz');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 md:p-6 overflow-y-auto">
      <div className="w-full max-w-xl glass-panel border border-slate-700/80 bg-slate-900/95 rounded-2xl shadow-2xl overflow-hidden flex flex-col min-h-[500px]">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Detail a procvičování svalu</span>
            <h2 className="text-lg font-extrabold text-white leading-tight">{muscle.cz}</h2>
            <div className="text-xs font-bold text-emerald-400 italic">{muscle.lat}</div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X size={22} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 p-1">
          <button
            onClick={() => setActiveTab('card')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'card'
                ? 'bg-slate-800 text-emerald-400 border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            📖 Výuková karta svalu
          </button>
          <button
            onClick={resetQuiz}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'quiz'
                ? 'bg-slate-800 text-emerald-400 border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            ⚡ Cílený mikrokvíz (3 otázky)
          </button>
        </div>

        {/* Tab 1: Card Detail View */}
        {activeTab === 'card' && (
          <div className="p-6 flex-1 flex flex-col justify-between overflow-y-auto space-y-4">
            
            {/* System Badge */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {muscle.system}
              </span>

              <button
                onClick={() => setIsRevealed(!isRevealed)}
                className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30"
              >
                {isRevealed ? <EyeOff size={14} /> : <Eye size={14} />}
                <span>{isRevealed ? 'Skrýt text (Test)' : 'Odkrýt text'}</span>
              </button>
            </div>

            {/* Muscle Fact Cards */}
            <div className={`space-y-3 transition-all ${!isRevealed ? 'blur-sm select-none opacity-40' : ''}`}>
              <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
                <span className="font-extrabold text-emerald-400 text-xs block mb-1">Začátek (Origo):</span>
                <p className="text-xs text-slate-200 leading-relaxed">{muscle.origo}</p>
              </div>

              <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
                <span className="font-extrabold text-cyan-400 text-xs block mb-1">Úpon (Insertio):</span>
                <p className="text-xs text-slate-200 leading-relaxed">{muscle.insertio}</p>
              </div>

              <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
                <span className="font-extrabold text-amber-400 text-xs block mb-1">Funkce:</span>
                <p className="text-xs text-slate-200 leading-relaxed">{muscle.function}</p>
              </div>

              {muscle.examNotes && (
                <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-xl text-amber-300 font-semibold text-xs flex items-start gap-2">
                  <AlertTriangle size={16} className="shrink-0 text-amber-400 mt-0.5" />
                  <div>{muscle.examNotes}</div>
                </div>
              )}

              {muscle.unusualFormulation && (
                <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-xl text-rose-300 font-semibold text-xs">
                  ⚠️ {muscle.unusualFormulation}
                </div>
              )}
            </div>

            {/* Footer Drill Action */}
            <button
              onClick={resetQuiz}
              className="btn btn-primary w-full py-3 text-sm font-bold mt-4"
            >
              <Play size={16} className="fill-current" />
              <span>Spustit cílený kvíz pro {muscle.cz}</span>
            </button>
          </div>
        )}

        {/* Tab 2: Single Muscle Quiz */}
        {activeTab === 'quiz' && (
          <div className="p-6 flex-1 flex flex-col justify-between">
            {!isFinished ? (
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-2">
                  <span>Otázka {currentIndex + 1} z {quizQuestions.length}</span>
                  <span>Cílený kvíz</span>
                </div>

                <div className="duo-progress-container mb-4">
                  <div
                    className="duo-progress-fill"
                    style={{ width: `${((currentIndex + 1) / quizQuestions.length) * 100}%` }}
                  ></div>
                </div>

                <h3 className="text-base font-bold text-white mb-4">
                  {currentQ.title}
                </h3>

                <div className="space-y-2.5 mb-6">
                  {currentQ.options.map((opt, idx) => {
                    const isSelected = selectedOption === opt;
                    let style = "bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700";
                    if (isChecked) {
                      if (opt === currentQ.correctAnswer) style = "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold";
                      else if (isSelected) style = "bg-rose-500/20 border-rose-500 text-rose-300";
                    } else if (isSelected) {
                      style = "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold";
                    }

                    return (
                      <button
                        key={idx}
                        disabled={isChecked}
                        onClick={() => setSelectedOption(opt)}
                        className={`w-full p-3.5 text-left rounded-xl border text-xs font-medium transition-all ${style}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {!isChecked ? (
                  <button
                    disabled={!selectedOption}
                    onClick={handleCheck}
                    className="btn btn-primary w-full py-3 text-sm disabled:opacity-50"
                  >
                    Zkontrolovat
                  </button>
                ) : (
                  <div className={`p-4 rounded-xl border flex items-center justify-between gap-3 ${
                    isCorrect ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200' : 'bg-rose-950/80 border-rose-500/50 text-rose-200'
                  }`}>
                    <div className="text-xs">
                      <div className="font-bold">{isCorrect ? 'Správně!' : 'Chyba podle skript!'}</div>
                      <div className="mt-0.5 opacity-90">{currentQ.explanation}</div>
                    </div>
                    <button onClick={handleNext} className="btn btn-primary text-xs py-2 px-4 shrink-0">
                      Další ➔
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Quiz Finished */
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-xl font-extrabold text-white mb-1">
                  Kvíz pro {muscle.cz} dokončen!
                </h3>
                <p className="text-xs text-slate-400 mb-6">
                  Získal jsi <strong className="text-emerald-400">{score} ze 3</strong> správných odpovědí.
                </p>

                <div className="flex gap-3 justify-center">
                  <button onClick={resetQuiz} className="btn btn-secondary text-xs">
                    <RotateCcw size={14} />
                    <span>Zkusit znovu</span>
                  </button>
                  <button onClick={onClose} className="btn btn-primary text-xs">
                    Zavřít detail
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

// Helper generator for single muscle quiz
function generateSingleMuscleQuiz(muscle) {
  const otherMuscles = MUSCLES.filter(m => m.id !== muscle.id);

  // 1. Origo Q
  const wrongOrigos = shuffleArray(otherMuscles).slice(0, 3).map(m => m.origo);
  const q1 = {
    title: `Kde začíná (origo) ${muscle.cz} (${muscle.lat})?`,
    options: shuffleArray([muscle.origo, ...wrongOrigos]),
    correctAnswer: muscle.origo,
    explanation: `Začátek: ${muscle.origo}`
  };

  // 2. Insertio Q
  const wrongInsertios = shuffleArray(otherMuscles).slice(0, 3).map(m => m.insertio);
  const q2 = {
    title: `Kam se upíná (insertio) ${muscle.cz} (${muscle.lat})?`,
    options: shuffleArray([muscle.insertio, ...wrongInsertios]),
    correctAnswer: muscle.insertio,
    explanation: `Úpon: ${muscle.insertio}`
  };

  // 3. Function Q
  const wrongFuncs = shuffleArray(otherMuscles).slice(0, 3).map(m => m.function);
  const q3 = {
    title: `Jaká je funkce svalu ${muscle.cz} (${muscle.lat})?`,
    options: shuffleArray([muscle.function, ...wrongFuncs]),
    correctAnswer: muscle.function,
    explanation: `Funkce: ${muscle.function}`
  };

  return [q1, q2, q3];
}
