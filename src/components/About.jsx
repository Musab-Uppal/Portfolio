import React from "react";
import { GraduationCap, MapPin } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-28 lg:py-36 bg-white dark:bg-[#111009]">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        {/* Section header */}
        <div className="mb-16">
          <p className="section-label mb-3">About</p>
          <h2 className="section-heading">A bit about me.</h2>
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Left: Narrative (wider) */}
          <div className="lg:col-span-3 space-y-6">
            <p className="text-stone-700 dark:text-stone-300 text-lg leading-[1.85]">
              I'm Musab — a Software Engineering student at PUCIT, Lahore with a strong
              passion for building backend architectures and web systems that are technically
              rigorous, performant, and maintainable. Throughout my studies, I've focused heavily
              on C#, ASP.NET Core, REST APIs, and scalable relational databases.
            </p>
            <p className="text-stone-600 dark:text-stone-400 text-base leading-[1.85]">
              I thrive at the intersection of clean architecture and pragmatic problem-solving.
              Whether designing layered .NET Web APIs with Entity Framework, handling real-time
              communication with WebSockets, or delivering end-to-end full-stack web products with
              React and Next.js — I approach every project with curiosity, discipline, and attention to detail.
            </p>
            <p className="text-stone-600 dark:text-stone-400 text-base leading-[1.85]">
              Alongside core engineering, I bring hands-on video editing and digital media experience
              from my time at CodeSekho and independent freelance delivery. This unique background
              enables me to communicate complex technical ideas clearly and craft interfaces with
              exceptional visual polish.
            </p>

            {/* Quick facts */}
            <div className="pt-4 grid grid-cols-2 gap-4">
              {[
                { label: "Currently Based", value: "Lahore, Pakistan" },
                { label: "Degree", value: "BS Software Engineering" },
                { label: "University", value: "PUCIT" },
                { label: "Email", value: "musabismail02@email.com", isLink: true },
              ].map((fact) => (
                <div
                  key={fact.label}
                  className="py-4 border-t border-stone-100 dark:border-[#252219]"
                >
                  <p className="text-xs text-stone-400 dark:text-stone-500 font-medium tracking-wide uppercase mb-1">
                    {fact.label}
                  </p>
                  {fact.isLink ? (
                    <a
                      href={`mailto:${fact.value}`}
                      className="text-stone-800 dark:text-stone-200 font-medium text-sm hover:text-[#9B8B6E] dark:hover:text-[#C4A882] transition-colors truncate block"
                    >
                      {fact.value}
                    </a>
                  ) : (
                    <p className="text-stone-800 dark:text-stone-200 font-medium text-sm">
                      {fact.value}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Cards (narrower) */}
          <div className="lg:col-span-2 space-y-4">
            {/* Education card */}
            <div className="card p-6">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-stone-100 dark:bg-[#252219] flex-shrink-0">
                  <GraduationCap
                    size={18}
                    className="text-stone-600 dark:text-stone-400"
                    strokeWidth={1.75}
                  />
                </div>
                <div>
                  <p className="text-xs text-stone-400 dark:text-stone-500 font-medium tracking-wide uppercase mb-1">
                    Education
                  </p>
                  <h3
                    className="font-semibold text-stone-900 dark:text-stone-100 text-sm mb-1"
                    style={{ fontFamily: "Inter Tight, sans-serif" }}
                  >
                    BS Software Engineering
                  </h3>
                  <p className="text-stone-500 dark:text-stone-400 text-sm">
                    PUCIT, Lahore
                  </p>
                  <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-900/40">
                    <span className="text-emerald-700 dark:text-emerald-400 text-xs font-semibold">
                      CGPA 3.60 / 4.00 · 7th Semester
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Objective card */}
            <div className="card p-6">
              <p className="text-xs text-stone-400 dark:text-stone-500 font-medium tracking-wide uppercase mb-3">
                Currently Seeking
              </p>
              <div className="space-y-2.5">
                {[
                  ".NET / C# Backend Roles",
                  "Full-Stack Web Development",
                  "Summer 2026 Opportunities",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9B8B6E] dark:bg-[#C4A882] flex-shrink-0" />
                    <span className="text-stone-700 dark:text-stone-300 text-sm">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location card */}
            <div className="card p-5 flex items-center gap-3">
              <MapPin
                size={15}
                className="text-stone-400 dark:text-stone-500 flex-shrink-0"
                strokeWidth={1.75}
              />
              <span className="text-stone-600 dark:text-stone-400 text-sm">
                Lahore, Pakistan
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
