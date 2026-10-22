import { useState, useRef, useEffect } from 'react';
import { cn } from '../../utils/cn';

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAmbientSound();
    };
  }, []);

  const startAmbientSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      // Smooth fade in
      masterGain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 1.5);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Soft ambient harmonic drone chord (E minor / space ambient: E2, B2, G3, D4)
      const frequencies = [82.41, 123.47, 196.00, 293.66];
      oscillatorsRef.current = frequencies.map((freq, i) => {
        const osc = ctx.createOscillator();
        osc.type = i % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Subtle slow frequency vibrato for space-lofi atmosphere
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(0.2 + i * 0.05, ctx.currentTime);
        lfoGain.gain.setValueAtTime(1.5, ctx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start();

        const oscGain = ctx.createGain();
        oscGain.gain.setValueAtTime(0.25, ctx.currentTime);
        osc.connect(oscGain);
        oscGain.connect(masterGain);
        osc.start();
        return osc;
      });

      setIsPlaying(true);
    } catch {
      // AudioContext fallback
      setIsPlaying(false);
    }
  };

  const stopAmbientSound = () => {
    if (gainNodeRef.current && audioCtxRef.current) {
      try {
        const ctx = audioCtxRef.current;
        gainNodeRef.current.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
        setTimeout(() => {
          oscillatorsRef.current.forEach((osc) => {
            try {
              osc.stop();
              osc.disconnect();
            } catch {}
          });
          oscillatorsRef.current = [];
          if (ctx.state !== 'closed') {
            ctx.close();
          }
        }, 500);
      } catch {}
    }
    setIsPlaying(false);
  };

  const toggleSound = () => {
    if (isPlaying) {
      stopAmbientSound();
    } else {
      startAmbientSound();
    }
  };

  return (
    <button
      onClick={toggleSound}
      className={cn(
        'group flex items-center gap-2 px-2.5 py-1.5 border transition-all text-xs font-mono uppercase tracking-wider select-none',
        isPlaying
          ? 'border-white bg-white text-black'
          : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:border-neutral-600 hover:text-white'
      )}
      title={isPlaying ? 'Click to pause ambient sound' : 'Click to play ambient lo-fi sound'}
      aria-label="Ambient sound player"
    >
      {/* 3-Bar Equalizer Waveform */}
      <div className="flex items-end gap-[3px] h-3 w-3">
        <span
          className={cn(
            'w-[2px] transition-all duration-300',
            isPlaying ? 'bg-black animate-pulse h-3' : 'bg-neutral-500 h-1'
          )}
        />
        <span
          className={cn(
            'w-[2px] transition-all duration-300',
            isPlaying ? 'bg-black animate-pulse delay-75 h-2' : 'bg-neutral-500 h-2'
          )}
        />
        <span
          className={cn(
            'w-[2px] transition-all duration-300',
            isPlaying ? 'bg-black animate-pulse delay-150 h-3' : 'bg-neutral-500 h-1.5'
          )}
        />
      </div>

      <span className="text-[10px] font-semibold tracking-widest">
        {isPlaying ? 'AUDIO ON' : 'LO-FI AMBIENT'}
      </span>
    </button>
  );
}
