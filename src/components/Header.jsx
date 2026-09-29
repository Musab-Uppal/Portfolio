import React, { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { darkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#F8F6F2]/95 dark:bg-[#0E0D0B]/95 backdrop-blur-md border-b border-stone-200 dark:border-[#252219]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16">
          {/* Wordmark */}
          <a
            href="#home"
            className="font-semibold text-stone-900 dark:text-stone-100 tracking-tight text-[1.0625rem]"
            style={{ fontFamily: "Inter Tight, sans-serif" }}
          >
            Musab Ismail
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-7">
            {navItems.map((item) => (
              <a key={item.name} href={item.href} className="nav-link">
                {item.name}
              </a>
            ))}
            <div className="w-px h-4 bg-stone-300 dark:bg-stone-700 mx-1" />
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-md text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <Sun size={15} strokeWidth={1.75} />
              ) : (
                <Moon size={15} strokeWidth={1.75} />
              )}
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center gap-1">
            <button
              onClick={toggleTheme}
              className="p-2 text-stone-500 dark:text-stone-400"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-stone-800 dark:text-stone-200"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute left-0 right-0 top-16 bg-[#F8F6F2] dark:bg-[#0E0D0B] border-b border-stone-200 dark:border-[#252219] px-6 py-6 shadow-sm">
            <div className="flex flex-col gap-5">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 text-[0.9375rem] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
