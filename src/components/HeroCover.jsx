import React from 'react';
import Spline from '@splinetool/react-spline';
import { Play, Compass } from 'lucide-react';

export default function HeroCover() {
  return (
    <section id="hero" className="relative h-[90vh] w-full overflow-hidden bg-black">
      {/* 3D Scene */}
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/5iNiBKPngFKgC6zA/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Gradient overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/90" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-start justify-center px-6 text-white">
        <h1 className="font-['IBM_Plex_Sans'] text-5xl font-semibold tracking-tight md:text-7xl">
          The Last Signal
        </h1>
        <p className="mt-4 max-w-2xl text-base text-white/80 md:text-lg">
          A 3D atmospheric survival experience aboard a derelict station. Low gravity, fading oxygen, and a voice that guides you toward a signal that should not exist.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#signals"
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm backdrop-blur transition hover:bg-white/20"
          >
            <Play size={16} /> Begin Trace
          </a>
          <a
            href="#narrator"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm text-white/90 transition hover:border-white/40"
          >
            <Compass size={16} /> AI Guidance
          </a>
        </div>
      </div>
    </section>
  );
}
