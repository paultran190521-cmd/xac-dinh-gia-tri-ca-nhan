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

  return (
    <div className="flex flex-col p-6 sm:p-10 h-full min-h-[600px] w-full max-w-5xl">
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-sans text-[#DF9317] mb-3 uppercase tracking-widest font-bold">Bước 1: Lựa chọn Giá Trị</h2>
        <p className="text-white/80 font-sans max-w-2xl mx-auto">
          Hãy chọn ra tối đa 8 giá trị mà bạn cảm thấy quan trọng nhất với mình ngay lúc này.
          <br className="hidden sm:block" />
          Không có đúng hay sai, chỉ có sự chân thật từ nội tâm bạn.
        </p>
        <p className="mt-4 text-xs tracking-widest uppercase text-[#1992B0] font-bold">Đã chọn: {selectedIds.size} / 8</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8 p-4">
        {ALL_VALUES.map((val) => {
          const isSelected = selectedIds.has(val.id);
          return (
            <motion.div
              key={val.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleValue(val.id)}
              className={`p-6 cursor-pointer transition-all duration-300 relative rounded-2xl ${
                isSelected 
                  ? 'bg-[#1992B0]/20 border border-[#DF9317] shadow-[0_0_20px_rgba(223,147,23,0.3)]' 
                  : 'bg-white/5 border border-white/10 hover:bg-[#1992B0]/10 hover:border-[#1992B0] hover:shadow-[0_0_15px_rgba(25,146,176,0.3)]'
              }`}
            >
              {isSelected && (
                <div className="absolute -top-3 -right-3 bg-[#DF9317] text-[#104E5B] p-2 rounded-full shadow-lg">
                  <Check size={18} strokeWidth={3} />
                </div>
              )}
              <h3 className={`font-sans tracking-widest uppercase text-lg mb-2 font-bold drop-shadow-sm ${isSelected ? 'text-[#DF9317]' : 'text-white/95'}`}>
                {val.name}
              </h3>
              <p className="text-white/90 text-sm font-sans pr-4 leading-relaxed">
                {val.description}
              </p>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-auto flex justify-center">
        <button
          onClick={() => onComplete(ALL_VALUES.filter(v => selectedIds.has(v.id)))}
          disabled={selectedIds.size < 3}
          className={`px-10 py-3 rounded uppercase text-sm font-bold tracking-widest transition-all ${
            selectedIds.size >= 3
              ? 'bg-[#DF9317] hover:bg-[#c47e11] text-[#104E5B] hover:scale-105 active:scale-95 shadow-lg'
              : 'bg-white/10 text-white/30 border border-white/20 cursor-not-allowed'
          }`}
        >
          Tiếp tục
        </button>
      </div>
    </div>
  );
}
