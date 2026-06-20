"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

// ─── Your personal tagline ────────────────────────────────────────────────
const TAGLINE =
  "Full‑Stack Developer • Building production‑ready apps with Next.js, Node.js & TypeScript • From Dhaka to the world • ";

// ─── SVG viewbox ──────────────────────────────────────────────────────────
const VIEW_W = 1048;
const VIEW_H = 594;

// ─── Curve points (kept from original, but you can tweak) ──────────────
type Point = { x: number; y: number };
type Cubic = { p0: Point; p1: Point; p2: Point; p3: Point };
type Segment = { c1: Point; c2: Point; end: Point };
type PathState = { start: Point; segments: Segment[] };

const round = (n: number) => Math.round(n * 1000) / 1000;
const rp = (p: Point): Point => ({ x: round(p.x), y: round(p.y) });
const lerp = (a: Point, b: Point, t: number): Point => ({
  x: a.x + (b.x - a.x) * t,
  y: a.y + (b.y - a.y) * t,
});

// The original curve (as cubic Béziers) – feel free to change the shape!
const ORIGINAL_SEGMENTS: Cubic[] = [
  {
    p0: { x: 0.597656, y: 50.924805 },
    p1: { x: 17.4612, y: 143.2965 },
    p2: { x: 97.8522, y: 293.141 },
    p3: { x: 284.508, y: 353.548 },
  },
  {
    p0: { x: 284.508, y: 353.548 },
    p1: { x: 440.828, y: 399.056 },
    p2: { x: 583.839, y: 294.067 },
    p3: { x: 500.618, y: 184.7492 },
  },
  {
    p0: { x: 500.618, y: 184.7492 },
    p1: { x: 417.397, y: 75.4309 },
    p2: { x: 238.217, y: 282.098 },
    p3: { x: 499.258, y: 441.668 },
  },
  {
    p0: { x: 499.258, y: 441.668 },
    p1: { x: 551.913, y: 477.802 },
    p2: { x: 817.468, y: 561.26 },
    p3: { x: 1046.43, y: 565.235 },
  },
];

const SPLITS_PER_SEGMENT = 2;

function splitCubic(b: Cubic, t: number): { left: Cubic; right: Cubic } {
  const a1 = lerp(b.p0, b.p1, t);
  const a2 = lerp(b.p1, b.p2, t);
  const a3 = lerp(b.p2, b.p3, t);
  const b1 = lerp(a1, a2, t);
  const b2 = lerp(a2, a3, t);
  const mid = lerp(b1, b2, t);
  return {
    left: { p0: b.p0, p1: a1, p2: b1, p3: mid },
    right: { p0: mid, p1: b2, p2: a3, p3: b.p3 },
  };
}

function subCubic(b: Cubic, t0: number, t1: number): Cubic {
  const right = splitCubic(b, t0).right;
  const t = (t1 - t0) / (1 - t0);
  return splitCubic(right, t).left;
}

const DEFAULT_PATH: PathState = {
  start: rp(ORIGINAL_SEGMENTS[0].p0),
  segments: ORIGINAL_SEGMENTS.flatMap((cubic) => {
    const segs: Segment[] = [];
    for (let i = 0; i < SPLITS_PER_SEGMENT; i++) {
      const sub = subCubic(
        cubic,
        i / SPLITS_PER_SEGMENT,
        (i + 1) / SPLITS_PER_SEGMENT,
      );
      segs.push({ c1: rp(sub.p1), c2: rp(sub.p2), end: rp(sub.p3) });
    }
    return segs;
  }),
};

// ─── Handle types for the editor ────────────────────────────────────────
type HandleId =
  | { type: "start" }
  | { type: "c1"; seg: number }
  | { type: "c2"; seg: number }
  | { type: "end"; seg: number };

const handleKey = (id: HandleId) =>
  id.type === "start" ? "start" : `${id.type}-${id.seg}`;

function getPoint(state: PathState, id: HandleId): Point {
  if (id.type === "start") return state.start;
  return state.segments[id.seg][id.type];
}

function setPoint(state: PathState, id: HandleId, p: Point): PathState {
  if (id.type === "start") return { ...state, start: p };
  return {
    ...state,
    segments: state.segments.map((seg, i) =>
      i === id.seg ? { ...seg, [id.type]: p } : seg,
    ),
  };
}

const shift = (p: Point, dx: number, dy: number): Point => ({
  x: p.x + dx,
  y: p.y + dy,
});

function moveAnchor(state: PathState, id: HandleId, p: Point): PathState {
  const old = getPoint(state, id);
  const dx = p.x - old.x;
  const dy = p.y - old.y;
  let next = setPoint(state, id, p);
  if (id.type === "start") {
    next = setPoint(
      next,
      { type: "c1", seg: 0 },
      shift(state.segments[0].c1, dx, dy),
    );
  } else if (id.type === "end") {
    const i = id.seg;
    next = setPoint(
      next,
      { type: "c2", seg: i },
      shift(state.segments[i].c2, dx, dy),
    );
    if (i < state.segments.length - 1) {
      next = setPoint(
        next,
        { type: "c1", seg: i + 1 },
        shift(state.segments[i + 1].c1, dx, dy),
      );
    }
  }
  return next;
}

function toPathD({ start, segments }: PathState): string {
  let d = `M${round(start.x)} ${round(start.y)}`;
  for (const s of segments) {
    d += `C${round(s.c1.x)} ${round(s.c1.y)} ${round(s.c2.x)} ${round(s.c2.y)} ${round(s.end.x)} ${round(s.end.y)}`;
  }
  return d;
}

function clientToSvg(
  svg: SVGSVGElement,
  clientX: number,
  clientY: number,
): Point {
  const ctm = svg.getScreenCTM();
  if (ctm) {
    const local = new DOMPoint(clientX, clientY).matrixTransform(ctm.inverse());
    return { x: local.x, y: local.y };
  }
  const r = svg.getBoundingClientRect();
  return {
    x: ((clientX - r.left) / r.width) * VIEW_W,
    y: ((clientY - r.top) / r.height) * VIEW_H,
  };
}

// ─── Component props ──────────────────────────────────────────────────────
export interface HeroProps {
  speed?: number;          // lower = faster (25 default)
  fontSize?: number;
  textOpacity?: number;
  textColor?: string;
  strokeColor?: string;    // color of the curve line
}

export const RollingText = ({
  speed = 28,              // slightly slower for readability
  fontSize = 16,           // a bit larger
  textOpacity = 0.35,
  textColor = "#1A1A1A",
  strokeColor = "#6366f1", // indigo – to match your brand
}: HeroProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const draggingRef = useRef<HandleId | null>(null);
  const [editing, setEditing] = useState(false); // 👈 set to true if you want the editor visible
  const [path, setPath] = useState<PathState>(DEFAULT_PATH);

  const d = useMemo(() => toPathD(path), [path]);

  // ─── We'll hide the editor by default ──────────────────────────────
  const showEditor = false; // set to true to enable editing

  const anchors = useMemo<HandleId[]>(
    () => [
      { type: "start" },
      ...path.segments.map((_, i) => ({ type: "end", seg: i }) as HandleId),
    ],
    [path.segments],
  );

  const controlPoints = useMemo<HandleId[]>(
    () =>
      path.segments.flatMap(
        (_, i) =>
          [
            { type: "c1", seg: i },
            { type: "c2", seg: i },
          ] as HandleId[],
      ),
    [path.segments],
  );

  const guides = useMemo(
    () =>
      path.segments.flatMap((s, i) => {
        const prevAnchor = i === 0 ? path.start : path.segments[i - 1].end;
        return [
          { a: prevAnchor, b: s.c1 },
          { a: s.end, b: s.c2 },
        ];
      }),
    [path],
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<SVGCircleElement>, id: HandleId) => {
      e.preventDefault();
      e.stopPropagation();
      e.currentTarget.setPointerCapture(e.pointerId);
      draggingRef.current = id;
    },
    [],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<SVGCircleElement>) => {
      const id = draggingRef.current;
      if (!id || !svgRef.current) return;
      const p = clientToSvg(svgRef.current, e.clientX, e.clientY);
      setPath((prev) =>
        id.type === "c1" || id.type === "c2"
          ? setPoint(prev, id, p)
          : moveAnchor(prev, id, p),
      );
    },
    [],
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<SVGCircleElement>) => {
      draggingRef.current = null;
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {}
    },
    [],
  );

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-white px-2 py-8">
      <div className="mx-auto flex w-full items-center justify-center">
        <svg
          ref={svgRef}
          id="hero-svg"
          className="h-full w-full"
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block", touchAction: editing ? "none" : "auto" }}
        >
          {/* The curve path (invisible but used for textPath) */}
          <path
            id="first-curve"
            fill="transparent"
            stroke={strokeColor}
            strokeWidth={2}
            d={d}
          />

          {/* Animated text along the curve */}
          <text x="0" style={{ fontSize }}>
            <textPath
              id="marquee-text-first"
              href="#first-curve"
              className="font-normal [baseline-shift:-20%]"
              style={{ fill: textColor, opacity: textOpacity }}
            >
              {TAGLINE}
            </textPath>
            <animate
              id="marquee-anim-first"
              attributeName="x"
              dur={`${65 - speed}s`}
              values="-2000;0"
              repeatCount="indefinite"
            />
          </text>

          {/* ─── Editor overlay (hidden by default) ────────────────── */}
          {showEditor && editing && (
            <g>
              <path
                d={d}
                fill="none"
                stroke="#0ea5e9"
                strokeWidth={1.5}
                strokeDasharray="3 5"
                strokeOpacity={0.6}
                style={{ pointerEvents: "none" }}
              />

              {guides.map((g, i) => (
                <line
                  key={`guide-${i}`}
                  x1={g.a.x}
                  y1={g.a.y}
                  x2={g.b.x}
                  y2={g.b.y}
                  stroke="#0ea5e9"
                  strokeWidth={1}
                  strokeDasharray="3 4"
                  strokeOpacity={0.5}
                  style={{ pointerEvents: "none" }}
                />
              ))}

              {controlPoints.map((id) => {
                const p = getPoint(path, id);
                return (
                  <circle
                    key={handleKey(id)}
                    cx={p.x}
                    cy={p.y}
                    r={3}
                    fill="#ffffff"
                    stroke="#0ea5e9"
                    strokeWidth={1.5}
                    style={{ cursor: "grab", touchAction: "none" }}
                    onPointerDown={(e) => handlePointerDown(e, id)}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                  />
                );
              })}

              {anchors.map((id) => {
                const p = getPoint(path, id);
                return (
                  <circle
                    key={handleKey(id)}
                    cx={p.x}
                    cy={p.y}
                    r={3.5}
                    fill="#0ea5e9"
                    stroke="#ffffff"
                    strokeWidth={1}
                    style={{ cursor: "grab", touchAction: "none" }}
                    onPointerDown={(e) => handlePointerDown(e, id)}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                  />
                );
              })}
            </g>
          )}
        </svg>
      </div>

      {/* ─── Optional CTA below the hero ───────────────────────────── */}
      <div className="mt-4 text-center">
        <a
          href="#projects"
          className="inline-block rounded-full bg-indigo-600 px-6 py-3 text-sm font-medium text-white shadow-md transition hover:bg-indigo-700"
        >
          Explore My Work
        </a>
      </div>

      {/* ─── Editor toggle (hidden) ────────────────────────────────── */}
      {showEditor && (
        <AnimatePresence mode="popLayout" initial={false}>
          {editing ? (
            <motion.button
              key="done"
              layoutId="edit-toggle"
              type="button"
              onClick={() => setEditing(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                layout: { type: "spring", bounce: 0, duration: 0.35 },
              }}
              className="absolute inset-x-0 top-4 mx-auto w-fit rounded-full bg-sky-500 px-5 py-2 text-sm font-medium text-white shadow-sm ring-1 ring-sky-500/10 transition-colors hover:bg-sky-600"
            >
              <motion.p
                initial={{ opacity: 0, filter: "blur(4px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                layoutId="edit-toggle-text"
                transition={{
                  layout: { type: "spring", bounce: 0, duration: 0.2 },
                }}
              >
                Done editing
              </motion.p>
            </motion.button>
          ) : (
            <motion.button
              key="edit"
              layoutId="edit-toggle"
              type="button"
              onClick={() => setEditing(true)}
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0 }}
              transition={{
                layout: { type: "spring", bounce: 0, duration: 0.2 },
              }}
              className="absolute inset-x-0 top-4 mx-auto w-fit rounded-full bg-white px-5 py-2 text-sm font-medium text-neutral-700 shadow-sm ring-1 shadow-black/10 ring-black/10 transition-colors hover:bg-neutral-50"
            >
              <motion.p
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                layoutId="edit-toggle-text"
                transition={{
                  duration: 0.2,
                }}
              >
                Edit path
              </motion.p>
            </motion.button>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default RollingText;