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

export const metadata: Metadata = {
  title: 'Thay Đổi Tâm Thức | La Bàn Nội Tâm',
  description: 'Ứng dụng tham vấn tâm lý dựa trên liệu pháp ACT, giúp bạn khám phá và xác định những giá trị cốt lõi nhất của bản thân để thay đổi tâm thức.',
  keywords: ['thay đổi tâm thức', 'la bàn nội tâm', 'tâm lý học', 'chữa lành', 'mindfulness', 'giá trị cốt lõi', 'phát triển bản thân'],
  icons: {
    icon: '/icon.svg',
  },
  openGraph: {
    title: 'Thay Đổi Tâm Thức | La Bàn Nội Tâm',
    description: 'Ứng dụng tham vấn tâm lý giúp bạn khám phá và xác định những giá trị cốt lõi nhất của bản thân để thay đổi tâm thức.',
    type: 'website',
    url: 'https://thaydoitamthuc.com',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: 'Thay Đổi Tâm Thức | La Bàn Nội Tâm',
    description: 'Ứng dụng đánh giá và tham vấn tâm lý trực tuyến dựa trên liệu pháp Chấp nhận và Cam kết (ACT), giúp người dùng tìm ra giá trị cốt lõi.',
    url: 'https://thaydoitamthuc.com',
    about: {
      '@type': 'MedicalCondition',
      name: 'Khám phá giá trị sống'
    },
    specialty: 'Psychiatry'
  };

  return (
    <html lang="vi" className={`${beVietnamPro.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
            className="absolute w-[800px] h-[800px] lg:w-[1200px] lg:h-[1200px] lg:scale-[1.2] opacity-30 animate-[spin_180s_linear_infinite]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%23DF9317' fill='none'%3E%3Ccircle cx='100' cy='100' r='98' stroke-width='0.15'/%3E%3Ccircle cx='100' cy='100' r='85' stroke-width='0.3' stroke-dasharray='1, 4'/%3E%3Ccircle cx='100' cy='100' r='60' stroke-width='0.15'/%3E%3Ccircle cx='100' cy='100' r='30' stroke-width='0.2'/%3E%3C!-- Petals --%3E%3Cpath d='M100 2 Q 120 50 100 100 Q 80 50 100 2 Z' stroke-width='0.2' fill='rgba(223,147,23,0.02)'/%3E%3Cpath d='M100 198 Q 120 150 100 100 Q 80 150 100 198 Z' stroke-width='0.2' fill='rgba(223,147,23,0.02)'/%3E%3Cpath d='M2 100 Q 50 120 100 100 Q 50 80 2 100 Z' stroke-width='0.2' fill='rgba(223,147,23,0.02)'/%3E%3Cpath d='M198 100 Q 150 120 100 100 Q 150 80 198 100 Z' stroke-width='0.2' fill='rgba(223,147,23,0.02)'/%3E%3Cpath d='M30 30 Q 60 50 100 100 Q 50 60 30 30 Z' stroke-width='0.15'/%3E%3Cpath d='M170 170 Q 140 150 100 100 Q 150 140 170 170 Z' stroke-width='0.15'/%3E%3Cpath d='M30 170 Q 60 150 100 100 Q 50 140 30 170 Z' stroke-width='0.15'/%3E%3Cpath d='M170 30 Q 140 50 100 100 Q 150 60 170 30 Z' stroke-width='0.15'/%3E%3C!-- Rings --%3E%3Ccircle cx='100' cy='100' r='10' stroke-width='0.5'/%3E%3Ccircle cx='100' cy='100' r='3' fill='%23DF9317'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '100% 100%',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
        </div>
        <main className="relative z-10 w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
