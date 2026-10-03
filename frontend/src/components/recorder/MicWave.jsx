import React, { useEffect, useRef } from 'react';

// Live microphone visualiser: Web Audio analyser on the real mic stream, drawn as columns of dots.
// Also writes the current voice level to --lvl on glowRef so the recording glow follows the voice.
function MicWave({ stream, recording, glowRef }) {
  const canvasRef = useRef(null);
  const recRef = useRef(recording);
  recRef.current = recording;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!stream || !canvas || stream.getAudioTracks().length === 0) return undefined;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return undefined;
    const ctx = new AC();
    if (ctx.state === 'suspended') ctx.resume().catch(() => {});
    const src = ctx.createMediaStreamSource(stream);
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 256;
    analyser.smoothingTimeConstant = 0.78;
    src.connect(analyser);
    const freq = new Uint8Array(analyser.frequencyBinCount);
    const g = canvas.getContext('2d');
    const COLS = 41;
    const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    let lvl = 0;

    const draw = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.clientWidth, h = canvas.clientHeight;
      if (canvas.width !== w * dpr) { canvas.width = w * dpr; canvas.height = h * dpr; }
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      g.clearRect(0, 0, w, h);
      analyser.getByteFrequencyData(freq);
      let sum = 0;
      for (let i = 0; i < 64; i++) sum += freq[i];
      const target = Math.min(1, sum / 64 / 150);
      lvl += (target - lvl) * 0.25;
      if (glowRef && glowRef.current) glowRef.current.style.setProperty('--lvl', lvl.toFixed(3));
      const gap = w / COLS, mid = h / 2, step = 6;
      for (let c = 0; c < COLS; c++) {
        const d = Math.abs(c - (COLS - 1) / 2) / ((COLS - 1) / 2);
        const bin = Math.floor(2 + (1 - d) * 40);
        let v = freq[bin] / 255;
        v = Math.pow(v, 1.4) * (0.55 + 0.45 * (1 - d));
        const half = Math.max(0, v * (h / 2 - 3));
        const x = gap * c + gap / 2;
        for (let y = 0; y <= half; y += step) {
          const a = 1 - y / (h / 2);
          g.globalAlpha = Math.max(0.15, a);
          g.fillStyle = '#fff';
          g.beginPath(); g.arc(x, mid - y, 1.7, 0, 6.2832); g.fill();
          if (y > 0) { g.beginPath(); g.arc(x, mid + y, 1.7, 0, 6.2832); g.fill(); }
        }
        g.globalAlpha = 0.28;
        g.beginPath(); g.arc(x, mid, 1.2, 0, 6.2832); g.fill();
      }
      g.globalAlpha = 1;
      if (!reduce || recRef.current) raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      try { src.disconnect(); } catch (e) { /* noop */ }
      ctx.close().catch(() => {});
      if (glowRef && glowRef.current) glowRef.current.style.setProperty('--lvl', '0');
    };
  }, [stream, glowRef]);

  return (
    <div className="mic-wave" aria-label="Live microphone level">
      <span className="mic-wave-tag"><i className={recording ? 'live' : ''} />{recording ? 'Listening to you' : 'Mic ready'}</span>
      <canvas ref={canvasRef} className="mic-wave-canvas" />
    </div>
  );
}

export default MicWave;
