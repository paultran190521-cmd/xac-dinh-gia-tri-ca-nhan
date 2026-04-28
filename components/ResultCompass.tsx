'use client';

import { ValueCard } from '@/lib/valuesData';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip } from 'recharts';
import { motion } from 'motion/react';

export default function ResultCompass({ 
  coreValues,
}: { 
  coreValues: ValueCard[];
}) {
  // Normalize data for radar chart
  const data = coreValues.map((v, i) => ({
    subject: v.name,
    A: 100 - (i * 10), // Visually descending
    fullMark: 100,
  }));

  return (
    <div className="w-full flex flex-col lg:grid lg:grid-cols-[1.2fr_1fr] gap-10 items-start justify-center p-6 sm:p-10">
      <div className="flex justify-center items-center relative w-full lg:sticky lg:top-10 h-[450px]">
        {/* Subtle glow behind the chart */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#1992B0]/20 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="w-full h-full relative z-10 w-full max-w-[450px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
              <PolarGrid stroke="rgba(255,255,255,0.2)" />
              <PolarAngleAxis 
                dataKey="subject" 
                tick={{ fill: '#FFF', fontSize: 13, fontFamily: 'inherit' }} 
              />
              <Radar 
                name="Giá trị" 
                dataKey="A" 
                stroke="#1992B0" 
                strokeWidth={2}
                fill="rgba(25, 146, 176, 0.4)"
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(16, 78, 91, 0.9)', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '4px',
                  color: 'white'
                }} 
                itemStyle={{ color: '#DF9317' }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="w-full flex flex-col gap-6">
        <h2 className="font-sans text-3xl mb-2 font-bold uppercase tracking-widest text-[#DF9317]">Top 5 Giá Trị Cốt Lõi</h2>
        <div className="flex flex-col gap-4">
          {coreValues.map((val, idx) => (
            <motion.div 
              key={val.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col gap-3 p-5 rounded-2xl bg-[#1992B0]/10 border border-[#1992B0]/20 hover:border-[#DF9317]/50 hover:shadow-[0_0_15px_rgba(223,147,23,0.15)] transition-all"
            >
              <div className="flex items-center gap-4 border-b border-white/10 pb-3">
                <span className="text-3xl font-black leading-none text-[#DF9317] opacity-80 font-sans">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-xl m-0 text-[#1992B0] uppercase tracking-widest font-sans font-bold">{val.name}</h3>
                  <p className="text-sm m-0 opacity-80 font-sans">
                    {val.description}
                  </p>
                </div>
              </div>
              <div className="text-white/90 text-sm font-sans bg-black/20 p-3 rounded-xl border border-black/10">
                <span className="text-[#DF9317] font-bold block mb-1">Gợi ý hành động:</span>
                {val.action || `Hãy thực hiện một hành động nhỏ dựa trên giá trị ${val.name} ngay trong tuần này.`}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.6 }}
           className="mt-4 p-8 rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#DF9317] to-[#1992B0]" />
          <h3 className="font-sans text-xl font-bold uppercase tracking-widest text-[#DF9317] mb-4 drop-shadow-sm">Hành Trình Tiếp Theo</h3>
          <p className="text-white/90 font-sans leading-relaxed mb-4 text-[15px]">
            Hành trình khám phá sự thật bên trong không bao giờ dừng lại ở một bản đồ. Những giá trị bạn vừa gọi tên chính là ngọn hải đăng soi sáng cho những lựa chọn sắp tới. 
          </p>
          <p className="text-white/90 font-sans leading-relaxed mb-6 text-[15px]">
            Đừng để những giá trị này chỉ nằm trên giấy. Hãy biến chúng thành hơi thở, thành hành động mỗi ngày. Chúng tôi đang xây dựng một trải nghiệm thực hành mới, giúp bạn từng bước hiện thực hóa những lý tưởng này vào cuộc sống thường nhật, đưa bạn đến gần hơn với phiên bản trọn vẹn nhất của chính mình.
          </p>
          <button
            onClick={() => {}} 
            className="w-full sm:w-auto bg-[#DF9317] hover:bg-[#c47e11] text-[#104E5B] font-bold py-3 px-8 rounded-xl uppercase text-sm tracking-widest transition-all hover:-translate-y-1 active:translate-y-0 shadow-lg shadow-[#DF9317]/20 flex items-center justify-center gap-2"
          >
            Chờ đón ứng dụng thực hành
          </button>
        </motion.div>
      </div>
    </div>
  );
}
