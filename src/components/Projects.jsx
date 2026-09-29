import React, { useState } from "react";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";

const projects = [
  {
    index: "01",
    title: "PUCIT Resource Hub",
    subtitle: "MERN Full-Stack Platform",
    description:
      "Full-stack resource-sharing platform built for PUCIT students. Features authentication, admin moderation workflow to verify student uploads before publication, Cloudinary file storage, and MongoDB Atlas database.",
    tech: ["React", "Node.js", "Express.js", "MongoDB", "JWT", "Cloudinary", "Vercel"],
    achievements: [
      "JWT authentication & bcrypt password hashing",
      "Admin approval pipeline before resources go live",
      "Cloudinary media storage & MongoDB Atlas integration",
    ],
    github: "https://github.com/Musab-Uppal/PUCIT-ResourceHub",
    live: "https://pucit-resource-hub.vercel.app/",
    accentColor: "bg-blue-50 dark:bg-blue-950/30",
    accentBorder: "border-blue-100 dark:border-blue-900/30",
  },
  {
    index: "02",
    title: "ECommerce Web API",
    subtitle: "ASP.NET Core Architecture",
    description:
      "Comprehensive e-commerce Web API built in ASP.NET Core with layered clean architecture: services, repositories, domain models, and controllers. Includes product catalog management, order processing, and Stripe payment integration.",
    tech: ["C#", ".NET", "ASP.NET Core", "Entity Framework", "REST API", "Angular", "Stripe"],
    achievements: [
      "Layered enterprise repository & service architecture",
      "Stripe payment gateway integration",
      "Entity Framework Core relational mapping with SQL Server",
    ],
    github: "https://github.com/Musab-Uppal/ECommereceAPI",
    live: null,
    accentColor: "bg-cyan-50 dark:bg-cyan-950/20",
    accentBorder: "border-cyan-100 dark:border-cyan-900/30",
  },
  {
    index: "03",
    title: "FB Clone — Semester Project",
    subtitle: ".NET & Real-Time WebSockets",
    description:
      "Full-stack semester project featuring ASP.NET Core Identity authentication, role-based authorization, and real-time WebSockets for instant user interaction and messaging.",
    tech: [".NET", "C#", "ASP.NET Core", "Dapper", "WebSockets", "SQL Server"],
    achievements: [
      "ASP.NET Core Identity authentication & role authorization",
      "High-performance queries implemented with Dapper",
      "Real-time interactive features using WebSockets",
    ],
    github: "https://github.com/web-technologies-fall-2025/web-technologies-semester-project-Musab-Uppal",
    live: null,
    accentColor: "bg-purple-50 dark:bg-purple-950/20",
    accentBorder: "border-purple-100 dark:border-purple-900/30",
  },
  {
    index: "04",
    title: "AD Electronics — POS System",
    subtitle: "Retail & Installment Management",
    description:
      "Custom point-of-sale web application built for an electronics retail business. Features secure admin access, customer management, inventory order creation, and an installment tracking system.",
    tech: ["Next.js", "Supabase", "TypeScript", "Admin Auth", "POS Architecture"],
    achievements: [
      "Customer ledger & installment payment scheduling",
      "Role-protected administrative authentication",
      "End-to-end sales transactions and balance tracking",
    ],
    github: "https://github.com/Musab-Uppal/AD-Electronics",
    live: null,
    accentColor: "bg-emerald-50 dark:bg-emerald-950/20",
    accentBorder: "border-emerald-100 dark:border-emerald-900/30",
  },
  {
    index: "05",
    title: "Junior .NET Interview Prep",
    subtitle: "Open Source Community Resource",
    description:
      "Open-source preparation repository curated for .NET developers. Covers core C#, ASP.NET Core internals, Entity Framework, REST API design, and common software engineering interview challenges.",
    tech: ["C#", ".NET", "ASP.NET Core", "Entity Framework", "Interview Prep"],
    achievements: [
      "Community recognized with stars and forks on GitHub",
      "Deep dive into C# memory management & ASP.NET Core lifecycle",
      "Hands-on architectural question & solution guides",
    ],
    github: "https://github.com/Musab-Uppal/Junior-.Net-Interview-Prep",
    live: null,
    accentColor: "bg-rose-50 dark:bg-rose-950/20",
    accentBorder: "border-rose-100 dark:border-rose-900/30",
  },
  {
    index: "06",
    title: "Client Frontend Redesign",
    subtitle: "Freelance Angular Project",
    description:
      "Full frontend modernization built with Angular. Revitalized an outdated UI, restructured user navigation flow, and developed responsive, reusable components for an improved visual and user experience.",
    tech: ["Angular", "TypeScript", "Modern CSS", "UI/UX Redesign"],
    achievements: [
      "Complete visual modernization and responsive overhaul",
      "Modular Angular component architecture",
      "Fast, fluid navigation flows across mobile and desktop",
    ],
    github: null,
    live: "https://frontend-nine-beta-17.vercel.app/home",
    accentColor: "bg-indigo-50 dark:bg-indigo-950/20",
    accentBorder: "border-indigo-100 dark:border-indigo-900/30",
  },
  {
    index: "07",
    title: "APIGA Frontend Website",
    subtitle: "Production Web Experience",
    description:
      "Designed and developed a complete frontend web platform for APIGA featuring responsive multi-device layouts, fluid typography, and clean brand presentation.",
    tech: ["React", "Responsive UI", "Modern CSS", "Brand Consistency"],
    achievements: [
      "Mobile-first responsive layout architecture",
      "Cross-browser compatibility & performance tuning",
      "Polished visual presentation adhering to client brand identity",
    ],
    github: null,
    live: "https://apiga.pk",
    accentColor: "bg-teal-50 dark:bg-teal-950/20",
    accentBorder: "border-teal-100 dark:border-teal-900/30",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-28 lg:py-36 bg-[#F8F6F2] dark:bg-[#0E0D0B]">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        {/* Section header */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-16">
          <div>
            <p className="section-label mb-3">Projects</p>
            <h2 className="section-heading">Selected work.</h2>
          </div>
          <a
            href="https://github.com/Musab-Uppal"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors duration-200 group"
          >
            <Github size={16} strokeWidth={1.75} />
            <span>View all on GitHub</span>
            <ArrowUpRight
              size={14}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
            />
          </a>
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <div
              key={i}
              className="card overflow-hidden hover:shadow-lg dark:hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-0.5 flex flex-col"
            >
              {/* Top accent bar */}
              <div className={`h-1.5 w-full ${project.accentColor} ${project.accentBorder}`} />

              <div className="p-7 flex flex-col flex-1">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="text-[0.6875rem] font-medium text-stone-400 dark:text-stone-500 tracking-widest uppercase">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3
                      className="font-semibold text-stone-900 dark:text-stone-100 text-[1.0625rem] leading-snug mt-0.5"
                      style={{ fontFamily: "Inter Tight, sans-serif" }}
                    >
                      {project.title}
                    </h3>
                    <p className="text-[#9B8B6E] dark:text-[#C4A882] text-xs font-medium mt-0.5">
                      {project.subtitle}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg text-stone-400 dark:text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-[#252219] transition-all duration-200"
                        aria-label={`${project.title} GitHub`}
                        title="View GitHub Repository"
                      >
                        <Github size={16} strokeWidth={1.75} />
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg text-stone-400 dark:text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-[#252219] transition-all duration-200"
                        aria-label={`${project.title} Live Demo`}
                        title="View Live Demo"
                      >
                        <ExternalLink size={16} strokeWidth={1.75} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed mb-5">
                  {project.description}
                </p>

                {/* Achievements */}
                <div className="mb-5 space-y-1.5">
                  {project.achievements.map((ach) => (
                    <div key={ach} className="flex items-center gap-2.5">
                      <span className="w-1 h-1 rounded-full bg-[#9B8B6E] dark:bg-[#C4A882] flex-shrink-0" />
                      <span className="text-stone-600 dark:text-stone-400 text-xs">
                        {ach}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-stone-100 dark:border-[#252219]">
                  {project.tech.map((t) => (
                    <span key={t} className="skill-tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
