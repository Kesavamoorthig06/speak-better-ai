import React, { useEffect, useRef } from 'react';

/**
 * DottedOrb - the reel's "thinking orb": a slowly rotating sphere of dots drawn on a <canvas>.
 * Pure canvas 2D, no dependencies. Honors prefers-reduced-motion (draws one still frame).
 *
 * Props:
 *   size  - pixel width/height (default 48)
 *   speed - rotation speed multiplier (default 1)
 *   glow  - optional CSS color for a soft glow behind the dots (e.g. the accent)
 */
const DOT_COUNT = 140;

// Fibonacci sphere: evenly spread points on a unit sphere (computed once).
const SPHERE_POINTS = Array.from({ length: DOT_COUNT }, (_, i) => {
  const y = 1 - (i / (DOT_COUNT - 1)) * 2;
  const r = Math.sqrt(1 - y * y);
  const t = i * 2.399963;
  return [Math.cos(t) * r, y, Math.sin(t) * r];
});

function drawOrb(ctx, size, dpr, time, speed, phase, still) {
  const px = size * dpr;
  ctx.clearRect(0, 0, px, px);
  const yaw = still ? 0.6 : (time / 4200) * speed;
  const tilt = 0.35;
  const [cy, sy, ct, st] = [Math.cos(yaw), Math.sin(yaw), Math.cos(tilt), Math.sin(tilt)];
  const breathe = still ? 1 : 1 + 0.05 * Math.sin(time / 700 + phase);
  const dotScale = size > 40 ? size / 56 + 0.4 : 1;
  ctx.fillStyle = '#fff';
  for (const [x, y, z] of SPHERE_POINTS) {
    const rx = x * cy + z * sy;
    const rz = -x * sy + z * cy;
    const ry = y * ct - rz * st;
    const depth = (y * st + rz * ct + 1) / 2; // 0 = back, 1 = front
    ctx.globalAlpha = 0.25 + depth * 0.75;
    ctx.beginPath();
    ctx.arc(px / 2 + rx * px * 0.46 * breathe, px / 2 + ry * px * 0.46 * breathe, (0.4 + depth * 1.1) * dpr * dotScale, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

function DottedOrb({ size = 48, speed = 1, glow, className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const still = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const phase = Math.random() * 6;
    canvas.width = canvas.height = size * dpr;
    let raf = 0;
    const tick = (t) => {
      drawOrb(ctx, size, dpr, t, speed, phase, still);
      if (!still) raf = requestAnimationFrame(tick);
    };
    tick(0);
    return () => cancelAnimationFrame(raf);
  }, [size, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`dotted-orb ${className}`}
      style={{ width: size, height: size, filter: glow ? `drop-shadow(0 0 ${size / 6}px ${glow})` : undefined }}
      aria-hidden="true"
    />
  );
}

export default DottedOrb;
