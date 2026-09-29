import React from "react";
import { ArrowUp, Github, Linkedin, Mail, FileText } from "lucide-react";
import ResumeButton from "./ResumeButton";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-stone-200 dark:border-[#252219] bg-[#F8F6F2] dark:bg-[#0E0D0B] py-12 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Copyright */}
          <div className="text-center md:text-left">
            <a
              href="#home"
              className="font-semibold text-stone-900 dark:text-stone-100 tracking-tight text-[1.0625rem]"
              style={{ fontFamily: "Inter Tight, sans-serif" }}
            >
              Musab Ismail
            </a>
            <p className="text-stone-500 dark:text-stone-400 text-xs mt-1">
              © {new Date().getFullYear()} Musab Ismail. All rights reserved. · Lahore, Pakistan
            </p>
          </div>

          {/* Actions & Links */}
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <a
              href="https://github.com/Musab-Uppal"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-stone-400 dark:text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-[#1A1814] transition-all"
              aria-label="GitHub"
            >
              <Github size={17} strokeWidth={1.75} />
            </a>
            <a
              href="https://www.linkedin.com/in/musabuppal/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-stone-400 dark:text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-[#1A1814] transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin size={17} strokeWidth={1.75} />
            </a>
            <a
              href="mailto:musabismail02@email.com"
              className="p-2 rounded-lg text-stone-400 dark:text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-[#1A1814] transition-all"
              aria-label="Email"
            >
              <Mail size={17} strokeWidth={1.75} />
            </a>

            <div className="w-px h-4 bg-stone-200 dark:bg-[#252219] mx-1" />

            <ResumeButton className="btn-secondary !py-1.5 !px-3 !text-xs">
              <FileText size={13} strokeWidth={1.75} />
              <span>Resume</span>
            </ResumeButton>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-[#1A1814] transition-all"
              aria-label="Back to top"
              title="Back to top"
            >
              <ArrowUp size={16} strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
