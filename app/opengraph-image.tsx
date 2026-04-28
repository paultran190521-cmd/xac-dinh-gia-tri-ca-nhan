import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Thay Đổi Tâm Thức - La Bàn Nội Tâm';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#104E5B',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at center, rgba(223, 147, 23, 0.4) 0%, rgba(16, 78, 91, 1) 70%)',
            display: 'flex',
          }}
        />

        <svg width="200" height="200" viewBox="0 0 100 100" style={{ zIndex: 10 }}>
          <circle cx="50" cy="50" r="50" fill="#104E5B" opacity="0.5" />
          <path d="M50 15 L60 40 L85 50 L60 60 L50 85 L40 60 L15 50 L40 40 Z" fill="#DF9317" />
          <circle cx="50" cy="50" r="15" fill="#104E5B" />
          <circle cx="50" cy="50" r="6" fill="#1992B0" />
        </svg>

        <h1
          style={{
            fontSize: 72,
            fontFamily: 'sans-serif',
            color: '#DF9317',
            fontWeight: 700,
            letterSpacing: '0.05em',
            margin: '40px 0 20px 0',
            textTransform: 'uppercase',
            zIndex: 10,
          }}
        >
          Thay Đổi Tâm Thức
        </h1>
        
        <p
          style={{
            fontSize: 32,
            fontFamily: 'sans-serif',
            color: '#ffffff',
            opacity: 0.9,
            margin: 0,
            zIndex: 10,
          }}
        >
          Khám Phá Giá Trị Cốt Lõi • La Bàn Dẫn Lối Nội Tâm
        </p>
      </div>
    ),
    {
      ...size,
    }
  );
}
