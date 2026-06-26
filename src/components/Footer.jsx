import { ArrowUp, FileText, Github, Linkedin, Mail } from "lucide-react";
import ResumeButton from "./ResumeButton";

export default function Footer() {
  return (
    <footer
      style={{
        position: "relative",
        zIndex: 1,
        borderTop: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(3, 7, 18, 0.8)",
        backdropFilter: "blur(20px)",
        marginTop: "2rem",
      }}
    >
      <div
        className="container"
        style={{
          padding: "2rem 0",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1.5rem",
        }}
      >
        {/* Brand */}
        <div>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "1rem",
              color: "#f1f5f9",
              marginBottom: "0.25rem",
            }}
          >
            Musab Ismail
            <span style={{ color: "#38bdf8" }}>.</span>
          </p>
          <p style={{ fontSize: "0.8rem", color: "#475569" }}>
            © {new Date().getFullYear()} · Built with React & Vite
          </p>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
          {[
            { href: "https://github.com/Musab-Uppal", label: "GitHub", Icon: Github },
            { href: "https://www.linkedin.com/in/musabuppal/", label: "LinkedIn", Icon: Linkedin },
            { href: "mailto:musabismail02@email.com", label: "Email", Icon: Mail },
          ].map((s) => (
            <a
              key={s.href}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              aria-label={s.label}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#475569",
                textDecoration: "none",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#38bdf8";
                e.currentTarget.style.borderColor = "rgba(56,189,248,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#475569";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
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
              fontSize: "0.8rem",
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

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              background: "rgba(56,189,248,0.08)",
              border: "1px solid rgba(56,189,248,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#38bdf8",
              cursor: "pointer",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(56,189,248,0.15)";
              e.currentTarget.style.boxShadow = "0 0 16px rgba(56,189,248,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(56,189,248,0.08)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
