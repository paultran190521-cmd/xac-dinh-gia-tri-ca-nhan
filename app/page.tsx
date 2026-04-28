'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import BreathingExercise from '@/components/BreathingExercise';
import ValueSorter from '@/components/ValueSorter';
import ScenarioQuestions from '@/components/ScenarioQuestions';
import ConflictResolver from '@/components/ConflictResolver';
import LeadCapture from '@/components/LeadCapture';
import ResultCompass from '@/components/ResultCompass';
import { ValueCard } from '@/lib/valuesData';

type Phase = 'landing' | 'breathing' | 'sorting' | 'scenario' | 'conflict' | 'lead_capture' | 'result';

export default function CompassApp() {
  const [currentPhase, setCurrentPhase] = useState<Phase>('landing');
  const [selectedValues, setSelectedValues] = useState<ValueCard[]>([]);
  const [scenarioAnswers, setScenarioAnswers] = useState<Record<string, string>>({});
  const [finalCoreValues, setFinalCoreValues] = useState<ValueCard[]>([]);

  return (
    <div className="relative z-10 flex flex-col min-h-screen w-full mx-auto px-6 lg:px-16 overflow-hidden">
      <header className="flex justify-between items-center border-b border-white/10 h-20 shrink-0">
        <div className="flex items-center gap-3 sm:gap-4 ml-16 sm:ml-24">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#DF9317] shrink-0" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
          <span className="font-sans text-lg sm:text-2xl font-bold tracking-tight uppercase whitespace-nowrap">Thay Đổi Tâm Thức</span>
        </div>
        <div className="text-[10px] sm:text-xs uppercase tracking-widest opacity-60 hidden md:block font-bold">
          La Bàn Nội Tâm
        </div>
      </header>

      <main className="flex-1 w-full flex flex-col items-center justify-center py-10 relative">
        <AnimatePresence mode="wait">
          {currentPhase === 'landing' && (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center space-y-8 max-w-3xl w-full relative z-10"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-light text-[#DF9317] uppercase tracking-[0.15em] drop-shadow-[0_0_20px_rgba(223,147,23,0.5)] leading-tight whitespace-nowrap">
                Khám Phá Nội Tâm
              </h1>
              <p className="text-lg sm:text-xl text-white/90 font-sans font-light leading-relaxed max-w-2xl mx-auto">
                Giữa những bộn bề của cuộc sống, chúng ta dễ dàng lạc lối. Khám phá giá trị cá nhân là cách để bạn tìm lại chiếc la bàn nội tâm, dẫn lối bạn đến một cuộc đời ý nghĩa và trọn vẹn hơn.
              </p>
              <button
                onClick={() => setCurrentPhase('breathing')}
                className="mt-12 px-10 py-4 bg-[#DF9317] text-[#104E5B] font-bold uppercase rounded-2xl hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(223,147,23,0.5)] transition-all text-sm tracking-widest"
              >
                Bắt đầu hành trình
              </button>
            </motion.div>
          )}

          {currentPhase === 'breathing' && (
            <motion.div className="w-full flex justify-center" key="breathing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <BreathingExercise onComplete={() => setCurrentPhase('sorting')} />
            </motion.div>
          )}

          {currentPhase === 'sorting' && (
            <motion.div className="w-full h-full flex justify-center" key="sorting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ValueSorter onComplete={(values) => {
                setSelectedValues(values);
                setCurrentPhase('scenario');
              }} />
            </motion.div>
          )}

          {currentPhase === 'scenario' && (
            <motion.div className="w-full h-full flex justify-center" key="scenario" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ScenarioQuestions 
                values={selectedValues} 
                onComplete={(answers) => {
                  setScenarioAnswers(answers);
                  setCurrentPhase('conflict');
                }} 
              />
            </motion.div>
          )}

          {currentPhase === 'conflict' && (
            <motion.div className="w-full h-full flex justify-center" key="conflict" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ConflictResolver 
                values={selectedValues} 
                onComplete={(topValues) => {
                  setFinalCoreValues(topValues);
                  setCurrentPhase('lead_capture');
                }} 
              />
            </motion.div>
          )}

          {currentPhase === 'lead_capture' && (
            <motion.div className="w-full h-full flex justify-center" key="lead_capture" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <LeadCapture 
                finalValues={finalCoreValues}
                onComplete={() => {
                  setCurrentPhase('result');
                }} 
              />
            </motion.div>
          )}

          {currentPhase === 'result' && (
            <motion.div className="w-full h-full flex justify-center" key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ResultCompass coreValues={finalCoreValues} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="flex justify-between items-center border-t border-white/10 h-24 shrink-0 mt-8 relative z-10">
        <div className="text-sm opacity-60 font-light max-w-md hidden sm:block">
          Dựa trên liệu pháp Chấp nhận và Cam kết (ACT), công cụ này giúp phản ánh những điều bạn thực sự trân trọng.
        </div>
        {currentPhase === 'result' && (
          <div className="flex gap-4">
            <button onClick={() => window.location.reload()} className="bg-transparent text-white border border-white/30 py-3 px-6 rounded-2xl uppercase text-xs tracking-widest hover:border-[#DF9317] hover:text-[#DF9317] transition-all">
              Khám phá lại
            </button>
          </div>
        )}
      </footer>
    </div>
  );
}
