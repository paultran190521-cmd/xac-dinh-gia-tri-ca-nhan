'use client';

import { motion } from 'motion/react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';

interface NarrativeJourneyProps {
  onNext: () => void;
  onBack: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 2 } // slow reveal for cinematic effect
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95, filter: 'blur(10px)' },
  visible: { 
    opacity: 1, 
    scale: 1, 
    filter: 'blur(0px)',
    transition: { duration: 2.5, ease: 'easeOut' as const }
  }
};

export default function NarrativeJourney({ onNext, onBack }: NarrativeJourneyProps) {
  const [showButtons, setShowButtons] = useState(false);

  // Smooth cinematic reveal delay for buttons
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButtons(true);
    }, 9000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-16 sm:space-y-24"
      >
        {/* Intro */}
        <motion.div variants={itemVariants} className="space-y-6">
          <p className="text-[#DF9317] text-sm sm:text-base font-sans font-bold tracking-[0.3em] uppercase opacity-80">
            Hành trình Tâm thức
          </p>
          <h2 className="text-white/90 font-sans text-2xl sm:text-3xl lg:text-4xl leading-relaxed max-w-4xl mx-auto drop-shadow-sm font-light">
            Chào mừng bạn bước vào một không gian hoàn toàn riêng tư,
            nơi không có sự phán xét, chỉ có sự thành thật với chính mình...
          </h2>
        </motion.div>

        {/* Preparation Guide */}
        <motion.div variants={itemVariants} className="space-y-3 pt-4 text-white/60 font-sans text-xs sm:text-sm tracking-widest uppercase relative before:content-[''] before:absolute before:-top-8 before:left-1/2 before:-translate-x-1/2 before:w-px before:h-4 before:bg-[#DF9317]/50">
          <p><span className="text-[#DF9317] mr-2">◆</span> Thời gian dự kiến: ~ 10 - 15 phút</p>
          <p><span className="text-[#DF9317] mr-2">◆</span> Không gian yên tĩnh, tâm thế mở cửa</p>
        </motion.div>

        {/* Deep Reflection */}
        <motion.div variants={itemVariants} className="space-y-8 pt-8">
          <p className="text-white/80 font-sans text-lg sm:text-2xl leading-relaxed font-light">
            Bạn từng đề cao điều gì? Từng tự hào về điều gì?
          </p>
          <p className="text-white/80 font-sans text-lg sm:text-2xl leading-relaxed font-light">
            Mọi người xung quanh thường nhắc đến bạn như thế nào?
          </p>
          <h3 className="text-[#DF9317] font-sans text-2xl sm:text-3xl lg:text-4xl font-medium leading-relaxed max-w-3xl mx-auto drop-shadow-[0_0_15px_rgba(223,147,23,0.3)] pt-4">
            "Và nếu ngày mai bạn không còn trên cuộc đời này nữa,
            <br className="hidden sm:block" /> bạn muốn thế giới sẽ nhớ về bạn là người như thế nào?"
          </h3>
        </motion.div>
      </motion.div>

      {/* Navigation Buttons */}
      <div className={`mt-24 flex items-center justify-center gap-16 sm:gap-32 transition-all duration-[2000ms] ${showButtons ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <button 
          onClick={onBack}
          className="group flex flex-col items-center gap-3 text-white/50 hover:text-[#DF9317] transition-colors focus:outline-none"
        >
          <span className="p-4 rounded-full border border-white/20 group-hover:border-[#DF9317] transition-all">
            <ArrowLeft strokeWidth={1.5} className="w-5 h-5 sm:w-6 sm:h-6" />
          </span>
          <span className="text-[10px] tracking-[0.2em] uppercase font-bold opacity-0 group-hover:opacity-100 transition-opacity">Trở lại</span>
        </button>

        <button 
          onClick={onNext}
          className="group flex flex-col items-center gap-3 text-[#DF9317] hover:text-[#f4b64e] transition-colors focus:outline-none"
        >
          <span className="p-4 rounded-full border border-[#DF9317]/50 shadow-[0_0_15px_rgba(223,147,23,0.2)] group-hover:shadow-[0_0_30px_rgba(223,147,23,0.6)] group-hover:border-[#DF9317] transition-all relative overflow-hidden">
            <span className="absolute inset-0 bg-[#DF9317]/10 group-hover:bg-[#DF9317]/20 transition-colors" />
            <ArrowRight strokeWidth={1.5} className="w-5 h-5 sm:w-6 sm:h-6 relative z-10" />
          </span>
          <span className="text-[10px] tracking-[0.2em] uppercase font-bold opacity-0 group-hover:opacity-100 transition-opacity">Đi tiếp</span>
        </button>
      </div>
    </div>
  );
}
