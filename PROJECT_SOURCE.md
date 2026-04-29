# Dự án: Thay Đổi Tâm Thức (La Bàn Nội Tâm)
Dưới đây là một phần mã nguồn chính sách đã được điều chỉnh như yêu cầu. 
(Do kích thước tổng file lớn quá nên tôi chia sẻ danh sách các tệp tin quan trọng cùng với nội dung để bạn tự tạo tại local)

## 1. `/app/page.tsx`
File chứa logic luồng ứng dụng chính, quản lý trạng thái các màn hình:
```tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import BreathingExercise from '@/components/BreathingExercise';
import NarrativeJourney from '@/components/NarrativeJourney';
import ValueSorter from '@/components/ValueSorter';
import ScenarioQuestions from '@/components/ScenarioQuestions';
import ConflictResolver from '@/components/ConflictResolver';
import LeadCapture from '@/components/LeadCapture';
import ResultCompass from '@/components/ResultCompass';
import { ValueCard } from '@/lib/valuesData';

type Phase = 'landing' | 'breathing' | 'narrative' | 'sorting' | 'scenario' | 'conflict' | 'lead_capture' | 'result';

export default function CompassApp() {
  const [currentPhase, setCurrentPhase] = useState<Phase>('landing');
  const [selectedValues, setSelectedValues] = useState<ValueCard[]>([]);
  const [scenarioAnswers, setScenarioAnswers] = useState<Record<string, string>>({});
  const [finalCoreValues, setFinalCoreValues] = useState<ValueCard[]>([]);

  // Scroll to top when phase changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPhase]);

  const phaseVariants = {
    initial: { opacity: 0, filter: 'blur(10px)', scale: 0.95 },
    animate: { opacity: 1, filter: 'blur(0px)', scale: 1, transition: { duration: 1.5, ease: 'easeOut' as const } },
    exit: { opacity: 0, filter: 'blur(10px)', scale: 1.02, transition: { duration: 0.8, ease: 'easeIn' as const } }
  };

  return (
    <div className="relative z-10 flex flex-col min-h-screen w-full mx-auto overflow-x-hidden">
      {currentPhase !== 'breathing' && (
        <header className="flex justify-between items-center border-b border-white/10 h-20 shrink-0 px-6 lg:px-16">
          <div className="flex items-center gap-3 sm:gap-4 ml-16 sm:ml-28 md:ml-32">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#DF9317] shrink-0" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
            <span className="font-sans text-lg sm:text-2xl font-bold tracking-tight uppercase whitespace-nowrap">Thay Đổi Tâm Thức</span>
          </div>
          <div className="text-[10px] sm:text-xs uppercase tracking-widest opacity-60 hidden md:block font-bold">
            La Bàn Nội Tâm
          </div>
        </header>
      )}

      <main className="flex-1 w-full flex flex-col items-center justify-center py-6 sm:py-10 relative px-6 lg:px-16">
        <AnimatePresence mode="wait">
          {currentPhase === 'landing' && (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center space-y-8 max-w-3xl w-full relative z-10"
            >
              <h1 className="text-xl min-[360px]:text-2xl min-[400px]:text-3xl sm:text-5xl lg:text-6xl font-sans font-light text-[#DF9317] uppercase tracking-widest sm:tracking-[0.15em] drop-shadow-[0_0_20px_rgba(223,147,23,0.5)] leading-tight whitespace-nowrap w-full text-center">
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
            <motion.div 
              className="fixed inset-0 z-40 w-full h-[100dvh] flex flex-col pointer-events-none" 
              key="breathing" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1, transition: { duration: 1.5 } }} 
              exit={{ opacity: 0, transition: { duration: 0.8 } }}
            >
              <BreathingExercise onComplete={() => setCurrentPhase('narrative')} />
            </motion.div>
          )}

          {currentPhase === 'narrative' && (
            <motion.div className="w-full flex justify-center" key="narrative" variants={phaseVariants} initial="initial" animate="animate" exit="exit">
              <NarrativeJourney 
                onNext={() => setCurrentPhase('sorting')} 
                onBack={() => setCurrentPhase('breathing')} 
              />
            </motion.div>
          )}

          {currentPhase === 'sorting' && (
            <motion.div className="w-full h-full flex justify-center" key="sorting" variants={phaseVariants} initial="initial" animate="animate" exit="exit">
              <ValueSorter onComplete={(values) => {
                setSelectedValues(values);
                setCurrentPhase('scenario');
              }} />
            </motion.div>
          )}

          {currentPhase === 'scenario' && (
            <motion.div className="w-full h-full flex justify-center" key="scenario" variants={phaseVariants} initial="initial" animate="animate" exit="exit">
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
            <motion.div className="w-full h-full flex justify-center" key="conflict" variants={phaseVariants} initial="initial" animate="animate" exit="exit">
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
            <motion.div className="w-full h-full flex justify-center" key="lead_capture" variants={phaseVariants} initial="initial" animate="animate" exit="exit">
              <LeadCapture 
                finalValues={finalCoreValues}
                onComplete={() => {
                  setCurrentPhase('result');
                }} 
              />
            </motion.div>
          )}

          {currentPhase === 'result' && (
            <motion.div className="w-full h-full flex justify-center" key="result" variants={phaseVariants} initial="initial" animate="animate" exit="exit">
              <ResultCompass coreValues={finalCoreValues} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {currentPhase !== 'breathing' && (
        <footer className="flex justify-between items-center border-t border-white/10 h-24 shrink-0 mt-8 relative z-10 px-6 lg:px-16">
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
      )}
    </div>
  );
}
```

## 2. `/app/layout.tsx`
Khung chính với Mandala và thiết lập Font `Be Vietnam Pro`:
```tsx
import type { Metadata } from 'next';
import { Be_Vietnam_Pro } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { Home } from 'lucide-react';

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['vietnamese', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
});

// ... (Metadata)

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // ... (JSON-LD)
  return (
    <html lang="vi" className={`${beVietnamPro.variable}`}>
       <body className="font-sans antialiased bg-[#104E5B] text-white overflow-x-hidden min-h-screen relative">
        <a 
          href="https://thaydoitamthuc.com"
          className="absolute top-4 left-4 sm:top-8 sm:left-8 z-50 flex items-center justify-center p-3 rounded-full bg-white/5 hover:bg-white/10 text-[#DF9317] border border-[#DF9317]/20 transition-all duration-300 hover:scale-110 shadow-lg backdrop-blur-md"
          title="Trở về trang chủ Thay Đổi Tâm Thức"
        >
          <Home className="w-5 h-5 sm:w-6 sm:h-6" />
        </a>

        {/* Glow & Mandala Background */}
        <div className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center overflow-hidden">
          {/* Inner Glow to draw focus */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(223,147,23,0.3)_0%,rgba(223,147,23,0)_40%)]" />
          
          {/* Thin, refined luxury Mandala SVG */}
          <div 
             className="..." // SVG Content Background Here 
          />
        </div>
        <main className="relative z-10 w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
```

## 3. `/components/BreathingExercise.tsx`
Tính năng đã được khóa thanh cuộn chuẩn:
```tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export default function BreathingExercise({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, onComplete]);

  useEffect(() => {
    // Scroll to top and disable scrolling globally during breathing exercise
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (phase === 'inhale') {
      timeout = setTimeout(() => setPhase('hold'), 4000); // Inhale for 4s
    } else if (phase === 'hold') {
      timeout = setTimeout(() => setPhase('exhale'), 4000); // Hold for 4s
    } else if (phase === 'exhale') {
      timeout = setTimeout(() => setPhase('inhale'), 6000); // Exhale for 6s
    }
    return () => clearTimeout(timeout);
  }, [phase]);

  const circleScale = phase === 'inhale' ? 1.5 : phase === 'hold' ? 1.5 : 1;
  const instruction = phase === 'inhale' ? 'Hít vào thật sâu...' : phase === 'hold' ? 'Giữ hơi thở...' : 'Từ từ thở ra...';

  return (
    <div className="flex flex-col items-center justify-between h-[100dvh] w-full py-8 sm:py-12 text-center pointer-events-none relative">
      <div className="w-full max-w-2xl mx-auto space-y-4 pt-16 sm:pt-24 px-4 pointer-events-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[#DF9317] drop-shadow-md whitespace-nowrap">
          DỪNG LẠI MỘT CHÚT
        </h2>
        <p className="text-white/90 font-sans text-base sm:text-lg leading-relaxed text-shadow max-w-md mx-auto">
          Hãy để tâm trí bạn tĩnh lặng. Dành phút giây này để quay về với nhịp thở của chính mình.
        </p>
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 w-full h-full">
        <motion.div
           // Animation settings...
           className="absolute inset-0 m-auto w-48 h-48 rounded-full bg-[#1992B0]/10 border border-[#DF9317] shadow-[0_0_30px_rgba(223,147,23,0.3)] origin-center"
        />
        <motion.div
           // Background Blur ...
           className="absolute inset-0 m-auto w-48 h-48 rounded-full bg-[#1992B0]/30 blur-2xl origin-center"
        />
        <div className="z-10 relative text-[#DF9317] font-bold text-sm sm:text-lg uppercase tracking-widest font-sans drop-shadow-[0_0_15px_rgba(223,147,23,1)] text-center whitespace-nowrap px-4">
          {instruction}
        </div>
      </div>

      <div className="flex flex-col items-center gap-6 z-30 pointer-events-auto pb-10">
        <div className="text-[#1992B0] font-bold text-sm tracking-widest uppercase bg-[#1992B0]/10 px-6 py-2 rounded-full border border-[#1992B0]/30 shadow-[0_0_15px_rgba(25,146,176,0.2)] backdrop-blur-md">
          Còn lại {timeLeft} giây
        </div>
        <button
          onClick={onComplete}
          className="text-xs uppercase tracking-widest text-white/50 hover:text-[#DF9317] transition-all hover:scale-105 px-6 py-4"
        >
          Bỏ qua
        </button>
      </div>
    </div>
  );
}
```

(Các thư mục và Component khác như File `ValueSorter, ScenarioQuestions, LeadCapture` nếu muốn truy xuất, có thể truy cập qua Code Editor tại bên trái trên màn hình nhé. Hoặc bạn có thể click tải file ZIP từ phần Settings ở góc menu "Export" nha!). Trang web giờ đã hoạt động hoản hảo theo ý bạn!
