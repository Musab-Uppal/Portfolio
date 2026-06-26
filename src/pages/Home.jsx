import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import ResumeButton from "../components/ResumeButton";
import DinoGame from "../components/DinoGame";
import {
  ArrowRight,
  BriefcaseBusiness,
  ExternalLink,
  Github,
  Code2,
  Layers,
  Zap,
  Star,
  Globe,
  BookOpen,
} from "lucide-react";

// ─── Data ──────────────────────────────────────────────────────────────────

const EXPERIENCE = [
  {
    role: "AI Intern",
    company: "Spiral Labs",
    summary:
      "Built memory-aware AI workflows and prompt pipelines focused on practical product use cases.",
    period: "Internship",
    icon: Zap,
    accent: "#38bdf8",
  },
  {
    role: "Video Editing Intern",
    company: "CodeSekho",
    summary:
      "Produced short-form and long-form edits, including full webinar post-production and publishing support.",
    period: "Internship",
    icon: Star,
    accent: "#a855f7",
  },
  {
    role: "Freelance Developer",
    company: "Self-employed",
    summary:
      "Delivered landing pages, frontend systems, and creative web media for independent clients.",
    period: "Freelance",
    icon: Code2,
    accent: "#818cf8",
  },
];

const PROJECTS = [
  {
    title: "PUCIT Resource Hub",
    category: "MERN Full-Stack",
    description:
      "Full-stack resource-sharing platform built for PUCIT students. Features JWT authentication, bcrypt password hashing, admin moderation panel to review every student upload before it goes live, file storage on Cloudinary, MongoDB Atlas as the database, and a React frontend deployed on Vercel. Backend hosted on Render.",
    tech: ["MongoDB", "Express.js", "React", "Node.js", "JWT", "Cloudinary", "Vercel", "Render"],
    link: "https://pucit-resource-hub.vercel.app/",
    githubLink: "https://github.com/Musab-Uppal/PUCIT-ResourceHub",
    icon: Globe,
    accentColor: "rgba(34, 211, 238, 0.85)",
    glowColor: "rgba(34, 211, 238, 0.13)",
    borderColor: "rgba(34, 211, 238, 0.28)",
    featured: true,
  },
  {
    title: "ECommerce Web API",
    category: ".NET Full-Stack",
    description:
      "Complete e-commerce Web API built in ASP.NET Core with layered architecture: services, repositories, models, and controllers. Includes authentication, product/catalog management, order processing, payment using stripe, and integration with a Angular frontend.",
    tech: ["C#", ".NET", "ASP.NET Core", "Entity Framework", "REST API", "Angular", "Stripe"],
    link: "https://github.com/Musab-Uppal/ECommereceAPI",
    icon: Layers,
    accentColor: "rgba(56, 189, 248, 0.8)",
    glowColor: "rgba(56, 189, 248, 0.12)",
    borderColor: "rgba(56, 189, 248, 0.25)",
    featured: false,
  },
  {
    title: "FB Clone — Semester Project",
    category: ".NET Semester Project",
    description:
      "Full-stack semester project with ASP.NET Core, authentication via ASP.NET Identity, Dapper, role-based authorization, and WebSockets for real-time features.",
    tech: [".NET", "C#", "ASP.NET Core", "Dapper", "WebSockets"],
    link: null,
    githubLink: "https://github.com/web-technologies-fall-2025/web-technologies-semester-project-Musab-Uppal",
    icon: Code2,
    accentColor: "rgba(168, 85, 247, 0.8)",
    glowColor: "rgba(168, 85, 247, 0.12)",
    borderColor: "rgba(168, 85, 247, 0.25)",
    featured: false,
  },
  {
    title: "Client Frontend Redesign",
    category: "Freelance Project",
    description:
      "Full frontend redesign in Angular using vibe coding. Modernized outdated UI, restructured page flow, and rebuilt reusable components for a complete visual and UX upgrade.",
    tech: ["Angular", "TypeScript", "UI/UX Redesign"],
    link: "https://frontend-nine-beta-17.vercel.app/home",
    icon: Globe,
    accentColor: "rgba(129, 140, 248, 0.8)",
    glowColor: "rgba(129, 140, 248, 0.12)",
    borderColor: "rgba(129, 140, 248, 0.25)",
    featured: false,
  },
  {
    title: "APIGA Frontend Website",
    category: "Freelance Project",
    description:
      "Designed and developed a complete frontend website for APIGA with responsive layouts and polished UI structure.",
    tech: ["React", "Responsive UI", "Modern CSS"],
    link: "https://apiga.pk",
    icon: Star,
    accentColor: "rgba(34, 211, 238, 0.8)",
    glowColor: "rgba(34, 211, 238, 0.12)",
    borderColor: "rgba(34, 211, 238, 0.25)",
    featured: false,
  },
  {
    title: "Books Journal",
    category: "Next.js Full-Stack",
    description:
      "A reading journal app for book lovers to track reads, write notes, and manage their library. Auto-fetches book metadata (title, author, genre) via ISBN using Groq AI, pulls cover art from the Google Books API, and signs users in with Google OAuth. Built with Next.js, backed by Supabase for auth and database.",
    tech: ["Next.js", "Supabase", "Groq AI", "Google OAuth", "Google Books API", "TypeScript"],
    link: "https://books-journal.vercel.app/login",
    githubLink: "https://github.com/Musab-Uppal/Books-Journal",
    icon: Star,
    accentColor: "rgba(251, 191, 36, 0.85)",
    glowColor: "rgba(251, 191, 36, 0.1)",
    borderColor: "rgba(251, 191, 36, 0.25)",
    featured: false,
  },
  {
    title: "AD Electronics — POS System",
    category: "Next.js Full-Stack",
    description:
      "Custom point-of-sale web app built for an electronics retail business. Features secure admin login, customer management, order creation, and an installment/payment tracking system — allowing the store to manage sales and outstanding balances end-to-end. Built with Next.js and Supabase.",
    tech: ["Next.js", "Supabase", "TypeScript", "Admin Auth", "POS", "Installments"],
    link: null,
    githubLink: "https://github.com/Musab-Uppal/AD-Electronics",
    icon: Layers,
    accentColor: "rgba(52, 211, 153, 0.85)",
    glowColor: "rgba(52, 211, 153, 0.1)",
    borderColor: "rgba(52, 211, 153, 0.25)",
    featured: false,
  },
  {
    title: "Junior .NET Interview Prep",
    category: "Open Source Resource",
    description:
      "Created while preparing for a junior .NET developer role — now open-sourced for the community. Covers C#, ASP.NET Core, Entity Framework, REST APIs, and common interview patterns. Has gained 6 ⭐ stars and 2 forks from the developer community.",
    tech: ["C#", ".NET", "ASP.NET Core", "Open Source", "Interview Prep"],
    link: null,
    githubLink: "https://github.com/Musab-Uppal/Junior-.Net-Interview-Prep",
    icon: BookOpen,
    accentColor: "rgba(251, 146, 60, 0.9)",
    glowColor: "rgba(251, 146, 60, 0.1)",
    borderColor: "rgba(251, 146, 60, 0.28)",
    featured: false,
  },
];

const SKILLS = [
  { name: "C#", group: "backend" },
  { name: ".NET", group: "backend" },
  { name: "ASP.NET Core", group: "backend" },
  { name: "Entity Framework", group: "backend" },
  { name: "REST APIs", group: "backend" },
  { name: "React", group: "frontend" },
  { name: "Next.js", group: "frontend" },
  { name: "JavaScript", group: "frontend" },
  { name: "Node.js", group: "frontend" },
  { name: "PostgreSQL", group: "data" },
  { name: "Tailwind CSS", group: "frontend" },
  { name: "Git & GitHub", group: "tools" },
  { name: "Canva", group: "tools" },
  { name: "Premiere Pro", group: "tools" },
];

const STATS = [
  { value: "6+", label: "Live Projects" },
  { value: "2", label: "Internships" },
  { value: "7th", label: "Semester" },
  { value: "3.6", label: "CGPA" },
];

// ─── Animation variants ──────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] },
  }),
};

const fadeRight = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } },
};

// ─── Section Wrapper ─────────────────────────────────────────────────────

function Section({ id, children, className = "", style }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      id={id}
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
      style={style}
    >
      {children}
    </motion.section>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const Icon = project.icon;

  return (
    <motion.article
      variants={fadeUp}
      custom={index}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        background: hovered
          ? `rgba(255,255,255,0.055)`
          : "rgba(255,255,255,0.025)",
        border: `1px solid ${hovered ? project.borderColor : "rgba(255,255,255,0.07)"}`,
        borderRadius: "1.25rem",
        padding: "1.75rem",
        transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered
          ? `0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px ${project.borderColor}, inset 0 1px 0 rgba(255,255,255,0.08), 0 0 80px ${project.glowColor}`
          : "0 4px 20px rgba(0,0,0,0.2)",
        backdropFilter: "blur(20px)",
        overflow: "hidden",
        cursor: "default",
      }}
    >
      {/* Top glow accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: `linear-gradient(90deg, transparent, ${project.accentColor}, transparent)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      />

      {/* Corner glow */}
      <div
        style={{
          position: "absolute",
          top: "-60px",
          right: "-60px",
          width: "140px",
          height: "140px",
          borderRadius: "50%",
          background: project.glowColor,
          filter: "blur(40px)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      />

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.25rem", position: "relative" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: `${project.glowColor}`,
              border: `1px solid ${project.borderColor}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s ease",
              boxShadow: hovered ? `0 0 20px ${project.glowColor}` : "none",
            }}
          >
            <Icon size={18} style={{ color: project.accentColor }} />
          </div>
          <div>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "#64748b",
                marginBottom: "2px",
              }}
            >
              {project.category}
            </p>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.05rem",
                fontWeight: 700,
                color: "#f1f5f9",
                lineHeight: 1.3,
              }}
            >
              {project.title}
            </h3>
          </div>
        </div>

        {(project.link || project.githubLink) && (
          <a
            href={project.link || project.githubLink}
            target="_blank"
            rel="noreferrer"
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "8px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#64748b",
              transition: "all 0.3s ease",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = project.glowColor;
              e.currentTarget.style.borderColor = project.borderColor;
              e.currentTarget.style.color = project.accentColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              e.currentTarget.style.color = "#64748b";
            }}
          >
            <ExternalLink size={14} />
          </a>
        )}
      </div>

      {/* Description */}
      <p
        style={{
          color: "#94a3b8",
          fontSize: "0.875rem",
          lineHeight: 1.75,
          marginBottom: "1.25rem",
          position: "relative",
        }}
      >
        {project.description}
      </p>

      {/* Tech Stack */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.25rem" }}>
        {project.tech.map((t) => (
          <span
            key={t}
            style={{
              background: `${project.glowColor}`,
              border: `1px solid ${project.borderColor}`,
              color: project.accentColor,
              borderRadius: "9999px",
              fontSize: "0.68rem",
              fontWeight: 500,
              fontFamily: "var(--font-mono)",
              padding: "0.2rem 0.6rem",
            }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* Footer links */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              fontSize: "0.82rem",
              fontWeight: 600,
              color: project.accentColor,
              textDecoration: "none",
              transition: "gap 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.gap = "0.65rem")}
            onMouseLeave={(e) => (e.currentTarget.style.gap = "0.4rem")}
          >
            <Globe size={13} /> View Live <ArrowRight size={12} />
          </a>
        )}

        {project.githubLink && (
          <a
            href={project.githubLink}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              fontSize: "0.82rem",
              fontWeight: 600,
              color: "#64748b",
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#94a3b8")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
          >
            <Github size={13} /> GitHub
          </a>
        )}

        {!project.githubLink && project.link.includes("github") && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              fontSize: "0.82rem",
              fontWeight: 600,
              color: project.accentColor,
              textDecoration: "none",
              transition: "gap 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.gap = "0.65rem")}
            onMouseLeave={(e) => (e.currentTarget.style.gap = "0.4rem")}
          >
            <Github size={13} /> View on GitHub <ArrowRight size={12} />
          </a>
        )}
      </div>
    </motion.article>
  );
}

// ─── Skill Badge ──────────────────────────────────────────────────────────

const groupColors = {
  backend: { bg: "rgba(56, 189, 248, 0.08)", border: "rgba(56, 189, 248, 0.2)", text: "#7dd3fc" },
  frontend: { bg: "rgba(129, 140, 248, 0.08)", border: "rgba(129, 140, 248, 0.2)", text: "#a5b4fc" },
  data: { bg: "rgba(168, 85, 247, 0.08)", border: "rgba(168, 85, 247, 0.2)", text: "#d8b4fe" },
  tools: { bg: "rgba(34, 211, 238, 0.08)", border: "rgba(34, 211, 238, 0.2)", text: "#67e8f9" },
};

function SkillBadge({ skill, index }) {
  const colors = groupColors[skill.group];
  return (
    <motion.span
      variants={fadeUp}
      custom={index * 0.05}
      whileHover={{ scale: 1.08, y: -2 }}
      style={{
        background: colors.bg,
        border: `1px solid ${colors.border}`,
        color: colors.text,
        borderRadius: "9999px",
        fontSize: "0.8rem",
        fontWeight: 500,
        padding: "0.4rem 1rem",
        display: "inline-block",
        cursor: "default",
        transition: "box-shadow 0.2s ease",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.boxShadow = `0 0 16px ${colors.border}`)
      }
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
    >
      {skill.name}
    </motion.span>
  );
}

// ─── Main Home Component ──────────────────────────────────────────────────

export default function Home() {
  const [typed, setTyped] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const full = "C# & .NET-focused backend developer";

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      setTyped(full.slice(0, i));
      i += 1;
      if (i > full.length) clearInterval(t);
    }, 40);
    return () => clearInterval(t);
  }, []);

  return (
    <main style={{ position: "relative", zIndex: 1, paddingTop: "5rem" }}>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section id="home" style={{ paddingTop: "5rem", paddingBottom: "6rem" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem" }}>
            {/* Left column */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              style={{ maxWidth: "700px" }}
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  background: "rgba(56, 189, 248, 0.08)",
                  border: "1px solid rgba(56, 189, 248, 0.2)",
                  borderRadius: "9999px",
                  padding: "0.35rem 1rem",
                  marginBottom: "2rem",
                }}
              >
                <span
                  style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    background: "#38bdf8",
                    boxShadow: "0 0 8px #38bdf8",
                    animation: "blink 2s ease-in-out infinite",
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.7rem",
                    color: "#7dd3fc",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  Software Engineer Portfolio
                </span>
              </motion.div>

              {/* Name */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
                  fontWeight: 700,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  marginBottom: "0.75rem",
                  background: "linear-gradient(135deg, #f8fafc 30%, #94a3b8 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Musab Ismail
              </motion.h1>

              {/* Typed subtitle */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 500,
                  color: "#94a3b8",
                  marginBottom: "1.25rem",
                  fontFamily: "var(--font-mono)",
                  minHeight: "1.8rem",
                }}
              >
                <span style={{ color: "#38bdf8" }}>&gt;</span>{" "}
                <span style={{ color: "#e2e8f0" }}>{typed}</span>
                <span
                  className="blinking-cursor"
                  style={{ marginLeft: "2px" }}
                >
                  |
                </span>
              </motion.p>

              {/* Bio */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                style={{
                  color: "#64748b",
                  fontSize: "1rem",
                  lineHeight: 1.8,
                  maxWidth: "560px",
                  marginBottom: "2rem",
                }}
              >
                I build robust, maintainable backend systems and APIs using{" "}
                <span style={{ color: "#7dd3fc", fontWeight: 500 }}>C# & ASP.NET Core</span>. Seeking a Summer 2026 .NET
                internship to deepen expertise in backend architecture, clean
                services, and scalable APIs.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginBottom: "2rem" }}
              >
                <a
                  href="#projects"
                  className="btn-primary"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.7rem 1.5rem",
                    borderRadius: "0.75rem",
                    fontSize: "0.9rem",
                    textDecoration: "none",
                  }}
                >
                  <span>View My Work</span>
                  <ArrowRight size={15} />
                </a>
                <a
                  href="mailto:musabismail02@email.com"
                  className="btn-secondary"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.7rem 1.5rem",
                    borderRadius: "0.75rem",
                    fontSize: "0.9rem",
                    textDecoration: "none",
                  }}
                >
                  Let's Collaborate
                </a>
                <ResumeButton
                  className="btn-secondary"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.7rem 1.5rem",
                    borderRadius: "0.75rem",
                    fontSize: "0.9rem",
                  }}
                >
                  Download Resume
                </ResumeButton>
              </motion.div>

              {/* Tag pills */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.85, duration: 0.6 }}
                style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}
              >
                {["Frontend Development", "Landing Pages", "AI Workflows", ".NET · C#"].map(
                  (tag) => (
                    <span key={tag} className="tag-pill">
                      {tag}
                    </span>
                  )
                )}
              </motion.div>
            </motion.div>

            {/* Stats card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              style={{ maxWidth: "460px" }}
            >
              <div
                className="glass-card"
                style={{ padding: "2rem" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "10px",
                      background: "rgba(56,189,248,0.1)",
                      border: "1px solid rgba(56,189,248,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <BriefcaseBusiness size={16} style={{ color: "#38bdf8" }} />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700, color: "#f1f5f9" }}>
                      Professional Snapshot
                    </h3>
                    <p style={{ fontSize: "0.8rem", color: "#64748b" }}>PUCIT · BS Software Engineering</p>
                  </div>
                </div>
                <p style={{ color: "#64748b", fontSize: "0.875rem", lineHeight: 1.75, marginBottom: "1.5rem" }}>
                  BS Software Engineering student with internship and freelance experience across software and digital media.
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                  {STATS.map((s) => (
                    <div
                      key={s.label}
                      style={{
                        padding: "1rem",
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.07)",
                        borderRadius: "0.75rem",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "rgba(56,189,248,0.3)";
                        e.currentTarget.style.background = "rgba(56,189,248,0.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                        e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "1.75rem",
                          fontWeight: 700,
                          background: "linear-gradient(135deg, #38bdf8, #818cf8)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                          lineHeight: 1,
                          marginBottom: "0.25rem",
                        }}
                      >
                        {s.value}
                      </div>
                      <div style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: 500 }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <hr className="glow-divider" />

      {/* ── About ───────────────────────────────────────────────────────── */}
      <Section id="about" style={{ padding: "5rem 0" }}>
        <div className="container">
          <motion.div variants={fadeRight} style={{ marginBottom: "2.5rem" }}>
            <p className="section-label" style={{ marginBottom: "0.5rem" }}>About</p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.6rem, 4vw, 2.25rem)",
                fontWeight: 700,
                color: "#f1f5f9",
                lineHeight: 1.25,
              }}
            >
              Focused on quality execution{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #38bdf8, #a855f7)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                & clear communication.
              </span>
            </h2>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.25rem" }}>
            <motion.div variants={fadeUp} custom={0} className="glass-card glass-card-hover" style={{ padding: "1.75rem" }}>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: "0.95rem", fontWeight: 600, color: "#38bdf8", marginBottom: "0.75rem" }}>
                My Approach
              </h4>
              <p style={{ color: "#64748b", fontSize: "0.9rem", lineHeight: 1.8 }}>
                I blend technical implementation with creative thinking. My work covers frontend systems, landing experiences, and AI-driven
                experiments where usability and performance both matter.
              </p>
              <p style={{ color: "#64748b", fontSize: "0.9rem", lineHeight: 1.8, marginTop: "0.75rem" }}>
                Alongside engineering, I have hands-on video production experience, which helps me approach product presentation with a strong
                eye for narrative and detail.
              </p>
            </motion.div>
            <motion.div variants={fadeUp} custom={1} className="glass-card glass-card-hover" style={{ padding: "1.75rem" }}>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: "0.95rem", fontWeight: 600, color: "#818cf8", marginBottom: "0.75rem" }}>
                What I Deliver
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                {[
                  "Responsive-first layouts for desktop and mobile.",
                  "Readable code architecture for long-term maintenance.",
                  "Fast iteration from design references to production UI.",
                  "Strong ownership from concept through delivery.",
                ].map((item) => (
                  <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.65rem", color: "#64748b", fontSize: "0.9rem" }}>
                    <span style={{ color: "#38bdf8", marginTop: "3px", flexShrink: 0 }}>▹</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </Section>

      <hr className="glow-divider" />

      {/* ── Projects ──────────────────────────────────────────────────── */}
      <Section id="projects" style={{ padding: "5rem 0" }}>
        <div className="container">
          <motion.div variants={fadeRight} style={{ marginBottom: "3rem" }}>
            <p className="section-label" style={{ marginBottom: "0.5rem" }}>Selected Work</p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.6rem, 4vw, 2.25rem)",
                fontWeight: 700,
                color: "#f1f5f9",
                lineHeight: 1.25,
              }}
            >
              Production-ready projects{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #818cf8, #a855f7)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                with real-world context.
              </span>
            </h2>
          </motion.div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {PROJECTS.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </div>
        </div>
      </Section>

      <hr className="glow-divider" />

      {/* ── Experience ────────────────────────────────────────────────── */}
      <Section id="experience" style={{ padding: "5rem 0" }}>
        <div className="container">
          <motion.div variants={fadeRight} style={{ marginBottom: "2.5rem" }}>
            <p className="section-label" style={{ marginBottom: "0.5rem" }}>Experience</p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.6rem, 4vw, 2.25rem)",
                fontWeight: 700,
                color: "#f1f5f9",
              }}
            >
              Internship{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #22d3ee, #38bdf8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                & freelance track record.
              </span>
            </h2>
          </motion.div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {EXPERIENCE.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.role}
                  variants={fadeUp}
                  custom={i}
                  className="glass-card glass-card-hover"
                  style={{
                    padding: "1.5rem 1.75rem",
                    display: "flex",
                    gap: "1.25rem",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "12px",
                      background: `${item.accent}15`,
                      border: `1px solid ${item.accent}30`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={18} style={{ color: item.accent }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.25rem" }}>
                      <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "#f1f5f9", fontSize: "1rem" }}>
                        {item.role}
                      </h3>
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.68rem",
                          color: item.accent,
                          background: `${item.accent}15`,
                          border: `1px solid ${item.accent}30`,
                          padding: "0.2rem 0.6rem",
                          borderRadius: "9999px",
                        }}
                      >
                        {item.period}
                      </span>
                    </div>
                    <p style={{ fontSize: "0.85rem", color: "#38bdf8", fontWeight: 600, marginBottom: "0.5rem" }}>
                      {item.company}
                    </p>
                    <p style={{ color: "#64748b", fontSize: "0.875rem", lineHeight: 1.75 }}>{item.summary}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Section>

      <hr className="glow-divider" />

      {/* ── Skills ────────────────────────────────────────────────────── */}
      <Section id="skills" style={{ padding: "5rem 0" }}>
        <div className="container">
          <motion.div variants={fadeRight} style={{ marginBottom: "2.5rem" }}>
            <p className="section-label" style={{ marginBottom: "0.5rem" }}>Skills</p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.6rem, 4vw, 2.25rem)",
                fontWeight: 700,
                color: "#f1f5f9",
              }}
            >
              Tools and technologies{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #a855f7, #818cf8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                used in delivery.
              </span>
            </h2>
          </motion.div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
            {SKILLS.map((skill, i) => (
              <SkillBadge key={skill.name} skill={skill} index={i} />
            ))}
          </div>
        </div>
      </Section>

      <hr className="glow-divider" />

      {/* ── Contact ───────────────────────────────────────────────────── */}
      <Section id="contact" style={{ padding: "5rem 0" }}>
        <div className="container">
          <motion.div
            variants={fadeUp}
            custom={0}
            style={{
              background: "linear-gradient(135deg, rgba(14, 165, 233, 0.07) 0%, rgba(168, 85, 247, 0.07) 100%)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "1.5rem",
              padding: "3rem",
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              alignItems: "center",
              textAlign: "center",
              backdropFilter: "blur(20px)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Decorative glow balls */}
            <div
              style={{
                position: "absolute",
                top: "-60px",
                left: "10%",
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                background: "rgba(56,189,248,0.08)",
                filter: "blur(60px)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "-60px",
                right: "10%",
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                background: "rgba(168,85,247,0.08)",
                filter: "blur(60px)",
                pointerEvents: "none",
              }}
            />

            <div style={{ position: "relative" }}>
              <p className="section-label" style={{ marginBottom: "0.75rem" }}>Get in touch</p>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.6rem, 4vw, 2.5rem)",
                  fontWeight: 700,
                  color: "#f1f5f9",
                  lineHeight: 1.25,
                  marginBottom: "1rem",
                }}
              >
                Available for freelance{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #38bdf8, #a855f7)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  & internship opportunities.
                </span>
              </h2>
              <p style={{ color: "#64748b", fontSize: "0.95rem", maxWidth: "440px", margin: "0 auto" }}>
                I'm currently open to new opportunities. Whether you have a project or just want to say hi — my inbox is open!
              </p>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center", position: "relative" }}>
              <a
                href="mailto:musabismail02@email.com"
                className="btn-primary"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.8rem 1.75rem",
                  borderRadius: "0.75rem",
                  fontSize: "0.95rem",
                  textDecoration: "none",
                }}
              >
                Contact Me
                <ArrowRight size={15} />
              </a>
              <a
                href="https://github.com/Musab-Uppal"
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.8rem 1.75rem",
                  borderRadius: "0.75rem",
                  fontSize: "0.95rem",
                  textDecoration: "none",
                }}
              >
                <Github size={16} />
                GitHub
              </a>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ── Dino Game ─────────────────────────────────────────────────── */}
      <section id="play" style={{ padding: "2rem 0 4rem" }}>
        <div className="container">
          <DinoGame />
        </div>
      </section>
    </main>
  );
}
