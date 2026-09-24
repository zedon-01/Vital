import React, { useState } from 'react';
import { EXAM_TEST_QUESTIONS } from '../data/anatomyData';
import { Award, CheckCircle2, XCircle, RotateCcw, Clock, ShieldCheck, Play, AlertCircle } from 'lucide-react';
import { recordExamResult } from '../utils/storageManager';

export default function ExamMode({ userData, onRefreshData }) {
  const [isExamActive, setIsExamActive] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { [questionId]: selectedOption }
  const [examResult, setExamResult] = useState(null);
  const [startTime, setStartTime] = useState(null);

  const startExam = () => {
    setIsExamActive(true);
    setCurrentIndex(0);
    setUserAnswers({});
    setExamResult(null);
    setStartTime(Date.now());
  };

  const handleSelectOption = (questionId, option) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: option }));
  };

  const handleNext = () => {
    if (currentIndex + 1 < EXAM_TEST_QUESTIONS.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      finishExam();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const finishExam = () => {
    let score = 0;
    EXAM_TEST_QUESTIONS.forEach(q => {
      if (userAnswers[q.id] === q.answer) {
        score += 1;
      }
    });

    const timeSpentSec = Math.round((Date.now() - (startTime || Date.now())) / 1000);
    const updatedUser = recordExamResult(score, EXAM_TEST_QUESTIONS.length, timeSpentSec);
    onRefreshData();

    setExamResult({
      score,
      total: EXAM_TEST_QUESTIONS.length,
      percent: Math.round((score / EXAM_TEST_QUESTIONS.length) * 100),
      timeSpentSec
    });
    setIsExamActive(false);
  };

  const currentQ = EXAM_TEST_QUESTIONS[currentIndex];

  // Helper to generate multiple choice options for an exam question
  const getOptionsForQuestion = (q) => {
    // Generate 4 deterministic options based on index to avoid reshuffling mid-navigation
    const wrong = EXAM_TEST_QUESTIONS.filter(other => other.id !== q.id)
      .map(other => other.answer)
      .slice(0, 3);
    const options = [q.answer, ...wrong].sort((a, b) => a.localeCompare(b));
    return options;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      
      {/* Intro Header */}
      {!isExamActive && !examResult && (
        <div className="glass-panel p-8 text-center border border-slate-700/80">
          <div className="w-20 h-20 bg-gradient-to-tr from-amber-500 to-rose-500 rounded-3xl flex items-center justify-center mx-auto mb-5 text-slate-950 shadow-xl shadow-amber-500/20">
            <Award size={44} />
          </div>
          <h1 className="text-3xl font-black text-white mb-2">
            Oficiální Test Anatomie A1–A21
          </h1>
          <p className="text-slate-300 text-sm max-w-xl mx-auto mb-6 leading-relaxed">
            Vyzkoušej si simulaci ostrého testu z dodaných skript Vital Institut. Obsahuje přesně 21 zkouškových otázek pro fitness instruktory.
          </p>

          <div className="flex justify-center items-center gap-6 mb-8 text-xs font-semibold text-slate-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-emerald-400" />
              <span>21 Oficiálních otázek</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={16} className="text-cyan-400" />
              <span>Bez časového limitu</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Award size={16} className="text-amber-400" />
              <span>Minimálně 80% (17/21) pro uspění</span>
            </div>
          </div>

          <button
            onClick={startExam}
            className="btn btn-primary px-8 py-4 text-base font-bold shadow-xl shadow-emerald-500/30"
          >
            <Play size={18} className="fill-current" />
            <span>Spustit ostrý zkouškový test</span>
          </button>

          {/* Exam History */}
          {userData.examHistory && userData.examHistory.length > 0 && (
            <div className="mt-10 border-t border-slate-800 pt-6 text-left">
              <h3 className="font-bold text-slate-300 text-sm mb-3">
                Historie zkouškových pokusů:
              </h3>
              <div className="space-y-2">
                {userData.examHistory.slice(0, 5).map(hist => (
                  <div
                    key={hist.id}
                    className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-white">{hist.date}</span>
                      <span className="text-slate-500 ml-2">({Math.floor(hist.timeSpentSec / 60)}m {hist.timeSpentSec % 60}s)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-slate-300 font-semibold">{hist.score} / {hist.total} skóre</span>
                      <span className={`font-black px-2.5 py-0.5 rounded-full ${
                        hist.percent >= 80 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      }`}>
                        {hist.percent}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Active Exam Questions Screen */}
      {isExamActive && (
        <div className="glass-panel p-6 border border-slate-700/80">
          {/* Header & Progress Bar */}
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="text-sm font-bold text-slate-300">
              Otázka {currentIndex + 1} z {EXAM_TEST_QUESTIONS.length}
            </div>
            <div className="text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
              Kód otázky: {currentQ.id}
            </div>
          </div>

          <div className="duo-progress-container mb-6">
            <div
              className="duo-progress-fill"
              style={{ width: `${((currentIndex + 1) / EXAM_TEST_QUESTIONS.length) * 100}%` }}
            ></div>
          </div>

          {/* Question Text */}
          <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 mb-6">
            <h2 className="text-lg md:text-xl font-bold text-white">
              {currentQ.question}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {getOptionsForQuestion(currentQ).map((opt, idx) => {
              const isSelected = userAnswers[currentQ.id] === opt;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(currentQ.id, opt)}
                  className={`w-full p-4 text-left rounded-xl border text-sm font-medium transition-all flex items-start gap-3 ${
                    isSelected
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold shadow-md'
                      : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700'
                  }`}
                >
                  <span className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="leading-relaxed">{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between border-t border-slate-800 pt-4">
            <button
              disabled={currentIndex === 0}
              onClick={handlePrev}
              className="btn btn-secondary text-xs disabled:opacity-40"
            >
              Předchozí
            </button>

            {currentIndex + 1 < EXAM_TEST_QUESTIONS.length ? (
              <button
                disabled={!userAnswers[currentQ.id]}
                onClick={handleNext}
                className="btn btn-primary text-xs py-2.5 px-6 shadow-md disabled:opacity-40"
              >
                Další otázka ➔
              </button>
            ) : (
              <button
                disabled={!userAnswers[currentQ.id]}
                onClick={finishExam}
                className="btn btn-primary bg-gradient-to-r from-amber-500 to-emerald-500 text-slate-950 font-bold text-xs py-2.5 px-6 shadow-md"
              >
                Ukončit a vyhodnotit test
              </button>
            )}
          </div>
        </div>
      )}

      {/* Exam Results Summary Screen */}
      {examResult && !isExamActive && (
        <div className="glass-panel p-8 border border-slate-700/80">
          <div className="text-center mb-8">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-950 font-black text-3xl shadow-xl ${
              examResult.percent >= 80 ? 'bg-emerald-500 shadow-emerald-500/30' : 'bg-rose-500 shadow-rose-500/30'
            }`}>
              {examResult.percent >= 80 ? '✓' : '✕'}
            </div>

            <h2 className="text-2xl font-extrabold text-white mb-1">
              {examResult.percent >= 80 ? 'USPĚL JSI V TESTU!' : 'TEST NEBYL SPLNĚN'}
            </h2>
            <p className="text-sm text-slate-400">
              {examResult.percent >= 80
                ? 'Skvělé! Zvládl jsi oficiální zkouškové otazky na jedničku.'
                : 'Pro úspěšné složení testu je potřeba získat alespoň 80% (17 ze 21 otázek).'}
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-4 bg-slate-950/80 p-5 rounded-2xl border border-slate-800 mb-8 text-center">
            <div>
              <div className="text-2xl font-black text-emerald-400">{examResult.score} / {examResult.total}</div>
              <div className="text-xs text-slate-400 font-semibold">Správné odpovědi</div>
            </div>
            <div className="border-x border-slate-800">
              <div className="text-2xl font-black text-cyan-400">{examResult.percent}%</div>
              <div className="text-xs text-slate-400 font-semibold">Úspěšnost</div>
            </div>
            <div>
              <div className="text-2xl font-black text-amber-400">
                {Math.floor(examResult.timeSpentSec / 60)}m {examResult.timeSpentSec % 60}s
              </div>
              <div className="text-xs text-slate-400 font-semibold">Čas testu</div>
            </div>
          </div>

          {/* Detailed Question Review */}
          <h3 className="font-bold text-white text-base mb-4 flex items-center gap-2">
            <AlertCircle size={18} className="text-emerald-400" />
            <span>Detailní rozbor všech 21 otázek z testu:</span>
          </h3>

          <div className="space-y-4 mb-8">
            {EXAM_TEST_QUESTIONS.map(q => {
              const userAns = userAnswers[q.id];
              const isCorrect = userAns === q.answer;

              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-xl border text-xs leading-relaxed ${
                    isCorrect
                      ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                      : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="font-extrabold text-white text-sm">
                      {q.id}: {q.question}
                    </span>
                    <span className={`font-bold px-2 py-0.5 rounded-full text-[10px] uppercase ${
                      isCorrect ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                    }`}>
                      {isCorrect ? 'Správně' : 'Chyba'}
                    </span>
                  </div>

                  <div className="mt-2 space-y-1">
                    <div>
                      <span className="font-bold text-slate-400">Tvoje odpověď:</span>{' '}
                      <span className={isCorrect ? 'text-emerald-300 font-semibold' : 'text-rose-300 line-through'}>
                        {userAns || 'Nezodpovězeno'}
                      </span>
                    </div>
                    {!isCorrect && (
                      <div>
                        <span className="font-bold text-emerald-400">Správná odpověď z PDF:</span>{' '}
                        <span className="text-emerald-300 font-bold">{q.answer}</span>
                      </div>
                    )}
                    <div className="text-slate-400 italic text-[11px] pt-1">
                      Upřesnění: {q.detail}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Footer */}
          <div className="flex justify-center gap-4">
            <button
              onClick={startExam}
              className="btn btn-primary"
            >
              <RotateCcw size={16} />
              <span>Opakovat zkouškový test</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
