import { useState } from 'react';
import { motion } from 'motion/react';
import { ValueCard } from '@/lib/valuesData';

export default function LeadCapture({ onComplete, finalValues }: { onComplete: () => void, finalValues: ValueCard[] }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          topValues: finalValues,
        }),
      });

      if (response.ok) {
        onComplete();
      } else {
        const errorData = await response.json();
        console.error('Failed to submit form:', errorData.error);
        // Still proceed to show results to user even if email/sheets fail
        onComplete();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      onComplete();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 sm:p-10 min-h-[500px] w-full max-w-xl mx-auto">
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-sans text-[#DF9317] mb-4 uppercase tracking-widest font-bold drop-shadow-sm">
          Nhận Kết Quả
        </h2>
        <p className="text-white/90 font-sans leading-relaxed max-w-md mx-auto relative z-10">
          Chúc mừng bạn đã hoàn thành hành trình khám phá nội tâm! Hãy để lại thông tin để chúng tôi gửi bản tổng hợp các giá trị cốt lõi và hành động gợi ý về email cho bạn lưu trữ nhé.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5 relative z-10">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-bold uppercase tracking-widest text-[#1992B0]">Họ và tên</label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Ví dụ: Nguyễn Văn A"
            className="w-full bg-[#1992B0]/10 border border-[#1992B0]/30 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#DF9317] focus:ring-1 focus:ring-[#DF9317] transition-all font-sans"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-bold uppercase tracking-widest text-[#1992B0]">Email</label>
          <input
            type="email"
            id="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Ví dụ: email@donvi.com"
            className="w-full bg-[#1992B0]/10 border border-[#1992B0]/30 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#DF9317] focus:ring-1 focus:ring-[#DF9317] transition-all font-sans"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="text-sm font-bold uppercase tracking-widest text-[#1992B0]">Số điện thoại</label>
          <input
            type="tel"
            id="phone"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="Ví dụ: 0987654321"
            className="w-full bg-[#1992B0]/10 border border-[#1992B0]/30 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#DF9317] focus:ring-1 focus:ring-[#DF9317] transition-all font-sans"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !formData.name || !formData.email || !formData.phone}
          className="mt-6 w-full bg-[#DF9317] hover:bg-[#c47e11] text-[#104E5B] font-bold py-4 px-8 rounded-xl uppercase text-sm tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#DF9317]/20 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Đang xử lý...' : 'Xem kết quả & Gửi Mail'}
        </button>
      </form>
    </div>
  );
}
