import React from 'react';
import HeroCover from './components/HeroCover';
import HUDOverlay from './components/HUDOverlay';
import SignalScanner from './components/SignalScanner';
import AINarrator from './components/AINarrator';

export default function App() {
  return (
    <div className="min-h-screen w-full bg-black text-white">
      <HUDOverlay />
      <HeroCover />

      {/* About / Tone */}
      <section className="mx-auto mt-10 max-w-5xl px-6">
        <h2 className="text-xl font-semibold tracking-tight">Drift the corridors. Unravel the echo.</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/70">
          Explore a dark, abandoned station with low gravity and unsettling ambience. Manage oxygen and power while solving environmental puzzles that rewire pathways and awaken dormant systems. Track mysterious radio signals across the station to uncover a psychological twist worthy of deep-space mysteries.
        </p>
      </section>

      <SignalScanner />
      <AINarrator />

      {/* Footer */}
      <footer className="mx-auto my-16 max-w-6xl px-6 text-xs text-white/50">
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          Visuals embrace sleek metallic forms and realistic lighting. Sound design emphasizes isolation, distant echoes, and the hum of failing systems.
        </div>
        <div className="mt-6 flex items-center justify-between">
          <span>The Last Signal — Atmospheric Survival</span>
          <a href="#hero" className="rounded bg-white/10 px-3 py-1 hover:bg-white/20">Back to top</a>
        </div>
      </footer>
    </div>
  );
}
