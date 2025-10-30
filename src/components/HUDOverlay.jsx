import React, { useEffect, useState } from 'react';
import { Wind, Zap } from 'lucide-react';

export default function HUDOverlay() {
  const [oxygen, setOxygen] = useState(82);
  const [power, setPower] = useState(64);

  // Simulate slow drift to create life-like motion
  useEffect(() => {
    const i = setInterval(() => {
      setOxygen((v) => Math.max(0, Math.min(100, v + (Math.random() * 2 - 1))));
      setPower((v) => Math.max(0, Math.min(100, v + (Math.random() * 2 - 1))));
    }, 1500);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-20 flex justify-center">
      <div className="mt-4 w-full max-w-5xl px-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <HUDBar icon={Wind} label="Oxygen" value={oxygen} color="from-cyan-400 to-blue-500" />
          <HUDBar icon={Zap} label="Power" value={power} color="from-amber-400 to-orange-500" />
        </div>
      </div>
    </div>
  );
}

function HUDBar({ icon: Icon, label, value, color }) {
  return (
    <div className="pointer-events-auto flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 p-3 backdrop-blur">
      <Icon className="text-white/80" size={18} />
      <div className="w-full">
        <div className="flex items-baseline justify-between text-xs text-white/70">
          <span>{label}</span>
          <span>{Math.round(value)}%</span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className={`h-full bg-gradient-to-r ${color}`}
            style={{ width: `${value}%`, transition: 'width 1200ms ease' }}
          />
        </div>
      </div>
    </div>
  );
}
