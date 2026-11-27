import React, { useEffect, useState } from "react";
import { ArrowDown, Github, Linkedin, Mail, FileText } from "lucide-react";
import ResumeButton from "./ResumeButton";

const Hero = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center relative bg-[#F8F6F2] dark:bg-[#0E0D0B] overflow-hidden"
    >
      {/* Subtle texture overlay matching reference theme */}
      <div
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #78716c 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 lg:px-10 pt-32 pb-20 relative z-10 w-full">
        {/* Status label */}
        <div
          className={`flex items-center gap-2.5 mb-10 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "0ms" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
          <span className="section-label">Available for opportunities</span>
        </div>

        {/* Main heading */}
        <div
          className={`transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "100ms" }}
        >
          <h1
            className="text-[3.25rem] sm:text-[4.5rem] lg:text-[6rem] font-semibold text-stone-900 dark:text-stone-100 leading-[1.0] tracking-tight mb-6"
            style={{ fontFamily: "Inter Tight, sans-serif", letterSpacing: "-0.03em" }}
          >
            Musab<br />
            <span className="text-stone-400 dark:text-stone-600">Ismail.</span>
          </h1>
        </div>

        {/* Role line */}
        <div
          className={`transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px w-10 bg-[#9B8B6E] dark:bg-[#C4A882]" />
            <p className="text-stone-500 dark:text-stone-400 text-base font-medium tracking-wide">
              Software Engineer &amp; .NET Developer
            </p>
          </div>
        </div>

        {/* Description */}
        <div
          className={`max-w-xl transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          <p className="text-stone-600 dark:text-stone-400 text-lg leading-relaxed mb-10">
            A Software Engineering student at PUCIT building high-performance backend systems,
            clean APIs, and modern web applications — combining C#, ASP.NET Core, and reactive frontend architectures.
            {" "}Comfortable deploying and shipping projects using AWS, Azure, and Docker.
          </p>
        </div>

        {/* CTA Buttons */}
        <div
          className={`flex flex-wrap items-center gap-3 mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          <a href="#projects" className="btn-primary">
            View Projects
          </a>
          <a href="#contact" className="btn-secondary">
            Get in Touch
          </a>
          <ResumeButton className="btn-secondary">
            <FileText size={15} strokeWidth={1.75} />
            <span>Resume</span>
          </ResumeButton>
        </div>

        {/* Divider + Social Links */}
        <div
          className={`flex items-center gap-6 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "500ms" }}
        >
          <div className="h-px flex-1 max-w-[3rem] bg-stone-300 dark:bg-stone-700" />
          <div className="flex items-center gap-5">
            <a
              href="https://github.com/Musab-Uppal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-400 dark:text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors duration-200"
              aria-label="GitHub"
            >
              <Github size={18} strokeWidth={1.5} />
            </a>
            <a
              href="https://www.linkedin.com/in/musabuppal/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-400 dark:text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} strokeWidth={1.5} />
            </a>
            <a
              href="mailto:musabismail02@email.com"
              className="text-stone-400 dark:text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors duration-200"
              aria-label="Email"
            >
              <Mail size={18} strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-stone-400 dark:text-stone-600 hover:text-stone-700 dark:hover:text-stone-300 transition-colors animate-bounce"
        aria-label="Scroll down to about section"
      >
        <ArrowDown size={16} strokeWidth={1.5} />
      </a>
    </section>
  );
};

export default Hero;
