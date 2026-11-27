import {useEffect, useRef, type ReactNode} from 'react';
import styles from './styles.module.css';

/** The category colors of PostPin's markers */
const COLORS = ['#f5b92f', '#e8559a', '#8a63d2', '#31b86a', '#3d7fff', '#ef4444'];
const GRAVITY = 200; // px/s², low: slow, floating arcs
const BOUNCE = 0.55; // share of the speed kept on landing

type Marker = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  angle: number;
  spin: number;
  /** 0..1, how squashed it is right after landing */
  squash: number;
};

/**
 * Markers in category colors that hop around the screen in slow, soft arcs, like in low
 * gravity, so they calm rather than distract. Fixed behind the page; purely decoration. With
 * reduced motion they stand still.
 */
export default function BouncingMarkers(): ReactNode {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const random = (min: number, max: number) => min + Math.random() * (max - min);

    let width = 0;
    let height = 0;
    let markers: Marker[] = [];

    /** Spreads the markers over the width, one per slot, so no side stays empty */
    const place = () => {
      const count = width < 640 ? 20 : 40;
      markers = Array.from({length: count}, (_, i) => {
        const size = random(14, 34);
        return {
          x: Math.min(Math.max(((i + random(0.2, 0.8)) / count) * width, size), width - size),
          y: random(size, height * 0.6),
          vx: random(-35, 35),
          vy: random(-120, 0),
          size,
          color: COLORS[i % COLORS.length]!,
          angle: reducedMotion ? random(-0.4, 0.4) : 0,
          spin: random(-0.5, 0.5),
          squash: 0,
        };
      });
    };

    // The canvas may have no size yet on the first frame, so the markers are placed once it has one
    const resize = () => {
      const before = width;
      const dpr = devicePixelRatio || 1;
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!width || !height) return;
      if (!markers.length || !before) {
        place();
        return;
      }
      // keep each one where it was relative to the width
      for (const m of markers) {
        m.x = Math.min(Math.max((m.x / before) * width, m.size / 2), width - m.size / 2);
        m.y = Math.min(m.y, height - m.size / 2);
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const m of markers) {
        const r = m.size / 2;
        ctx.save();
        // squash from the bottom, where it touched the floor
        ctx.translate(m.x, m.y + r);
        ctx.scale(1 + m.squash * 0.12, 1 - m.squash * 0.12);
        ctx.translate(0, -r);
        ctx.rotate(m.angle);
        ctx.globalAlpha = 0.35;
        ctx.fillStyle = m.color;
        ctx.beginPath();
        ctx.moveTo(0, -r);
        ctx.lineTo(r, 0);
        ctx.lineTo(0, r);
        ctx.lineTo(-r, 0);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
    };

    const step = (dt: number) => {
      for (const m of markers) {
        const r = m.size / 2;
        m.vy += GRAVITY * dt;
        m.x += m.vx * dt;
        m.y += m.vy * dt;
        m.angle += m.spin * dt;
        m.squash = Math.max(0, m.squash - dt * 2);

        if (m.x < r) {
          m.x = r;
          m.vx = Math.abs(m.vx);
        } else if (m.x > width - r) {
          m.x = width - r;
          m.vx = -Math.abs(m.vx);
        }
        if (m.y > height - r) {
          m.y = height - r;
          m.squash = Math.min(1, Math.abs(m.vy) / 350);
          m.vy = -Math.abs(m.vy) * BOUNCE;
          m.spin = random(-0.5, 0.5);
          // almost at rest: drift up again, in a long, slow arc
          if (Math.abs(m.vy) < 60) {
            m.vy = -random(180, 340);
            m.vx = random(-40, 40);
          }
        }
      }
    };

    resize();
    const observer = new ResizeObserver(() => {
      resize();
      if (reducedMotion) draw();
    });
    observer.observe(canvas);

    if (reducedMotion) {
      draw();
      return () => observer.disconnect();
    }

    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      // capped, so a tab coming back from the background doesn't fling them away
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;
      step(dt);
      draw();
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return <canvas ref={ref} className={styles.canvas} aria-hidden="true" />;
}
