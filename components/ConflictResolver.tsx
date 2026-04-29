'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ValueCard } from '@/lib/valuesData';

export default function ConflictResolver({ 
  values, 
  onComplete 
}: { 
  values: ValueCard[], 
  onComplete: (topValues: ValueCard[]) => void 
}) {
  const [pairs, setPairs] = useState<[ValueCard, ValueCard][]>([]);
  const [currentPairIndex, setCurrentPairIndex] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});

  useEffect(() => {
    // Generate simple pairs (max 8-10 pairs to not fatigue the user)
    // Random matchmaking
    const generatedPairs: [ValueCard, ValueCard][] = [];
    const shuffled = [...values].sort(() => Math.random() - 0.5);
    
    // Create random matchups to establish a score
    for (let i = 0; i < shuffled.length; i++) {
      for (let j = i + 1; j < shuffled.length; j++) {
        // Let's cap at around 10 questions to keep it engaging
        if (generatedPairs.length < 10) {
          generatedPairs.push([shuffled[i], shuffled[j]]);
        }
      }
    }
    
    // Shuffle the pairs
    setPairs(generatedPairs.sort(() => Math.random() - 0.5));
    
    // Init scores
    const initScores: Record<string, number> = {};
    values.forEach(v => { initScores[v.id] = 0; });
    setScores(initScores);
  }, [values]);

  const handleChoice = (selectedId: string) => {
    setScores(prev => ({ ...prev, [selectedId]: prev[selectedId] + 1 }));
    
    if (currentPairIndex < pairs.length - 1) {
      setCurrentPairIndex(prev => prev + 1);
    } else {
      // Finished
      const finalScores = { ...scores, [selectedId]: scores[selectedId] + 1 };
      
      // Sort values by score
      const sortedValues = [...values].sort((a, b) => finalScores[b.id] - finalScores[a.id]);
      
      // Take top 5 or all if less than 5
      onComplete(sortedValues.slice(0, 5));
    }
  };

  if (pairs.length === 0) return null;

  const [valA, valB] = pairs[currentPairIndex];

  return (
    <div className="flex flex-col items-center justify-center p-6 sm:p-10 min-h-[500px]">
      <div className="mb-10 text-center flex flex-col items-center">
        <h2 className="text-xl sm:text-2xl font-sans text-white/60 mb-2 uppercase tracking-widest font-bold">
          Bước 3
        </h2>
        <h2 className="text-3xl sm:text-4xl font-sans text-[#DF9317] mb-3 uppercase tracking-widest font-bold">
          Thử thách Giá Trị
        </h2>
        <p className="text-white/80 font-sans max-w-lg mx-auto">
          Cuộc sống đôi khi buộc chúng ta phải lựa chọn. Nếu chỉ được giữ lại một điều để dẫn lối cho bạn ngay lúc này, bạn sẽ chọn gì?
        </p>
        <p className="text-xs text-[#1992B0] mt-4 font-bold uppercase tracking-widest">
          {currentPairIndex + 1} / {pairs.length}
        </p>
      </div>

      <div className="w-full max-w-3xl relative">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentPairIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="flex flex-col sm:flex-row gap-6 items-stretch justify-center"
          >
            <button
              onClick={() => handleChoice(valA.id)}
              className="flex-1 bg-[#1992B0]/5 hover:bg-[#1992B0]/20 border border-white/10 hover:border-[#DF9317] p-8 rounded-3xl transition-all hover:-translate-y-2 group text-left sm:text-center shadow-md hover:shadow-[0_0_25px_rgba(223,147,23,0.3)]"
            >
              <h3 className="text-2xl font-sans font-bold tracking-widest text-white/95 drop-shadow-sm uppercase group-hover:text-[#DF9317] transition-colors mb-2">
                {valA.name}
              </h3>
              <p className="text-white/90 text-sm font-sans italic leading-relaxed">
                {valA.description}
              </p>
            </button>

            <div className="flex items-center justify-center py-4 sm:py-0">
              <span className="text-white/30 italic font-serif">hoặc</span>
            </div>

            <button
              onClick={() => handleChoice(valB.id)}
              className="flex-1 bg-[#1992B0]/5 hover:bg-[#1992B0]/20 border border-white/10 hover:border-[#DF9317] p-8 rounded-3xl transition-all hover:-translate-y-2 group text-left sm:text-center shadow-md hover:shadow-[0_0_25px_rgba(223,147,23,0.3)]"
            >
              <h3 className="text-2xl font-sans font-bold tracking-widest text-white/95 drop-shadow-sm uppercase group-hover:text-[#DF9317] transition-colors mb-2">
                {valB.name}
              </h3>
              <p className="text-white/90 text-sm font-sans italic leading-relaxed">
                {valB.description}
              </p>
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
