import React, { useEffect, useRef, useState } from 'react';

interface TenorGifEmbedProps {
  postid: string;
  width?: number; // ancho máximo en px
}

export const TenorGifEmbed: React.FC<TenorGifEmbedProps> = ({ postid, width }) => {
  const [embedWidth, setEmbedWidth] = useState(width || 180);
  const embedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWidth = () => {
      const w = window.innerWidth;
      if (w < 640) setEmbedWidth(100);
      else if (w < 1024) setEmbedWidth(140);
      else setEmbedWidth(180);
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  useEffect(() => {
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
      setTimeout(() => {
        // @ts-ignore
        if (window.Tenor && typeof window.Tenor.init === 'function') {
          // @ts-ignore
          window.Tenor.init();
        }
      }, 100);
    }
  }, [embedWidth, postid]);

  return (
    <div
      ref={embedRef}
      className="tenor-gif-embed mx-auto mb-2 md:mb-4"
      data-postid={postid}
      data-share-method="host"
      data-aspect-ratio="1"
      data-width={embedWidth}
      style={{ maxWidth: embedWidth, marginLeft: 'auto', marginRight: 'auto' }}
    >
      <a href={`https://tenor.com/view/xd-gif-${postid}`}>Xd GIF</a> from <a href="https://tenor.com/search/xd-gifs">Xd GIFs</a>
    </div>
  );
};
