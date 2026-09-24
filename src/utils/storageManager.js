// LocalStorage state management for user progress, spaced repetition and exam scores

const STORAGE_KEY = 'vital_anatomie_progress_v1';

const DEFAULT_STATE = {
  xp: 0,
  streak: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  completedModules: {}, // e.g. { 'mod-1': { stars: 3, bestAccuracy: 100 } }
  masteredMuscles: {}, // e.g. { 'biceps-brachii': { correct: 5, total: 6, score: 83 } }
  weakTopics: [], // list of muscleIds or questionIds
  checklist: {}, // e.g. { 'c1': true, 'c2': false }
  examHistory: [], // array of { id, date, score, total, timeSpentSec }
  spacedRepetition: {} // e.g. { [muscleId]: { interval: 1, ease: 2.5, reps: 0, dueDate: '2026-09-25' } }
};

export function loadUserData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const data = JSON.parse(raw);
    
    // Update streak logic on load
    const today = new Date().toISOString().split('T')[0];
    if (data.lastActiveDate !== today) {
      const lastDate = new Date(data.lastActiveDate);
      const currentDate = new Date(today);
      const diffTime = Math.abs(currentDate - lastDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays > 1) {
        data.streak = 1; // reset streak if missed a day
      }
    }
    return { ...DEFAULT_STATE, ...data };
  } catch (err) {
    console.error("Error loading progress from localStorage", err);
    return DEFAULT_STATE;
  }
}

export function saveUserData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error("Error saving progress to localStorage", err);
  }
}

export function recordQuestionResult(muscleId, isCorrect, xpGain = 15) {
  const data = loadUserData();
  const today = new Date().toISOString().split('T')[0];
  
  // XP & Streak
  data.xp += isCorrect ? xpGain : 5;
  if (data.lastActiveDate !== today) {
    if (new Date(today) - new Date(data.lastActiveDate) <= 86400000 * 2) {
      data.streak += 1;
    } else {
      data.streak = 1;
    }
    data.lastActiveDate = today;
  }

  // Mastery per muscle
  if (muscleId) {
    const prev = data.masteredMuscles[muscleId] || { correct: 0, total: 0 };
    const updated = {
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    };
    updated.score = Math.round((updated.correct / updated.total) * 100);
    data.masteredMuscles[muscleId] = updated;

    // Weak topics tracking
    if (!isCorrect && !data.weakTopics.includes(muscleId)) {
      data.weakTopics.push(muscleId);
    } else if (isCorrect && updated.score >= 80) {
      data.weakTopics = data.weakTopics.filter(id => id !== muscleId);
    }

    // Spaced repetition (SM-2 light)
    const sr = data.spacedRepetition[muscleId] || { interval: 1, ease: 2.5, reps: 0 };
    if (isCorrect) {
      sr.reps += 1;
      if (sr.reps === 1) sr.interval = 1;
      else if (sr.reps === 2) sr.interval = 3;
      else sr.interval = Math.round(sr.interval * sr.ease);
    } else {
      sr.reps = 0;
      sr.interval = 1;
    }
    const nextDue = new Date();
    nextDue.setDate(nextDue.getDate() + sr.interval);
    sr.dueDate = nextDue.toISOString().split('T')[0];
    data.spacedRepetition[muscleId] = sr;
  }

  saveUserData(data);
  return data;
}

export function recordModuleCompletion(moduleId, accuracyPercent) {
  const data = loadUserData();
  const stars = accuracyPercent >= 90 ? 3 : accuracyPercent >= 70 ? 2 : 1;
  const current = data.completedModules[moduleId] || { stars: 0, bestAccuracy: 0 };
  
  data.completedModules[moduleId] = {
    stars: Math.max(current.stars, stars),
    bestAccuracy: Math.max(current.bestAccuracy, accuracyPercent),
    completedAt: new Date().toISOString()
  };

  saveUserData(data);
  return data;
}

export function recordExamResult(score, total = 21, timeSpentSec = 0) {
  const data = loadUserData();
  const percent = Math.round((score / total) * 100);
  const examEntry = {
    id: Date.now(),
    date: new Date().toLocaleDateString('cs-CZ'),
    score,
    total,
    percent,
    timeSpentSec
  };
  data.examHistory.unshift(examEntry);
  data.xp += score * 20; // 20 XP per correct exam question
  saveUserData(data);
  return data;
}

export function toggleChecklistItem(checkId) {
  const data = loadUserData();
  data.checklist[checkId] = !data.checklist[checkId];
  saveUserData(data);
  return data;
}

export function resetAllProgress() {
  localStorage.removeItem(STORAGE_KEY);
  return DEFAULT_STATE;
}
