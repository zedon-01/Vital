import React, { useState } from 'react';
import { GraduationCap, ArrowRight, CheckCircle2, HelpCircle, Sparkles, BookOpen, Compass, Shield, Dumbbell, Zap, Brain, Layers } from 'lucide-react';
import { recordQuestionResult } from '../utils/storageManager';

export default function BeginnerGuide({ onRefreshData }) {
  const [activeLesson, setActiveLesson] = useState(0);
  const [completedQuiz, setCompletedQuiz] = useState({});

  const beginnerLessons = [
    {
      id: 'b1',
      title: '1. Jak funguje sval? (Příběh gumy)',
      icon: Dumbbell,
      concept: 'Princip přiblížení bodů',
      cards: [
        {
          title: '📌 Začátek svalu (Origo)',
          desc: 'Pevně ukotvené místo na kosti. Nachází se bližše k trupu a při pohybu drží pevně na místě.'
        },
        {
          title: '📍 Úpon svalu (Insertio)',
          desc: 'Pohyblivé místo na kosti. Nachází se dále na končetině a je to bod, který sval přitahuje.'
        },
        {
          title: '⚡ Zázrak kontrakce (Pohyb)',
          desc: 'Představ si sval jako pružnou gumu. Když se sval stáhne (kontrahuje), přitáhne úponový bod k začátku.'
        }
      ],
      analogy: '🏋️‍♂️ Fitness příklad: Při bicepsovém zdvihu sval m. biceps brachii přitáhne vřetenní kost (úpon) nahoru k lopatce (začátek). Tím se ohne loket.',
      quiz: {
        question: 'Co se stane se svalem při kontrakci (pohybu)?',
        options: [
          'Sval se zkrátí a přitáhne úponový bod (insertio) k začátku (origo)',
          'Sval se prodlouží a odtlačí kosti od sebe',
          'Sval se otočí kolem své osy bez pohybu kosti'
        ],
        correctIndex: 0,
        explanation: 'Přesně tak! Kontrakce znamená zkrácení svalu a přiblížení úponu k začátku.'
      }
    },
    {
      id: 'b2',
      title: '2. Mapa těla – Latinské směry bez šprtání',
      icon: Compass,
      concept: 'Mnemotechnické pomůcky pro směry',
      cards: [
        {
          title: 'Proximálně vs. Distálně',
          desc: 'Proximálně = blíže k trupu (Proximus = blízko). Distálně = dále od trupu (Distancia = vzdálenost).'
        },
        {
          title: 'Mediálně vs. Laterálně',
          desc: 'Mediálně = směrem ke střední čáře/středu (Medium = střed). Laterálně = do stran (Postranně).'
        },
        {
          title: 'Kraniálně vs. Kaudálně',
          desc: 'Kraniálně = nahoru k hlavě (Cranium = lebka). Kaudálně = dolů k nohám (Kaudální = dolní).'
        },
        {
          title: 'Ventrálně vs. Dorzálně',
          desc: 'Ventrálně = dopředu (Venter = břicho). Dorzálně = dozadu (Dorsum = záda).'
        }
      ],
      analogy: '💡 Mnemotechnický trik: "Distálně je to daleko k prstům, Mediálně je to uprostřed!"',
      quiz: {
        question: 'Kde se nachází zápěstí vůči rameni?',
        options: [
          'Distálně (dále od trupu)',
          'Proximálně (blíže k trupu)',
          'Kraniálně (směrem k hlavě)'
        ],
        correctIndex: 0,
        explanation: 'Správně! Zápěstí je dále od trupu než rameno, takže je uloženo distálně.'
      }
    },
    {
      id: 'b3',
      title: '3. 6 Základních pohybů ve fitness',
      icon: Zap,
      concept: 'Pohyby v kloubech',
      cards: [
        {
          title: 'Flexe (Ohnutí)',
          desc: 'Zmenšení úhlu v kloubu. Příklady: bicepsový zdvih, předklon, pokrčení kolene.'
        },
        {
          title: 'Extenze (Natažení)',
          desc: 'Zvětšení úhlu / napřímení. Příklady: propnutí ruky v lokti, vzpřímení trupu.'
        },
        {
          title: 'Abdukce vs. Addukce',
          desc: 'Abdukce = odpažení/unopažení (ruka jde od těla). Addukce = připažení (ruka jde k tělu).'
        },
        {
          title: 'Pronace vs. Supinace',
          desc: 'Pronace = dlaň směřuje dolů (palec dovnitř). Supinace = dlaň směřuje nahoru.'
        }
      ],
      analogy: '🥣 Mnemotechnický trik pro supinaci: "Při supinaci nesu polévku na dlani!"',
      quiz: {
        question: 'Jaký pohyb děláš, když zvedáš ruku do rozpažení od těla?',
        options: [
          'Abdukce (odtažení od střední roviny)',
          'Addukce (přitažení k tělu)',
          'Flexe (nutí v lokti)'
        ],
        correctIndex: 0,
        explanation: 'Přesně tak! Abdukce znamená odtažení končetiny od těla.'
      }
    },
    {
      id: 'b4',
      title: '4. Svalový tým – 4 Role svalů při cviku',
      icon: Shield,
      concept: 'Svalové řetězce a týmová práce',
      cards: [
        {
          title: '🥇 Agonista (Hlavní motorkář)',
          desc: 'Hlavní vykonávající sval daného pohybu. Při flexi v lokti je to m. biceps brachii.'
        },
        {
          title: '🛑 Antagonista (Brzdič / Protihráč)',
          desc: 'Sval na opačné straně. Musí se uvolnit, aby se pohyb mohl stát (při flexi lokte je to triceps).'
        },
        {
          title: '🤝 Synergista (Pomocník)',
          desc: 'Pomocný sval stejného pohybu. Pomáhá agonistovi vytvořit sílu (např. m. brachialis).'
        },
        {
          title: '⚖️ Stabilizátor (Udržovač rovnováhy)',
          desc: 'Ruší nevhodný směr pohybu a zpevňuje kloub či trup (např. HSS a záda při bicepsovém zdvihu).'
        }
      ],
      analogy: '⚽ Týmová analogie: Agonista střílí gól, Synergista přihrává, Stabilizátor drží obranu a Antagonista je soupeř na druhé straně.',
      quiz: {
        question: 'Jaká je úloha Antagonisty při pohybu?',
        options: [
          'Vykonává opačný pohyb než agonista (musí se uvolnit)',
          'Pomáhá hlavním svalu stejným směrem',
          'Vždy zvedá největší váhu'
        ],
        correctIndex: 0,
        explanation: 'Správně! Antagonista dělá opačný pohyb a udržuje plynulost pohybu.'
      }
    },
    {
      id: 'b5',
      title: '5. První svaly pro nováčky – Náhled názvů svalů',
      icon: Layers,
      concept: 'Představení klíčových svalů těla',
      cards: [
        {
          title: '💪 Horní končetina & Rameno',
          desc: 'M. biceps brachii (dvojhlavý pažní), M. triceps brachii (trojhlavý pažní), M. deltoideus (deltový sval), M. pectoralis major (velký prsní).'
        },
        {
          title: '🦵 Dolní končetina & Kyčel',
          desc: 'M. quadriceps femoris (čtyřhlavý stehenní), M. gluteus maximus (velký hýžďový), M. iliopsoas (bedrokyčlostehenní), Hamstringy.'
        },
        {
          title: '🛡️ Trup & Hluboká stabilizace',
          desc: 'M. rectus abdominis (přímý břišní), M. transversus abdominis (příčný břišní - HSS), Diaphragma (bránice), M. erector spinae (vzpřimovače).'
        }
      ],
      analogy: '🧠 Než se pustíš do modulů, zapamatuj si: Český název ti řekne kde sval je nebo jak vypadá (např. dvojhlavý), Latinský název tě naučí zkouškový kód!',
      quiz: {
        question: 'Jaký je latinský název pro velký sval hýžďový?',
        options: [
          'M. gluteus maximus',
          'M. biceps femoris',
          'M. rectus abdominis'
        ],
        correctIndex: 0,
        explanation: 'Správně! M. gluteus maximus = velký sval hýžďový.'
      }
    },
    {
      id: 'b6',
      title: '6. Zlatá formule pro složení zkoušky',
      icon: GraduationCap,
      concept: 'Oficiální studijní metodika Vital Institut',
      cards: [
        {
          title: '1. ZAČÁTEK (Origo)',
          desc: 'Vždy si řekni: Kde sval začíná? (na kterém obratli, žebru či kosti).'
        },
        {
          title: '2. ÚPON (Insertio)',
          desc: 'Vždy si řekni: Kam se sval upíná? (na jaký hrbolek či výběžek).'
        },
        {
          title: '3. FUNKCE (Pohyb)',
          desc: 'Vždy si řekni: Jaký pohyb vznikne přiblížením těchto 2 bodů?'
        }
      ],
      analogy: '🎯 Strana 17 ze skript Vital Institut: "Jakmile umíš tyto 3 věci bez nápovědy a zvládneš Test A1–A21, máš zkoušku z anatomie 100% naučenou!"',
      quiz: {
        question: 'Které 3 věci si máš říci nahlas u každého svalu?',
        options: [
          'Začátek ➔ Úpon ➔ Funkce',
          'Délka ➔ Váha ➔ Objem',
          'Název ➔ Barva ➔ Tvar'
        ],
        correctIndex: 0,
        explanation: 'Přesně tak! Začátek ➔ Úpon ➔ Funkce!'
      }
    }
  ];

  const current = beginnerLessons[activeLesson];

  const handleQuizAnswer = (selectedIndex) => {
    const isCorrect = selectedIndex === current.quiz.correctIndex;
    setCompletedQuiz(prev => ({ ...prev, [current.id]: { isCorrect, selectedIndex } }));
    if (isCorrect) {
      recordQuestionResult(null, true, 25);
      onRefreshData();
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      
      {/* Header */}
      <div className="glass-panel p-6 mb-8 border border-slate-700/80">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-xs font-bold mb-2">
              <Sparkles size={14} />
              <span>Interaktivní Kurz pro Nováčky</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
              <GraduationCap size={28} className="text-cyan-400" />
              <span>Škola Anatomie & Názvy Svalů pro Nováčky</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Nauč se principy fungování svalů, latinské směry, první názvy svalů a zkouškovou analytiku krok za krokem.
            </p>
          </div>
        </div>
      </div>

      {/* Lesson Navigation Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-2 mb-6">
        {beginnerLessons.map((l, idx) => {
          const isActive = idx === activeLesson;
          const isDone = completedQuiz[l.id]?.isCorrect;
          return (
            <button
              key={l.id}
              onClick={() => setActiveLesson(idx)}
              className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                isActive
                  ? 'bg-slate-800 border-cyan-500 text-cyan-300 font-bold shadow-md'
                  : isDone
                  ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="text-[11px] font-bold uppercase tracking-wider mb-1 opacity-70">
                Lekce {idx + 1} {isDone && '✓'}
              </div>
              <div className="text-xs font-bold line-clamp-1">
                {l.concept}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div className="glass-panel p-6 border border-slate-700/80 mb-8">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
          <div>
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
              Modul pro začátečníky {activeLesson + 1} ze 6
            </span>
            <h2 className="text-xl font-extrabold text-white mt-0.5">{current.title}</h2>
          </div>

          <div className="flex gap-2">
            <button
              disabled={activeLesson === 0}
              onClick={() => setActiveLesson(prev => prev - 1)}
              className="btn btn-secondary text-xs py-2 px-3 disabled:opacity-40"
            >
              Předchozí
            </button>
            <button
              disabled={activeLesson + 1 === beginnerLessons.length}
              onClick={() => setActiveLesson(prev => prev + 1)}
              className="btn btn-primary text-xs py-2 px-3 disabled:opacity-40"
            >
              <span>Další lekce</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Visual Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {current.cards.map((card, cIdx) => (
            <div key={cIdx} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <h3 className="font-extrabold text-cyan-400 text-sm mb-2">{card.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Fitness Analogy Banner */}
        <div className="p-4 bg-gradient-to-r from-cyan-950/60 via-slate-900 to-cyan-950/60 border border-cyan-500/30 rounded-xl text-xs text-cyan-200 font-semibold mb-8 flex items-start gap-3">
          <Brain size={20} className="text-cyan-400 shrink-0 mt-0.5" />
          <div>{current.analogy}</div>
        </div>

        {/* Formule Banner for Lesson 6 */}
        {activeLesson === 5 && (
          <div className="p-6 bg-slate-950 rounded-2xl border border-emerald-500/40 text-center mb-8">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block mb-2">Vzorec Učení Svalů</span>
            <div className="flex items-center justify-center gap-3 text-base md:text-lg font-black text-white">
              <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/40 rounded-lg text-emerald-400">1. ZAČÁTEK (Origo)</span>
              <ArrowRight size={18} className="text-slate-500" />
              <span className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/40 rounded-lg text-cyan-400">2. ÚPON (Insertio)</span>
              <ArrowRight size={18} className="text-slate-500" />
              <span className="px-3 py-1 bg-amber-500/20 border border-amber-500/40 rounded-lg text-amber-400">3. FUNKCE</span>
            </div>
          </div>
        )}

        {/* Micro-Quiz for Lesson */}
        <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-3">
            <HelpCircle size={16} />
            <span>Rychlé praktické overení znalostí (+25 XP)</span>
          </div>

          <h3 className="font-bold text-white text-sm mb-4">{current.quiz.question}</h3>

          <div className="space-y-2 mb-4">
            {current.quiz.options.map((opt, idx) => {
              const quizResult = completedQuiz[current.id];
              const isSelected = quizResult?.selectedIndex === idx;
              let style = "bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700";

              if (quizResult) {
                if (idx === current.quiz.correctIndex) {
                  style = "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold";
                } else if (isSelected) {
                  style = "bg-rose-500/20 border-rose-500 text-rose-300";
                }
              }

              return (
                <button
                  key={idx}
                  disabled={Boolean(quizResult)}
                  onClick={() => handleQuizAnswer(idx)}
                  className={`w-full p-3.5 text-left rounded-xl border text-xs font-medium transition-all ${style}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {completedQuiz[current.id] && (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-semibold text-xs rounded-xl flex items-center gap-2">
              <CheckCircle2 size={16} className="shrink-0" />
              <span>{current.quiz.explanation}</span>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
