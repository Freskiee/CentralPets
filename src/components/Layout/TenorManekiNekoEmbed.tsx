import React, { useEffect } from 'react';

interface TenorManekiNekoEmbedProps {
  size?: number; // ancho en píxeles
}

export const TenorManekiNekoEmbed: React.FC<TenorManekiNekoEmbedProps> = ({ size = 100 }) => {
  const embedRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Cargar el script solo una vez
    if (!document.querySelector('script[src="https://tenor.com/embed.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://tenor.com/embed.js';
      script.async = true;
      document.body.appendChild(script);
      script.onload = () => {
        // Forzar inicialización después de cargar el script
        // @ts-ignore
        if (window.Tenor && typeof window.Tenor.init === 'function') {
          // @ts-ignore
          window.Tenor.init();
        }
      };
    } else {
      // Si el script ya existe, forzar el render
      setTimeout(() => {
        // @ts-ignore
        if (window.Tenor && typeof window.Tenor.init === 'function') {
          // @ts-ignore
          window.Tenor.init();
        }
      }, 100);
    }
  }, [size]);

  return (
    <div
      key={size}
      ref={embedRef}
      className="tenor-gif-embed"
      data-postid="10560285"
      data-share-method="host"
      data-aspect-ratio="1"
      data-width={size}
      style={{ width: size, margin: '0 auto', marginBottom: 8 }}
    >
      <a href="https://tenor.com/view/fortune-cat-luck-%E6%8B%9B%E8%B4%A2%E7%8C%AB-gif-10560285" target="_blank" rel="noopener noreferrer">
        Fortune Cat Luck GIF
      </a>
      from{' '}
      <a href="https://tenor.com/search/fortune+cat-gifs" target="_blank" rel="noopener noreferrer">
        Fortune Cat GIFs
      </a>
    </div>
  );
};

export default TenorManekiNekoEmbed;
