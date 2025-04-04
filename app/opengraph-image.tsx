import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Alyosha - Service de messagerie anonyme et sécurisé';
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
          background: 'linear-gradient(to bottom, #0F0F11, #1E1E24)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Arial',
          color: 'white',
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontWeight: 'bold',
            background: 'linear-gradient(to right, #9F7AEA, #7F5AF0)',
            backgroundClip: 'text',
            color: 'transparent',
            marginBottom: 20,
          }}
        >
          Alyosha
        </div>
        <div
          style={{
            fontSize: 36,
            color: '#D1D5DB',
            maxWidth: '80%',
            textAlign: 'center',
          }}
        >
          Service de messagerie anonyme et sécurisé
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
} 