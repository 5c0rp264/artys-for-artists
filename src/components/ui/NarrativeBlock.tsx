import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

interface NarrativeBlockProps {
  text: string;
  className?: string;
}

export default function NarrativeBlock({ text, className = '' }: NarrativeBlockProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const words = text.split(' ');

  useGSAP(() => {
    if (!containerRef.current) return;
    const wordEls = containerRef.current.querySelectorAll('.reveal-word');

    gsap.fromTo(
      wordEls,
      { color: '#4b5563' },
      {
        color: 'var(--text)',
        duration: 0.05,
        stagger: 0.05,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'bottom 40%',
          scrub: 1,
        }
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={`narrative-text ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="reveal-word" style={{ marginRight: '0.3em' }}>
          {word}
        </span>
      ))}
    </div>
  );
}
