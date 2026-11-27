import React from "react";

const skillCategories = [
  {
    title: "Backend & .NET",
    skills: [
      "C#",
      ".NET",
      "ASP.NET Core",
      "Entity Framework",
      "REST APIs",
      "SignalR",
      "Dapper",
    ],
  },
  {
    title: "Frontend & Web",
    skills: [
      "React.js",
      "Next.js",
      "JavaScript",
      "TypeScript",
      "Angular",
      "Tailwind CSS",
      "HTML5 / CSS3",
    ],
  },
  {
    title: "Databases & Storage",
    skills: [
      "PostgreSQL",
      "SQL Server",
      "MongoDB",
      "Supabase",
      "Cloudinary",
    ],
  },
  {
    title: "Tools & Ecosystem",
    skills: [
      "Git & GitHub",
      "Docker",
      "AWS",
      "Postman",
      "Vercel",
      "Render",
      "Linux",
    ],
  },
  {
    title: "AI & Automation",
    skills: [
      "Prompt Engineering",
      "AI Workflows",
      "Groq AI",
      "LLM Integration",
      "Python",
    ],
  },
  {
    title: "Media & Design",
    skills: [
      "Adobe Premiere Pro",
      "Canva",
      "UI/UX Redesign",
      "Video Production",
    ],
  },
];

const strengths = [
  {
    title: "Backend Architecture",
    body: "Designing robust, maintainable Web APIs with ASP.NET Core, clean separation of concerns, repository patterns, and structured data flow.",
  },
  {
    title: "Full-Stack Integration",
    body: "Bridging performant C# and Node backends with responsive, accessible user interfaces built in React, Next.js, and modern CSS.",
  },
  {
    title: "Data Modeling & Persistence",
    body: "Relational database schema design with Entity Framework and PostgreSQL, alongside flexible document storage with MongoDB and Supabase.",
  },
  {
    title: "Visual & Product Polish",
    body: "Pairing engineering discipline with video editing intuition to create intuitive navigation, polished layouts, and clear product narratives.",
  },
];

const Skills = () => {
  return (
    <section id="skills" className="py-28 lg:py-36 bg-white dark:bg-[#111009]">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        {/* Section header */}
        <div className="mb-16">
          <p className="section-label mb-3">Skills</p>
          <h2 className="section-heading">Technical expertise.</h2>
        </div>

        {/* Skills grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="card p-6 hover:shadow-sm dark:hover:shadow-[0_2px_16px_rgba(0,0,0,0.25)] transition-shadow duration-300"
            >
              <h3
                className="text-xs font-semibold text-stone-400 dark:text-stone-500 tracking-[0.12em] uppercase mb-4"
                style={{ fontFamily: "Inter Tight, sans-serif" }}
              >
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span key={skill} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Strengths — editorial horizontal bands */}
        <div className="border-t border-stone-200 dark:border-[#252219] pt-12">
          <p className="section-label mb-8">Core Strengths</p>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
            {strengths.map((s, i) => (
              <div key={i} className="flex gap-5">
                <span
                  className="text-2xl font-light text-stone-300 dark:text-stone-700 leading-none flex-shrink-0 mt-0.5"
                  style={{ fontFamily: "Inter Tight, sans-serif" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h4
                    className="font-semibold text-stone-900 dark:text-stone-100 text-sm mb-1.5"
                    style={{ fontFamily: "Inter Tight, sans-serif" }}
                  >
                    {s.title}
                  </h4>
                  <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed">
                    {s.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
