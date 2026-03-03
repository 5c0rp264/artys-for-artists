'use client';

import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StatCardProps {
  number: string;
  label: string;
  delay?: number;
  targetNumber?: number;
  prefix?: string;
  suffix?: string;
}

export default function StatCard({ number, label, delay = 0, targetNumber, prefix = '', suffix = '' }: StatCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLDivElement>(null);
  const [displayed, setDisplayed] = useState(number);

  useGSAP(() => {
    if (!cardRef.current) return;

    // Count-up animation
    if (targetNumber !== undefined && numRef.current) {
      const obj = { val: 0 };
      ScrollTrigger.create({
        trigger: cardRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            val: targetNumber,
            duration: 2,
            delay: delay * 0.1,
            ease: 'power2.out',
            onUpdate: () => {
              setDisplayed(`${prefix}${Math.round(obj.val).toLocaleString('fr-FR')}${suffix}`);
            }
          });
        }
      });
    }

    // Fade-in card
    gsap.fromTo(cardRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: delay * 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
          once: true,
        }
      }
    );
  }, { scope: cardRef });

  return (
    <div ref={cardRef} className="stat-card" style={{ opacity: 0 }}>
      <div
        ref={numRef}
        style={{
          fontFamily: 'var(--font-title)',
          fontWeight: 900,
          fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
          letterSpacing: '-0.04em',
          color: 'var(--accent)',
          lineHeight: 1,
          marginBottom: '6px',
          textTransform: 'uppercase'
        }}
      >
        {targetNumber !== undefined ? displayed : number}
      </div>
      <div style={{
        fontSize: '0.82rem',
        color: 'var(--text-secondary)',
        lineHeight: 1.5,
        fontFamily: 'var(--font-body)',
        whiteSpace: 'pre-line'
      }}>
        {label}
      </div>
    </div>
  );
}
