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

// Normalize text for flexible fuzzy checking (ignores accents, case, m./mm. prefixes)
export function normalizeText(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // strip diacritics
    .replace(/^m\.\s*/, '')
    .replace(/^mm\.\s*/, '')
    .replace(/[^a-z0-9\s]/g, '')
    .trim();
}

// Check if user answer matches target text loosely or closely
export function isFlexibleMatch(userAnswer, targetAnswer) {
  const normUser = normalizeText(userAnswer);
  const normTarget = normalizeText(targetAnswer);

  if (!normUser || !normTarget) return false;
  if (normUser === normTarget) return true;

  // Check substring matches for key anatomical terms
  if (normTarget.length > 3 && (normUser.includes(normTarget) || normTarget.includes(normUser))) {
    return true;
  }

  return false;
}

// Generate session questions for a specific module or review mode
export function generateModuleQuestions(moduleId, count = 8) {
  let questions = [];

  if (moduleId === 'mod-1') {
    questions = generateModule1Questions();
  } else if (moduleId === 'mod-13') {
    questions = generateHSSQuestions();
  } else if (moduleId === 'mod-14') {
    questions = generateTonicPhasicQuestions();
  } else if (moduleId === 'mod-15') {
    questions = generateExamQuestions();
  } else {
    const moduleMuscles = MUSCLES.filter(m => m.module === moduleId);
    const otherMuscles = MUSCLES.filter(m => m.module !== moduleId);
    
    moduleMuscles.forEach(muscle => {
      // 1. Type-in Question (Manual Typing Latin name)
      questions.push({
        id: `q-typein-lat-${muscle.id}`,
        type: 'type-in',
        category: muscle.system,
        title: `Napiš (vypiš) přesný latinský název pro sval:`,
        highlightText: `${muscle.cz}`,
        placeholder: 'Napiš latinský název (např. Biceps brachii)...',
        correctAnswer: muscle.lat,
        explanation: `${muscle.cz} = ${muscle.lat}`,
        examNotes: muscle.examNotes,
        unusualFormulation: muscle.unusualFormulation,
        muscleId: muscle.id
      });

      // 2. Type-in Question (Manual Typing Czech name)
      questions.push({
        id: `q-typein-cz-${muscle.id}`,
        type: 'type-in',
        category: muscle.system,
        title: `Napiš (vypiš) český název pro latinský sval:`,
        highlightText: `${muscle.lat}`,
        placeholder: 'Napiš český název (např. dvojhlavý sval pažní)...',
        correctAnswer: muscle.cz,
        explanation: `${muscle.lat} = ${muscle.cz}`,
        examNotes: muscle.examNotes,
        unusualFormulation: muscle.unusualFormulation,
        muscleId: muscle.id
      });

      // 3. Origo question
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

      // 4. Insertio question
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

      // 5. Function question
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

      // 6. Active recall card
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
    // Type-in term question
    questions.push({
      id: `q-typein-term-${t.term}`,
      type: 'type-in',
      category: 'Základy terminologie',
      title: `Vypiš ručně význám pojmu/zkratky:`,
      highlightText: t.term,
      placeholder: 'Vypiš význam zkratky...',
      correctAnswer: t.meaning,
      explanation: `${t.term} = ${t.meaning}`
    });

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
    // Type-in bone name
    questions.push({
      id: `q-typein-bone-${b.lat}`,
      type: 'type-in',
      category: 'Základní kosti',
      title: `Napiš český název pro latinskou kost:`,
      highlightText: b.lat,
      placeholder: 'Napiš český název (např. klíční kost)...',
      correctAnswer: b.cz,
      explanation: `${b.lat} = ${b.cz}`
    });

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

  return shuffleArray(questions);
}

// Questions for Module 13 (HSS)
function generateHSSQuestions() {
  return [
    {
      id: 'q-hss-typein',
      type: 'type-in',
      category: 'HSS',
      title: 'Vypiš alespoň 2 ze 4 složek HSS (bránice, transversus, multifidi, pánevní dno):',
      highlightText: 'Složky HSS',
      placeholder: 'Vypiš složky HSS...',
      correctAnswer: 'Bránice, M. transversus abdominis, Mm. multifidi, Svaly pánevního dna',
      explanation: 'KE ZKOUŠCE: 1) Bránice, 2) M. transversus abdominis, 3) Mm. multifidi, 4) Svaly pánevního dna.'
    },
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
    }
  ];
}

// Questions for Module 14 (Tonic vs Phasic)
function generateTonicPhasicQuestions() {
  return shuffleArray([
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
    }
  ]);
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
    return shuffleArray([
      ...generateModuleQuestions('mod-2', 3),
      ...generateModuleQuestions('mod-4', 3),
      ...generateModuleQuestions('mod-5', 3)
    ]);
  }

  const questions = [];
  weakIds.forEach(id => {
    const muscle = MUSCLES.find(m => m.id === id);
    if (muscle) {
      // Type-in manual recall for weak muscle
      questions.push({
        id: `q-weak-typein-${muscle.id}`,
        type: 'type-in',
        category: 'Opakování slabých míst',
        title: `[Slabé místo - Ruční vypisování] Napiš latinský název:`,
        highlightText: `${muscle.cz}`,
        placeholder: 'Napiš latinský název...',
        correctAnswer: muscle.lat,
        explanation: `${muscle.cz} = ${muscle.lat}`,
        muscleId: muscle.id
      });
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
    }
  });

  return shuffleArray(questions).slice(0, 10);
}
