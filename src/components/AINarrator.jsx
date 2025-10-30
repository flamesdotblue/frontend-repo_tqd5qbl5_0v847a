import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Compass } from 'lucide-react';

const LINES = [
  "You are not alone. You are the echo.",
  "Oxygen levels falling. Heart rate irregular.",
  "Follow the band where silence bends.",
  "The signal is not calling for help. It's calling you back.",
];

export default function AINarrator() {
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState('');
  const full = useMemo(() => LINES[index], [index]);
  const timerRef = useRef(null);

  useEffect(() => {
    setDisplay('');
    let i = 0;
    timerRef.current && clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      i++;
      setDisplay(full.slice(0, i));
      if (i >= full.length) {
        clearInterval(timerRef.current);
        setTimeout(() => setIndex((v) => (v + 1) % LINES.length), 2400);
      }
    }, 28);
    return () => timerRef.current && clearInterval(timerRef.current);
  }, [full]);

  return (
    <section id="narrator" className="mx-auto my-16 max-w-3xl px-6 text-white">
      <div className="rounded-2xl border border-white/10 bg-black/60 p-6 backdrop-blur">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
            <Compass size={18} />
          </div>
          <h3 className="text-lg font-medium">AI Guidance Uplink</h3>
        </div>
        <p className="min-h-[3rem] text-balance font-['Inter'] text-base leading-relaxed text-white/80">
          {display}
          <span className="ml-1 inline-block h-5 w-[2px] animate-pulse bg-white/70 align-[-2px]" />
        </p>
        <p className="mt-4 text-xs text-white/50">
          Voice patterns modeled after deep-space mission logs. Guidance is non-deterministic and may obscure intent.
        </p>
      </div>
    </section>
  );
}
