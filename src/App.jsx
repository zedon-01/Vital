import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LearningPath from './components/LearningPath';
import BodyMapSelector from './components/BodyMapSelector';
import MuscleAtlas from './components/MuscleAtlas';
import MatchingGame from './components/MatchingGame';
import ExamMode from './components/ExamMode';
import WeakSpots from './components/WeakSpots';
import FinalChecklist from './components/FinalChecklist';
import StudySessionModal from './components/StudySessionModal';
import SingleMuscleDrillModal from './components/SingleMuscleDrillModal';

import { loadUserData } from './utils/storageManager';
import { generateModuleQuestions, generateWeakTopicsSession } from './utils/questionGenerator';

export default function App() {
  const [activeTab, setActiveTab] = useState('path');
  const [userData, setUserData] = useState(() => loadUserData());
  
  // Active study session state
  const [activeSession, setActiveSession] = useState(null); // { moduleId, questions }

  // Single muscle drill modal state
  const [selectedMuscleForDrill, setSelectedMuscleForDrill] = useState(null);

  const refreshUserData = () => {
    setUserData(loadUserData());
  };

  const handleStartSession = (moduleId) => {
    const questions = generateModuleQuestions(moduleId, 7);
    setActiveSession({
      moduleId,
      questions
    });
  };

  const handleStartWeakSession = (weakIds) => {
    const questions = generateWeakTopicsSession(weakIds);
    setActiveSession({
      moduleId: 'weak-review',
      questions
    });
  };

  const handleCloseSession = () => {
    setActiveSession(null);
    refreshUserData();
  };

  const handleSelectMuscle = (muscle) => {
    setSelectedMuscleForDrill(muscle);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Global Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userData={userData}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1">
        {activeTab === 'path' && (
          <LearningPath
            userData={userData}
            onStartSession={handleStartSession}
          />
        )}

        {activeTab === 'bodymap' && (
          <BodyMapSelector
            onSelectMuscle={handleSelectMuscle}
            onStartRegionSession={handleStartSession}
          />
        )}

        {activeTab === 'atlas' && (
          <MuscleAtlas
            userData={userData}
            onSelectMuscle={handleSelectMuscle}
          />
        )}

        {activeTab === 'matching' && (
          <MatchingGame
            onRefreshData={refreshUserData}
          />
        )}

        {activeTab === 'exam' && (
          <ExamMode
            userData={userData}
            onRefreshData={refreshUserData}
          />
        )}

        {activeTab === 'weak' && (
          <WeakSpots
            userData={userData}
            onStartWeakSession={handleStartWeakSession}
          />
        )}

        {activeTab === 'checklist' && (
          <FinalChecklist
            userData={userData}
            onRefreshData={refreshUserData}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-6 text-center text-xs text-slate-500 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4">
          <p className="font-semibold text-slate-400">
            Vital Institut - Funkční Anatomie Svalů | Kompletní výuková osnova ke zkoušce fitness instruktora
          </p>
          <p className="mt-1 text-slate-600">
            Obsah vychází 100% z dodaných skript bez úprav z jiných zdrojů.
          </p>
        </div>
      </footer>

      {/* Interactive Duolingo Module Study Session Modal */}
      {activeSession && (
        <StudySessionModal
          moduleId={activeSession.moduleId}
          questions={activeSession.questions}
          onClose={handleCloseSession}
          onRefreshData={refreshUserData}
        />
      )}

      {/* Single Muscle Inspector & Drill Modal */}
      {selectedMuscleForDrill && (
        <SingleMuscleDrillModal
          muscle={selectedMuscleForDrill}
          onClose={() => setSelectedMuscleForDrill(null)}
          onRefreshData={refreshUserData}
        />
      )}

    </div>
  );
}
