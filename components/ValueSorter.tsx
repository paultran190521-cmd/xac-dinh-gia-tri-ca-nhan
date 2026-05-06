'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { ValueCard, ALL_VALUES } from '@/lib/valuesData';

export default function ValueSorter({ onComplete }: { onComplete: (values: ValueCard[]) => void }) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const toggleValue = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      if (newSelected.size < 8) {
        newSelected.add(id);
      }
    }
    setSelectedIds(newSelected);
  };

  const groupedValues = ALL_VALUES.reduce((acc, val) => {
    const cat = val.category || 'KHÁC';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(val);
    return acc;
  }, {} as Record<string, ValueCard[]>);

  return (
    <div className="flex flex-col p-4 sm:p-8 h-full min-h-[600px] w-full max-w-6xl mx-auto">
      <div className="mb-10 text-center flex flex-col items-center">
        <h2 className="text-xl sm:text-2xl font-sans text-white/60 mb-2 uppercase tracking-widest font-bold">
          Bước 1
        </h2>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-sans text-[#DF9317] mb-3 uppercase tracking-widest font-bold whitespace-nowrap">
          Lựa chọn Giá Trị
        </h2>
        <p className="text-white/80 font-sans max-w-2xl mx-auto mt-2">
          Hãy chọn ra tối đa 8 giá trị mà bạn cảm thấy quan trọng nhất với mình ngay lúc này.
          <br className="hidden sm:block" />
          Không có đúng hay sai, chỉ có sự chân thật từ nội tâm bạn.
        </p>
        <p className="mt-4 text-xs tracking-widest uppercase text-[#1992B0] font-bold">Đã chọn: {selectedIds.size} / 8</p>
      </div>

      <div className="flex-1 overflow-x-hidden p-2">
        {Object.entries(groupedValues).map(([category, values]) => (
          <div key={category} className="mb-12">
            <h3 className="text-xl font-sans text-white/90 mb-6 uppercase tracking-widest font-medium border-l-4 border-[#DF9317] pl-3">
              {category}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {values.map((val) => {
                const isSelected = selectedIds.has(val.id);
                return (
                  <motion.div
                    key={val.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleValue(val.id)}
                    className={`p-5 cursor-pointer transition-all duration-300 relative rounded-2xl flex flex-col justify-between ${
                      isSelected 
                        ? 'bg-[#1992B0]/20 border border-[#DF9317] shadow-[0_0_15px_rgba(223,147,23,0.3)]' 
                        : 'bg-white/5 border border-white/10 hover:bg-[#1992B0]/10 hover:border-[#1992B0] hover:shadow-[0_0_15px_rgba(25,146,176,0.3)]'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute -top-3 -right-3 bg-[#DF9317] text-[#104E5B] p-1.5 rounded-full shadow-lg z-10 block">
                        <Check size={16} strokeWidth={3} />
                      </div>
                    )}
                    <div>
                      <h3 className={`font-sans tracking-widest uppercase text-base mb-1 font-bold drop-shadow-sm pr-4 ${isSelected ? 'text-[#DF9317]' : 'text-white/95'}`}>
                        {val.name}
                      </h3>
                      <p className="text-white/70 text-sm font-sans pr-2 leading-relaxed">
                        {val.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-white/10 flex justify-center sticky bottom-4 z-20">
        <button
          onClick={() => onComplete(ALL_VALUES.filter(v => selectedIds.has(v.id)))}
          disabled={selectedIds.size < 3}
          className={`px-12 py-4 rounded-2xl uppercase text-sm font-bold tracking-widest transition-all ${
            selectedIds.size >= 3
              ? 'bg-[#DF9317] hover:bg-[#c47e11] text-[#104E5B] hover:scale-105 active:scale-95 shadow-xl shadow-[#DF9317]/20 backdrop-blur-md'
              : 'bg-black/50 text-white/30 border border-white/20 cursor-not-allowed backdrop-blur-md'
          }`}
        >
          Tiếp tục ({selectedIds.size}/8)
        </button>
      </div>
    </div>
  );
}
