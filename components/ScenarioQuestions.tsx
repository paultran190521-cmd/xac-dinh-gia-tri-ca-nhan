'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ValueCard } from '@/lib/valuesData';

export default function ScenarioQuestions({ 
  values, 
  onComplete 
}: { 
  values: ValueCard[], 
  onComplete: (answers: Record<string, string>) => void 
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  
  // Create 3 situational questions based on their top values
  const questions = [
    {
      id: 'q1',
      title: 'Khoảnh khắc khó khăn',
      text: `Gần đây, khi đối mặt với một khó khăn lớn, giá trị "${values[0]?.name}" đã đóng vai trò gì trong cách bạn vượt qua?`,
      placeholder: 'Xin hãy chia sẻ một chút về trải nghiệm của bạn (tùy chọn)...'
    },
    {
      id: 'q2',
      title: 'Sự đánh đổi',
      text: `Nếu phải hi sinh một lượng thời gian hoặc tài chính để bảo vệ "${values[1 % values.length]?.name}", bạn có sẵn lòng không? Tại sao?`,
      placeholder: 'Vui lòng ghi lại những suy nghĩ chân thật nhất...'
    },
    {
      id: 'q3',
      title: 'Tầm nhìn tương lai',
      text: `5 năm nữa, nếu cuộc đời bạn phản ánh trọn vẹn giá trị "${values[2 % values.length]?.name}", bạn hình dung mỗi ngày của mình sẽ diễn ra như thế nào?`,
      placeholder: 'Một ngày lý tưởng của bạn...'
    }
  ];

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onComplete(answers);
    }
  };

  const handleSkip = () => {
    handleNext();
  };

  return (
    <div className="flex flex-col p-6 sm:p-10 min-h-[500px] w-full max-w-4xl mx-auto">
      <div className="mb-8 text-center flex flex-col items-center">
        <h2 className="text-xl sm:text-2xl font-sans text-white/60 mb-2 uppercase tracking-widest font-bold">
          Bước 2
        </h2>
        <h2 className="text-3xl sm:text-4xl font-sans text-[#DF9317] mb-4 uppercase tracking-widest font-bold">
          Phản chiếu
        </h2>
        <div className="flex gap-3 justify-center max-w-sm mx-auto w-full">
          {questions.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-2 flex-1 rounded-sm transition-all duration-500 ${idx <= currentIndex ? 'bg-[#DF9317]' : 'bg-[#1992B0]/20'}`} 
            />
          ))}
        </div>
      </div>

      <div className="flex-1 w-full flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col w-full flex-1 pt-4 sm:pt-8"
          >
            <h3 className="text-xl sm:text-2xl text-[#1992B0] font-sans font-bold uppercase tracking-widest mb-3 sm:mb-4">
              {questions[currentIndex].title}
            </h3>
            <p className="text-white/80 font-sans text-lg sm:text-xl mb-6 leading-relaxed max-w-3xl">
              {questions[currentIndex].text}
            </p>
            
            <textarea
              value={answers[questions[currentIndex].id] || ''}
              onChange={(e) => setAnswers({ ...answers, [questions[currentIndex].id]: e.target.value })}
              placeholder={questions[currentIndex].placeholder}
              className="w-full flex-1 min-h-[160px] bg-[#1992B0]/10 border border-[#1992B0]/30 rounded-2xl p-6 text-white placeholder-white/40 focus:outline-none focus:border-[#DF9317] focus:ring-1 focus:ring-[#DF9317] focus:shadow-[0_0_15px_rgba(223,147,23,0.3)] transition-all resize-none font-sans text-base sm:text-lg mb-6"
            />
            
            {/* Navigation Buttons placed immediately below textarea */}
            <div className="flex justify-between items-center z-10 w-full relative mt-auto">
              <button
                onClick={handleSkip}
                className="text-white/50 hover:text-[#DF9317] uppercase text-xs tracking-widest font-bold transition-colors py-2 px-4 shadow-none bg-transparent"
              >
                Bỏ qua
              </button>
              <button
                onClick={handleNext}
                className="px-8 py-3 bg-[#DF9317] hover:bg-[#c47e11] text-[#104E5B] font-bold uppercase rounded-2xl text-xs sm:text-sm tracking-widest transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-[#DF9317]/20"
              >
                {currentIndex === questions.length - 1 ? 'Hoàn tất' : 'Tiếp tục'}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
