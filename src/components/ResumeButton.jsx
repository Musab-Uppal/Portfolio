import React from "react";

export default function ResumeButton({ className, style, children }) {
  const fallback = "https://github.com/Musab-Uppal";

  async function openResume() {
    try {
      const res = await fetch("/Resume.pdf", { method: "HEAD" });
      if (res.ok) window.open("/Resume.pdf", "_blank");
      else window.open(fallback, "_blank");
    } catch (e) {
      window.open(fallback, "_blank");
    }
  }

  return (
    <button type="button" onClick={openResume} className={className} style={style}>
      {children}
    </button>
  );
}
