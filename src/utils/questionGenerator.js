import { MUSCLES, TERMINOLOGY, BONES_AND_LANDMARKS, FUNCTIONAL_TERMS, HSS_COMPONENTS, TONIC_PHASIC_DATA, EXAM_TEST_QUESTIONS } from '../data/anatomyData';

// Utility to shuffle array
export function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Generate session questions for a specific module or review mode
export function generateModuleQuestions(moduleId, count = 7) {
  let questions = [];

  if (moduleId === 'mod-1') {
    // Terminology & Bones & Basic concepts
    questions = generateModule1Questions();
  } else if (moduleId === 'mod-13') {
    // HSS
    questions = generateHSSQuestions();
  } else if (moduleId === 'mod-14') {
    // Tonic / Phasic
    questions = generateTonicPhasicQuestions();
  } else if (moduleId === 'mod-15') {
    // Exam mode
    questions = generateExamQuestions();
  } else {
    // Muscle-based modules
    const moduleMuscles = MUSCLES.filter(m => m.module === moduleId);
    const otherMuscles = MUSCLES.filter(m => m.module !== moduleId);
    
    moduleMuscles.forEach(muscle => {
      // 1. Origo question
      const wrongOrigos = shuffleArray(
        [...otherMuscles, ...moduleMuscles.filter(m => m.id !== muscle.id)]
      ).slice(0, 3).map(m => m.origo);

      questions.push({
        id: `q-origo-${muscle.id}`,
        type: 'multiple-choice',
        category: muscle.system,
        title: `Kde začíná (origo) sval:`,
        highlightText: `${muscle.cz} (${muscle.lat})`,
        options: shuffleArray([muscle.origo, ...wrongOrigos]),
        correctAnswer: muscle.origo,
        explanation: `Začátek (origo) ${muscle.lat}: ${muscle.origo}`,
        examNotes: muscle.examNotes,
        unusualFormulation: muscle.unusualFormulation,
        muscleId: muscle.id
      });

      // 2. Insertio question
      const wrongInsertios = shuffleArray(
        [...otherMuscles, ...moduleMuscles.filter(m => m.id !== muscle.id)]
      ).slice(0, 3).map(m => m.insertio);

      questions.push({
        id: `q-ins-${muscle.id}`,
        type: 'multiple-choice',
        category: muscle.system,
        title: `Kam se upíná (insertio) sval:`,
        highlightText: `${muscle.cz} (${muscle.lat})`,
        options: shuffleArray([muscle.insertio, ...wrongInsertios]),
        correctAnswer: muscle.insertio,
        explanation: `Úpon (insertio) ${muscle.lat}: ${muscle.insertio}`,
        examNotes: muscle.examNotes,
        unusualFormulation: muscle.unusualFormulation,
        muscleId: muscle.id
      });

      // 3. Function question
      const wrongFuncs = shuffleArray(
        [...otherMuscles, ...moduleMuscles.filter(m => m.id !== muscle.id)]
      ).slice(0, 3).map(m => m.function);

      questions.push({
        id: `q-func-${muscle.id}`,
        type: 'multiple-choice',
        category: muscle.system,
        title: `Jaká je funkce svalu:`,
        highlightText: `${muscle.cz} (${muscle.lat})`,
        options: shuffleArray([muscle.function, ...wrongFuncs]),
        correctAnswer: muscle.function,
        explanation: `Funkce ${muscle.lat}: ${muscle.function}`,
        examNotes: muscle.examNotes,
        unusualFormulation: muscle.unusualFormulation,
        muscleId: muscle.id
      });

      // 4. Latin Name matching / MC
      const wrongLatins = shuffleArray(
        [...otherMuscles, ...moduleMuscles.filter(m => m.id !== muscle.id)]
      ).slice(0, 3).map(m => m.lat);

      questions.push({
        id: `q-lat-${muscle.id}`,
        type: 'multiple-choice',
        category: muscle.system,
        title: `Jaký je latinský název pro český sval:`,
        highlightText: `${muscle.cz}`,
        options: shuffleArray([muscle.lat, ...wrongLatins]),
        correctAnswer: muscle.lat,
        explanation: `${muscle.cz} = ${muscle.lat}`,
        examNotes: muscle.examNotes,
        unusualFormulation: muscle.unusualFormulation,
        muscleId: muscle.id
      });

      // 5. Active recall card
      questions.push({
        id: `q-recall-${muscle.id}`,
        type: 'active-recall',
        category: muscle.system,
        title: `Aktivní vybavení svalu:`,
        highlightText: `${muscle.cz} (${muscle.lat})`,
        origo: muscle.origo,
        insertio: muscle.insertio,
        function: muscle.function,
        examNotes: muscle.examNotes,
        unusualFormulation: muscle.unusualFormulation,
        muscleId: muscle.id
      });

      // 6. True/False question if exam note or unusual formulation exists
      if (muscle.examNotes) {
        questions.push({
          id: `q-tf-${muscle.id}`,
          type: 'true-false',
          category: muscle.system,
          title: `Posouzení zkouškového faktu:`,
          statement: `${muscle.lat}: ${muscle.examNotes.replace('KE ZKOUŠCE: ', '')}`,
          isTrue: true,
          explanation: muscle.examNotes,
          muscleId: muscle.id
        });
      }
    });

    // Add Czech <-> Latin matching question for module
    if (moduleMuscles.length >= 3) {
      const matchPairs = moduleMuscles.slice(0, 4).map(m => ({
        id: m.id,
        left: m.cz,
        right: m.lat
      }));

      questions.push({
        id: `q-match-${moduleId}`,
        type: 'matching',
        category: "Párování názvů",
        title: "Spoj správně české a latinské názvy svalů:",
        pairs: matchPairs,
        explanation: "Všechny dvojice byly úspěšně spárovány podle skript."
      });
    }
  }

  return shuffleArray(questions).slice(0, count);
}

// Questions for Module 1 (Terminology & Bones)
function generateModule1Questions() {
  const questions = [];

  TERMINOLOGY.forEach(t => {
    const wrong = shuffleArray(TERMINOLOGY.filter(item => item.term !== t.term)).slice(0, 3).map(item => item.meaning);
    questions.push({
      id: `q-term-${t.term}`,
      type: 'multiple-choice',
      category: 'Základy terminologie',
      title: `Co znamená latinský pojem/zkratka:`,
      highlightText: t.term,
      options: shuffleArray([t.meaning, ...wrong]),
      correctAnswer: t.meaning,
      explanation: `${t.term} = ${t.meaning}`
    });
  });

  BONES_AND_LANDMARKS.forEach(b => {
    const wrong = shuffleArray(BONES_AND_LANDMARKS.filter(item => item.lat !== b.lat)).slice(0, 3).map(item => item.cz);
    questions.push({
      id: `q-bone-${b.lat}`,
      type: 'multiple-choice',
      category: 'Základní kosti',
      title: `Jaký je český název pro kost/bod:`,
      highlightText: b.lat,
      options: shuffleArray([b.cz, ...wrong]),
      correctAnswer: b.cz,
      explanation: `${b.lat} = ${b.cz}`
    });
  });

  FUNCTIONAL_TERMS.forEach(ft => {
    const wrong = shuffleArray(FUNCTIONAL_TERMS.filter(item => item.term !== ft.term)).slice(0, 3).map(item => item.definition);
    questions.push({
      id: `q-functerm-${ft.term}`,
      type: 'multiple-choice',
      category: 'Funkční anatomie',
      title: `Co znamená pojem:`,
      highlightText: ft.term,
      options: shuffleArray([ft.definition, ...wrong]),
      correctAnswer: ft.definition,
      explanation: `${ft.term}: ${ft.definition}. Příp.: ${ft.example}`
    });
  });

  return shuffleArray(questions);
}

// Questions for Module 13 (HSS)
function generateHSSQuestions() {
  return [
    {
      id: 'q-hss-all',
      type: 'multiple-choice',
      category: 'HSS',
      title: 'Které svaly patří mezi 4 složky Hlubokého stabilizačního systému (HSS)?',
      highlightText: 'HSS = 4 SLOŽKY',
      options: shuffleArray([
        'Bránice, M. transversus abdominis, Mm. multifidi, Svaly pánevního dna',
        'M. rectus abdominis, M. erector spinae, M. gluteus maximus, M. trapezius',
        'M. iliopsoas, M. quadratus lumborum, Mm. scaleni, M. pectoralis major',
        'M. latissimus dorsi, Mm. rotatores, M. soleus, M. biceps brachii'
      ]),
      correctAnswer: 'Bránice, M. transversus abdominis, Mm. multifidi, Svaly pánevního dna',
      explanation: 'KE ZKOUŠCE: Složení HSS tvoří přesně 4 složky: 1) Bránice, 2) M. transversus abdominis, 3) Mm. multifidi, 4) Svaly pánevního dna.'
    },
    ...HSS_COMPONENTS.map(c => ({
      id: `q-hss-${c.id}`,
      type: 'multiple-choice',
      category: 'HSS',
      title: `Jaká je funkce složky HSS:`,
      highlightText: `${c.name} (${c.lat})`,
      options: shuffleArray([
        c.role,
        'Flexe v kolenním kloubu a extenze v kyčli.',
        'Extenze v loketním kloubu a addukce ramene.',
        'Abdukce ramene do 90 stupňů.'
      ]),
      correctAnswer: c.role,
      explanation: `${c.name} (${c.lat}): ${c.role}`
    }))
  ];
}

// Questions for Module 14 (Tonic vs Phasic)
function generateTonicPhasicQuestions() {
  const questions = [
    {
      id: 'q-tp-def-tonic',
      type: 'multiple-choice',
      category: 'Svalový tonus',
      title: 'Jaké vlastnosti mají tonické svaly?',
      highlightText: 'Tonické (posturální) svaly',
      options: shuffleArray([
        'Převaha oxidativních vláken; déle pracují; tendence ke zkrácení.',
        'Převaha rychlých vláken; rychleji se unaví; tendence k oslabení.',
        'Žádná oxidativní vlákna; okamžitě se unaví.',
        'Pouze fázický pohyb bez posturální funkce.'
      ]),
      correctAnswer: 'Převaha oxidativních vláken; déle pracují; tendence ke zkrácení.',
      explanation: TONIC_PHASIC_DATA.tonic.properties
    },
    {
      id: 'q-tp-def-phasic',
      type: 'multiple-choice',
      category: 'Svalový tonus',
      title: 'Jaké vlastnosti mají fázické svaly?',
      highlightText: 'Fázické (hybné) svaly',
      options: shuffleArray([
        'Převaha rychlých vláken; rychleji se unaví; tendence k oslabení.',
        'Převaha oxidativních vláken; déle pracují; tendence ke zkrácení.',
        'Vždy hypertonické a zkrácené.',
        'Plní výhradně statickou posturální roli.'
      ]),
      correctAnswer: 'Převaha rychlých vláken; rychleji se unaví; tendence k oslabení.',
      explanation: TONIC_PHASIC_DATA.phasic.properties
    },
    {
      id: 'q-tp-tf-dysbalance',
      type: 'true-false',
      category: 'Svalový tonus',
      title: 'Svalové nerovnováhy:',
      statement: 'Špatná distribuce svalového tonu vede ke svalové nerovnováze (typické příklady skript: horní a dolní zkřížený syndrom).',
      isTrue: true,
      explanation: TONIC_PHASIC_DATA.dysbalanceNote
    }
  ];

  // Specific muscle classification questions
  MUSCLES.filter(m => m.tonicPhasic && m.tonicPhasic !== 'both').slice(0, 6).forEach(m => {
    const isTonic = m.tonicPhasic === 'tonic';
    questions.push({
      id: `q-tp-${m.id}`,
      type: 'multiple-choice',
      category: 'Svalový tonus',
      title: `Do které skupiny patří sval:`,
      highlightText: `${m.cz} (${m.lat})`,
      options: ['Tonické (posturální) - tendence ke zkrácení', 'Fázické (hybné) - tendence k oslabení'],
      correctAnswer: isTonic ? 'Tonické (posturální) - tendence ke zkrácení' : 'Fázické (hybné) - tendence k oslabení',
      explanation: `${m.cz} (${m.lat}) je podle skript zařazen mezi svaly ${isTonic ? 'tonické (posturální)' : 'fázické (hybné)'}.`
    });
  });

  return shuffleArray(questions);
}

// Generate Questions for Exam Mode A1-A21
export function generateExamQuestions() {
  return EXAM_TEST_QUESTIONS.map(q => {
    const wrongAnswers = shuffleArray(
      EXAM_TEST_QUESTIONS.filter(other => other.id !== q.id).map(other => other.answer)
    ).slice(0, 3);

    return {
      id: `q-exam-${q.id}`,
      type: 'multiple-choice',
      category: `Test Anatomie ${q.id}`,
      title: `Otázka ${q.id} z Testu Anatomie:`,
      highlightText: q.question,
      options: shuffleArray([q.answer, ...wrongAnswers]),
      correctAnswer: q.answer,
      explanation: `Správná odpověď z Testu Anatomie (${q.id}): ${q.answer} (${q.detail})`,
      examId: q.id
    };
  });
}

// Generate weak topic review session
export function generateWeakTopicsSession(weakIds = []) {
  if (!weakIds || weakIds.length === 0) {
    // Default fallback to random questions across all modules
    return shuffleArray([
      ...generateModuleQuestions('mod-2', 2),
      ...generateModuleQuestions('mod-4', 2),
      ...generateModuleQuestions('mod-5', 2),
      ...generateModuleQuestions('mod-10', 2)
    ]);
  }

  const questions = [];
  weakIds.forEach(id => {
    const muscle = MUSCLES.find(m => m.id === id);
    if (muscle) {
      questions.push({
        id: `q-weak-origo-${muscle.id}`,
        type: 'multiple-choice',
        category: 'Opakování slabých míst',
        title: `[Slabé místo] Začátek (origo) svalu:`,
        highlightText: `${muscle.cz} (${muscle.lat})`,
        options: shuffleArray([
          muscle.origo,
          ...shuffleArray(MUSCLES.filter(m => m.id !== muscle.id)).slice(0, 3).map(m => m.origo)
        ]),
        correctAnswer: muscle.origo,
        explanation: `Začátek ${muscle.lat}: ${muscle.origo}`,
        muscleId: muscle.id
      });
      questions.push({
        id: `q-weak-ins-${muscle.id}`,
        type: 'multiple-choice',
        category: 'Opakování slabých míst',
        title: `[Slabé místo] Úpon (insertio) svalu:`,
        highlightText: `${muscle.cz} (${muscle.lat})`,
        options: shuffleArray([
          muscle.insertio,
          ...shuffleArray(MUSCLES.filter(m => m.id !== muscle.id)).slice(0, 3).map(m => m.insertio)
        ]),
        correctAnswer: muscle.insertio,
        explanation: `Úpon ${muscle.lat}: ${muscle.insertio}`,
        muscleId: muscle.id
      });
    }
  });

  return shuffleArray(questions).slice(0, 10);
}
