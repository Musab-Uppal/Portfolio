import { useEffect, useState } from "react";
import { Menu, X, FileText, Github, Linkedin, Mail } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import ResumeButton from "./ResumeButton";
import { AnimatePresence, motion } from "framer-motion";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const SOCIALS = [
  { href: "https://github.com/Musab-Uppal", label: "GitHub", Icon: Github },
  { href: "https://www.linkedin.com/in/musabuppal/", label: "LinkedIn", Icon: Linkedin },
  { href: "mailto:musabismail02@email.com", label: "Email", Icon: Mail },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      // Active section tracker
      const sections = ["home", "about", "projects", "experience", "skills", "contact"];
      for (const sec of [...sections].reverse()) {
        const el = document.getElementById(sec);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(sec);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
        background: scrolled ? "rgba(3, 7, 18, 0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "4rem",
        }}
      >
        {/* Logo */}
        <a
          href="#home"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            textDecoration: "none",
          }}
        >
          <div
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #0ea5e9, #6366f1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 16px rgba(56,189,248,0.3)",
              fontFamily: "var(--font-display)",
              fontSize: "0.8rem",
              fontWeight: 800,
              color: "white",
            }}
          >
            M
          </div>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "1rem",
              color: "#f1f5f9",
            }}
          >
            Musab<span style={{ color: "#38bdf8" }}>.</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          {LINKS.map((l) => {
            const isActive = activeSection === l.href.replace("#", "");
            return (
              <a
                key={l.href}
                href={l.href}
                style={{
                  padding: "0.4rem 0.85rem",
                  borderRadius: "0.6rem",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  color: isActive ? "#38bdf8" : "#64748b",
                  textDecoration: "none",
                  background: isActive ? "rgba(56,189,248,0.08)" : "transparent",
                  border: isActive ? "1px solid rgba(56,189,248,0.2)" : "1px solid transparent",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = "#e2e8f0";
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = "#64748b";
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                {l.label}
              </a>
            );
          })}
        </nav>

        {/* Right actions */}
        <div
          style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          className="hidden-mobile"
        >
          {SOCIALS.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              aria-label={s.label}
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "8px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#64748b",
                textDecoration: "none",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#38bdf8";
                e.currentTarget.style.borderColor = "rgba(56,189,248,0.3)";
                e.currentTarget.style.background = "rgba(56,189,248,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#64748b";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                e.currentTarget.style.background = "rgba(255,255,255,0.04)";
              }}
            >
              <s.Icon size={15} />
            </a>
          ))}
          <ResumeButton
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.45rem 1rem",
              borderRadius: "0.6rem",
              fontSize: "0.82rem",
              fontWeight: 600,
              background: "linear-gradient(135deg, #0ea5e9, #6366f1)",
              color: "white",
              border: "none",
              cursor: "pointer",
              textDecoration: "none",
              transition: "all 0.3s ease",
              boxShadow: "0 0 20px rgba(56,189,248,0.2)",
            }}
          >
            <FileText size={13} />
            Resume
          </ResumeButton>
        </div>

        {/* Mobile menu button */}
        <button
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((v) => !v)}
          className="mobile-only"
          style={{
            padding: "0.5rem",
            borderRadius: "0.6rem",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#94a3b8",
            cursor: "pointer",
          }}
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            style={{
              background: "rgba(3, 7, 18, 0.95)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              padding: "1.25rem",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", maxWidth: "400px", margin: "0 auto" }}>
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    padding: "0.7rem 1rem",
                    borderRadius: "0.6rem",
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    color: "#94a3b8",
                    textDecoration: "none",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    transition: "all 0.2s ease",
                  }}
                >
                  {l.label}
                </a>
              ))}
              <div style={{ display: "flex", gap: "0.5rem", paddingTop: "0.5rem" }}>
                {SOCIALS.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    aria-label={s.label}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "0.6rem",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#94a3b8",
                      textDecoration: "none",
                    }}
                  >
                    <s.Icon size={16} />
                  </a>
                ))}
                <ResumeButton
                  style={{
                    marginLeft: "auto",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    padding: "0.5rem 1.2rem",
                    borderRadius: "0.6rem",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    background: "linear-gradient(135deg, #0ea5e9, #6366f1)",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                    textDecoration: "none",
                  }}
                >
                  <FileText size={13} />
                  Resume
                </ResumeButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
