import { useState, useEffect, useRef, useCallback } from "react";

const GROUND_Y = 120;       // y of ground line in canvas
const DINO_X = 70;
const DINO_W = 38;
const DINO_H = 48;
const OBS_W = 22;
const OBS_H_MIN = 30;
const OBS_H_MAX = 55;
const JUMP_VEL = -13;
const GRAVITY = 0.6;
const BASE_SPEED = 4;
const MAX_SPEED = 12;

// ── localStorage helpers ──────────────────────────────────────────────────
const LS_KEY = "dino_leaderboard";

function loadLeaderboard() {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY)) || [];
  } catch {
    return [];
  }
}

function saveLeaderboard(board) {
  localStorage.setItem(LS_KEY, JSON.stringify(board));
}

function addScore(name, score) {
  const board = loadLeaderboard();
  board.push({ name: name.trim() || "Anonymous", score });
  board.sort((a, b) => b.score - a.score);
  const top = board.slice(0, 5);
  saveLeaderboard(top);
  return top;
}

// ── Colours ───────────────────────────────────────────────────────────────
const C = {
  bg: "#0d1117",
  ground: "rgba(56,189,248,0.25)",
  groundLine: "rgba(56,189,248,0.5)",
  dino: "#38bdf8",
  obstacle: "#f87171",
  obstacleAlt: "#fb923c",
  score: "#94a3b8",
  scoreHi: "#38bdf8",
  cloud: "rgba(255,255,255,0.06)",
  star: "rgba(255,255,255,0.4)",
};

// Pre-generate stars
const STARS = Array.from({ length: 40 }, () => ({
  x: Math.random(),
  y: Math.random() * 0.65,
  r: Math.random() * 1.2 + 0.3,
}));

// ── Main Component ────────────────────────────────────────────────────────
export default function DinoGame() {
  const canvasRef = useRef(null);
  const stateRef = useRef(null); // mutable game state (no re-render cost)
  const rafRef = useRef(null);

  const [phase, setPhase] = useState("idle"); // idle | playing | dead | naming
  const [displayScore, setDisplayScore] = useState(0);
  const [leaderboard, setLeaderboard] = useState(loadLeaderboard);
  const [nameInput, setNameInput] = useState("");
  const [lastScore, setLastScore] = useState(0);
  const nameRef = useRef(null);

  // ── Init game state ─────────────────────────────────────────────────────
  function makeState() {
    return {
      dinoY: GROUND_Y - DINO_H,
      velY: 0,
      jumping: false,
      obstacles: [],
      clouds: [
        { x: 0.5, y: 0.2, w: 60, speed: 0.3 },
        { x: 0.8, y: 0.12, w: 40, speed: 0.2 },
      ],
      score: 0,
      speed: BASE_SPEED,
      frame: 0,
      nextObs: 90, // frames until next obstacle
    };
  }

  // ── Jump ────────────────────────────────────────────────────────────────
  const jump = useCallback(() => {
    const s = stateRef.current;
    if (!s || s.jumping) return;
    s.velY = JUMP_VEL;
    s.jumping = true;
  }, []);

  // ── Draw ────────────────────────────────────────────────────────────────
  function draw(canvas, s) {
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;

    ctx.clearRect(0, 0, W, H);

    // Background
    ctx.fillStyle = C.bg;
    ctx.fillRect(0, 0, W, H);

    // Stars
    STARS.forEach((st) => {
      ctx.beginPath();
      ctx.arc(st.x * W, st.y * H, st.r, 0, Math.PI * 2);
      ctx.fillStyle = C.star;
      ctx.fill();
    });

    // Clouds
    s.clouds.forEach((cl) => {
      ctx.beginPath();
      ctx.ellipse(cl.x * W, cl.y * H, cl.w, 14, 0, 0, Math.PI * 2);
      ctx.fillStyle = C.cloud;
      ctx.fill();
    });

    // Ground
    ctx.fillStyle = C.ground;
    ctx.fillRect(0, GROUND_Y, W, H - GROUND_Y);
    ctx.beginPath();
    ctx.moveTo(0, GROUND_Y);
    ctx.lineTo(W, GROUND_Y);
    ctx.strokeStyle = C.groundLine;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Dino body
    const dy = s.dinoY;
    // Body
    ctx.fillStyle = C.dino;
    ctx.beginPath();
    ctx.roundRect(DINO_X, dy, DINO_W, DINO_H, 6);
    ctx.fill();
    // Eye
    ctx.fillStyle = C.bg;
    ctx.beginPath();
    ctx.arc(DINO_X + DINO_W - 8, dy + 10, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#f8fafc";
    ctx.beginPath();
    ctx.arc(DINO_X + DINO_W - 7, dy + 9, 2, 0, Math.PI * 2);
    ctx.fill();
    // Legs (animate when running)
    if (!s.jumping) {
      const leg = Math.floor(s.frame / 8) % 2;
      ctx.fillStyle = C.dino;
      ctx.fillRect(DINO_X + 6, dy + DINO_H, 8, leg === 0 ? 10 : 6);
      ctx.fillRect(DINO_X + 20, dy + DINO_H, 8, leg === 0 ? 6 : 10);
    }

    // Obstacles
    s.obstacles.forEach((ob) => {
      const grad = ctx.createLinearGradient(ob.x, GROUND_Y - ob.h, ob.x + OBS_W, GROUND_Y);
      grad.addColorStop(0, ob.alt ? C.obstacleAlt : C.obstacle);
      grad.addColorStop(1, ob.alt ? "#c2410c" : "#b91c1c");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(ob.x, GROUND_Y - ob.h, OBS_W, ob.h, [4, 4, 0, 0]);
      ctx.fill();
      // Glow
      ctx.shadowColor = ob.alt ? C.obstacleAlt : C.obstacle;
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    // Score
    ctx.font = "bold 14px 'JetBrains Mono', monospace";
    ctx.fillStyle = C.score;
    ctx.textAlign = "right";
    ctx.fillText(`SCORE  ${Math.floor(s.score)}`, W - 16, 22);
    ctx.textAlign = "left";
  }

  // ── Game loop ────────────────────────────────────────────────────────────
  const tick = useCallback(() => {
    const s = stateRef.current;
    const canvas = canvasRef.current;
    if (!s || !canvas) return;

    s.frame++;
    s.score += s.speed * 0.07;
    s.speed = Math.min(BASE_SPEED + s.score * 0.012, MAX_SPEED);

    // Clouds drift
    s.clouds.forEach((cl) => {
      cl.x -= cl.speed / canvas.width;
      if (cl.x < -0.1) cl.x = 1.1;
    });

    // Spawn obstacle
    s.nextObs--;
    if (s.nextObs <= 0) {
      const h = OBS_H_MIN + Math.random() * (OBS_H_MAX - OBS_H_MIN);
      s.obstacles.push({ x: canvas.width + 20, h, alt: Math.random() > 0.5 });
      s.nextObs = Math.max(40, 90 - s.score * 0.3) + Math.random() * 30;
    }

    // Move obstacles
    s.obstacles = s.obstacles
      .map((ob) => ({ ...ob, x: ob.x - s.speed }))
      .filter((ob) => ob.x > -40);

    // Physics
    s.velY += GRAVITY;
    s.dinoY += s.velY;
    if (s.dinoY >= GROUND_Y - DINO_H) {
      s.dinoY = GROUND_Y - DINO_H;
      s.velY = 0;
      s.jumping = false;
    }

    // Collision — AABB with generous margin for fair gameplay
    const dinoLeft  = DINO_X + 8;
    const dinoRight = DINO_X + DINO_W - 8;
    const dinoTop   = s.dinoY + 6;
    const dinoBot   = s.dinoY + DINO_H - 4;

    for (const ob of s.obstacles) {
      const obsLeft  = ob.x + 3;
      const obsRight = ob.x + OBS_W - 3;
      const obsTop   = GROUND_Y - ob.h + 4;

      const horizOverlap = dinoRight > obsLeft && dinoLeft < obsRight;
      const vertOverlap  = dinoBot   > obsTop;   // dino bottom is below obstacle top

      if (horizOverlap && vertOverlap) {
        // Dead
        cancelAnimationFrame(rafRef.current);
        const finalScore = Math.floor(s.score);
        setLastScore(finalScore);
        setDisplayScore(finalScore);
        setPhase("naming");
        return;
      }
    }

    setDisplayScore(Math.floor(s.score));
    draw(canvas, s);
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  // ── Start ────────────────────────────────────────────────────────────────
  function startGame() {
    cancelAnimationFrame(rafRef.current);
    stateRef.current = makeState();
    setDisplayScore(0);
    setPhase("playing");
    const canvas = canvasRef.current;
    draw(canvas, stateRef.current);
    rafRef.current = requestAnimationFrame(tick);
  }

  // ── Submit name ──────────────────────────────────────────────────────────
  function submitName(e) {
    e?.preventDefault();
    const updated = addScore(nameInput || "Anonymous", lastScore);
    setLeaderboard(updated);
    setNameInput("");
    setPhase("dead");
  }

  // ── Keyboard controls ────────────────────────────────────────────────────
  useEffect(() => {
    function onKey(e) {
      if (phase === "naming") return; // don't jump during name input
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        if (phase === "idle" || phase === "dead") { startGame(); return; }
        jump();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, jump]);

  // Focus name input when naming phase starts
  useEffect(() => {
    if (phase === "naming") setTimeout(() => nameRef.current?.focus(), 80);
  }, [phase]);

  // Draw idle screen
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (phase === "idle" || phase === "dead") {
      const s = makeState();
      draw(canvas, s);
    }
  }, [phase]);

  // Resize canvas
  useEffect(() => {
    function resize() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = 160;
    }
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // Cleanup on unmount
  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  const topScorer = leaderboard[0];

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "1.25rem",
        padding: "1.75rem",
        backdropFilter: "blur(20px)",
        marginTop: "1rem",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <span style={{ fontSize: "1.4rem" }}>🦖</span>
          <div>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "#f1f5f9", fontSize: "1rem", marginBottom: "1px" }}>
              Dino Runner
            </h3>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "#475569" }}>
              Space / ↑ / Tap to jump
            </p>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
          {topScorer && (
            <div style={{ textAlign: "right" }}>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "#475569", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                🏆 High Score
              </p>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", fontWeight: 700, color: "#38bdf8" }}>
                {topScorer.name} — {topScorer.score}
              </p>
            </div>
          )}
          <div style={{ textAlign: "right" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "#475569", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Score
            </p>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", fontWeight: 700, color: "#38bdf8" }}>
              {displayScore}
            </p>
          </div>
        </div>
      </div>

      {/* Canvas area */}
      <div style={{ position: "relative", borderRadius: "0.75rem", overflow: "hidden", border: "1px solid rgba(56,189,248,0.12)" }}>
        <canvas
          ref={canvasRef}
          style={{ display: "block", width: "100%", height: "160px", cursor: phase === "playing" ? "none" : "pointer" }}
          onClick={() => {
            if (phase === "naming") return;
            if (phase === "playing") { jump(); return; }
            startGame();
          }}
        />

        {/* Idle overlay */}
        {phase === "idle" && (
          <div style={{
            position: "absolute", inset: 0, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: "0.75rem",
            background: "rgba(3,7,18,0.6)", backdropFilter: "blur(4px)",
          }}>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, color: "#f1f5f9" }}>
              Ready to run?
            </p>
            <button
              onClick={(e) => { e.stopPropagation(); startGame(); }}
              style={{
                background: "linear-gradient(135deg, #0ea5e9, #6366f1)",
                color: "white", border: "none", borderRadius: "9999px",
                padding: "0.5rem 1.5rem", fontWeight: 700, fontSize: "0.9rem",
                cursor: "pointer", boxShadow: "0 0 20px rgba(56,189,248,0.3)",
              }}
            >
              Start Game
            </button>
          </div>
        )}

        {/* Name entry overlay — shown immediately after dying */}
        {phase === "naming" && (
          <div style={{
            position: "absolute", inset: 0, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: "0.85rem",
            background: "rgba(3,7,18,0.85)", backdropFilter: "blur(6px)",
          }}>
            <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem", color: "#f87171" }}>
              Game Over! Score: {lastScore}
            </p>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "#94a3b8" }}>
              Enter your name for the leaderboard
            </p>
            <form onSubmit={submitName} style={{ display: "flex", gap: "0.5rem" }} onClick={(e) => e.stopPropagation()}>
              <input
                ref={nameRef}
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Your name…"
                maxLength={20}
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(56,189,248,0.35)",
                  borderRadius: "0.5rem",
                  padding: "0.4rem 0.85rem",
                  color: "#f1f5f9",
                  fontSize: "0.9rem",
                  fontFamily: "var(--font-sans)",
                  outline: "none",
                  width: "160px",
                }}
              />
              <button
                type="submit"
                style={{
                  background: "linear-gradient(135deg, #0ea5e9, #6366f1)",
                  color: "white", border: "none", borderRadius: "0.5rem",
                  padding: "0.4rem 1rem", fontWeight: 700, fontSize: "0.85rem",
                  cursor: "pointer",
                }}
              >
                Save
              </button>
            </form>
            <button
              onClick={(e) => { e.stopPropagation(); submitName(); }}
              style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "#475569", background: "none", border: "none", cursor: "pointer" }}
            >
              Skip
            </button>
          </div>
        )}

        {/* Dead overlay */}
        {phase === "dead" && (
          <div style={{
            position: "absolute", inset: 0, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: "0.75rem",
            background: "rgba(3,7,18,0.7)", backdropFilter: "blur(4px)",
          }}>
            <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1rem", color: "#f1f5f9" }}>
              Score: <span style={{ color: "#38bdf8" }}>{lastScore}</span>
            </p>
            <button
              onClick={(e) => { e.stopPropagation(); startGame(); }}
              style={{
                background: "linear-gradient(135deg, #0ea5e9, #6366f1)",
                color: "white", border: "none", borderRadius: "9999px",
                padding: "0.5rem 1.5rem", fontWeight: 700, fontSize: "0.9rem",
                cursor: "pointer", boxShadow: "0 0 20px rgba(56,189,248,0.3)",
              }}
            >
              Play Again
            </button>
          </div>
        )}
      </div>

      {/* Leaderboard */}
      {leaderboard.length > 0 && (
        <div style={{ marginTop: "1.25rem" }}>
          <p style={{
            fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "#475569",
            textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.6rem",
          }}>
            🏆 Leaderboard
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
            {leaderboard.map((entry, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.4rem 0.75rem",
                  borderRadius: "0.5rem",
                  background: i === 0 ? "rgba(56,189,248,0.08)" : "rgba(255,255,255,0.025)",
                  border: `1px solid ${i === 0 ? "rgba(56,189,248,0.2)" : "rgba(255,255,255,0.05)"}`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: i === 0 ? "#fbbf24" : "#475569", width: "16px" }}>
                    {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i + 1}`}
                  </span>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: i === 0 ? "#f1f5f9" : "#94a3b8", fontWeight: i === 0 ? 600 : 400 }}>
                    {entry.name}
                  </span>
                </div>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", fontWeight: 700, color: i === 0 ? "#38bdf8" : "#64748b" }}>
                  {entry.score}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
