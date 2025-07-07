import React, { useEffect, useState } from 'react';

export const ManekiNekoTenorEmbed: React.FC = () => {
  const [width, setWidth] = useState(180);
  const embedRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWidth = () => {
      const w = window.innerWidth;
      if (w < 640) setWidth(100); // móvil
      else if (w < 1024) setWidth(140); // tablet
      else setWidth(180); // desktop
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  useEffect(() => {
    // Cargar el script de Tenor solo una vez
    if (!document.querySelector('script[src="https://tenor.com/embed.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://tenor.com/embed.js';
      script.async = true;
      document.body.appendChild(script);
      script.onload = () => {
        // @ts-ignore
        if (window.Tenor && typeof window.Tenor.init === 'function') {
          // @ts-ignore
          window.Tenor.init();
        }
      };
    } else {
      // Si el script ya existe, forzar el render tras un pequeño delay
      setTimeout(() => {
        // @ts-ignore
        if (window.Tenor && typeof window.Tenor.init === 'function') {
          // @ts-ignore
          window.Tenor.init();
        }
      }, 100);
    }
  }, [width]);

  return (
    <div
      ref={embedRef}
      className="tenor-gif-embed mx-auto mb-2 md:mb-4"
      data-postid="10560285"
      data-share-method="host"
      data-aspect-ratio="1"
      data-width={width}
      style={{ maxWidth: width, marginLeft: 'auto', marginRight: 'auto' }}
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
}

