import React, { useEffect, useMemo, useState } from 'react';
import { Radio, AlertTriangle } from 'lucide-react';

export default function SignalScanner() {
  const [freq, setFreq] = useState(27);
  const [locked, setLocked] = useState(false);
  const bands = useMemo(() => 48, []);

  // Generate pseudo-random peaks that subtly change with frequency
  const data = useMemo(() => {
    const arr = [];
    for (let i = 0; i < bands; i++) {
      const base = Math.sin((i / bands) * Math.PI * 2 * (freq / 14)) * 0.5 + 0.5;
      const noise = (Math.sin(i * 12.9898 + freq * 78.233) * 43758.5453) % 1;
      const v = Math.max(0, Math.min(1, base * 0.7 + (noise - 0.5) * 0.25));
      arr.push(v);
    }
    return arr;
  }, [freq, bands]);

  // Proximity hint when signal aligns
  const matchStrength = useMemo(() => {
    const peakIndex = Math.floor((freq / 100) * bands);
    const peak = data[peakIndex] || 0;
    return Math.round(peak * 100);
  }, [data, freq, bands]);

  useEffect(() => {
    if (!locked) return;
    const t = setInterval(() => setFreq((f) => (f + 0.4) % 100), 100);
    return () => clearInterval(t);
  }, [locked]);

  return (
    <section id="signals" className="relative mx-auto my-16 max-w-6xl px-6">
      <div className="rounded-2xl border border-white/10 bg-black/60 p-6 text-white shadow-2xl backdrop-blur">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
              <Radio size={18} />
            </div>
            <div>
              <h3 className="text-lg font-medium">Signal Trace Console</h3>
              <p className="text-xs text-white/60">Sweep bands, isolate echoes, and lock to the last transmission.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs text-white/60">
            <AlertTriangle size={14} className={matchStrength > 80 ? 'text-rose-400' : 'text-white/40'} />
            <span>Match: {matchStrength}%</span>
          </div>
        </div>

        {/* Spectrum */}
        <div className="relative h-40 w-full overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent">
          <div className="absolute inset-0 grid grid-cols-12 opacity-10">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="border-r border-white/50" />
            ))}
          </div>
          <div className="absolute inset-0 flex items-end gap-[3px] p-2">
            {data.map((v, i) => (
              <div
                key={i}
                className="w-full rounded-t bg-emerald-400/80 shadow-[0_0_12px_rgba(16,185,129,0.35)]"
                style={{ height: `${6 + v * 90}%`, opacity: 0.6 + v * 0.4 }}
              />
            ))}
          </div>
          <div
            className="pointer-events-none absolute left-0 top-0 h-full border-l-2 border-emerald-300/70 shadow-[0_0_8px_rgba(110,231,183,0.6)]"
            style={{ left: `${freq}%` }}
          />
        </div>

        {/* Controls */}
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs uppercase tracking-widest text-white/60">Frequency</label>
            <input
              type="range"
              min={0}
              max={100}
              step={0.1}
              value={freq}
              onChange={(e) => setFreq(parseFloat(e.target.value))}
              className="w-full accent-emerald-400"
            />
            <div className="mt-1 text-xs text-white/50">{freq.toFixed(1)} kHz</div>
          </div>
          <div className="flex items-end justify-end gap-3">
            <button
              onClick={() => setLocked((v) => !v)}
              className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm transition ${
                locked ? 'bg-emerald-500/20 text-emerald-200 ring-1 ring-emerald-500/40' : 'bg-white/10 text-white/90 hover:bg-white/20'
              }`}
            >
              {locked ? 'Unlock Sweep' : 'Auto-Lock'}
            </button>
            <a href="#narrator" className="rounded-lg bg-white/10 px-4 py-2 text-sm hover:bg-white/20">Sync Guidance</a>
          </div>
        </div>
      </div>
    </section>
  );
}
