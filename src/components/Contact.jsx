import React, { useState } from "react";
import { Mail, MapPin, Github, Linkedin, ArrowUpRight, Send, CheckCircle2 } from "lucide-react";

const Contact = () => {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = formState;
    const mailtoLink = `mailto:musabismail02@email.com?subject=Portfolio Inquiry from ${encodeURIComponent(
      name
    )}&body=${encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${message}`)}`;
    window.location.href = mailtoLink;
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section id="contact" className="py-28 lg:py-36 bg-white dark:bg-[#111009]">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        {/* Section header */}
        <div className="mb-16">
          <p className="section-label mb-3">Contact</p>
          <h2 className="section-heading">Let's work together.</h2>
          <p className="text-stone-600 dark:text-stone-400 text-base mt-4 max-w-lg leading-relaxed">
            Open to software engineering roles, .NET backend opportunities, and meaningful collaborations.
            My inbox is always open — let's connect.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left: Contact info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact details */}
            <div className="space-y-5">
              {[
                {
                  icon: <Mail size={16} strokeWidth={1.75} />,
                  label: "Email",
                  value: "musabismail02@email.com",
                  href: "mailto:musabismail02@email.com",
                },
                {
                  icon: <MapPin size={16} strokeWidth={1.75} />,
                  label: "Location",
                  value: "Lahore, Pakistan",
                  href: null,
                },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="p-2.5 rounded-xl bg-stone-100 dark:bg-[#1A1814] border border-stone-200 dark:border-[#252219] text-stone-500 dark:text-stone-400 flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs text-stone-400 dark:text-stone-500 font-medium tracking-wide uppercase mb-0.5">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-stone-800 dark:text-stone-200 text-sm font-medium hover:text-[#9B8B6E] dark:hover:text-[#C4A882] transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-stone-800 dark:text-stone-200 text-sm font-medium">
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-stone-200 dark:bg-[#252219]" />

            {/* Social links */}
            <div>
              <p className="text-xs text-stone-400 dark:text-stone-500 font-medium tracking-wide uppercase mb-4">
                Find me online
              </p>
              <div className="space-y-3">
                {[
                  {
                    name: "GitHub",
                    handle: "Musab-Uppal",
                    url: "https://github.com/Musab-Uppal",
                    icon: <Github size={16} strokeWidth={1.75} />,
                  },
                  {
                    name: "LinkedIn",
                    handle: "musabuppal",
                    url: "https://www.linkedin.com/in/musabuppal/",
                    icon: <Linkedin size={16} strokeWidth={1.75} />,
                  },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 card rounded-xl hover:shadow-sm dark:hover:shadow-[0_2px_12px_rgba(0,0,0,0.25)] transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-3 text-stone-700 dark:text-stone-300">
                      {social.icon}
                      <div>
                        <span className="text-sm font-medium group-hover:text-stone-900 dark:group-hover:text-stone-100 transition-colors">
                          {social.name}
                        </span>
                        <p className="text-xs text-stone-400 dark:text-stone-500">
                          @{social.handle}
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight
                      size={15}
                      strokeWidth={1.75}
                      className="text-stone-400 dark:text-stone-500 group-hover:text-stone-900 dark:group-hover:text-stone-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Interactive Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="card p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-2"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-lg bg-stone-50 dark:bg-[#161412] border border-stone-200 dark:border-[#2E2924] text-stone-900 dark:text-stone-100 text-sm placeholder-stone-400 dark:placeholder-stone-600 focus:outline-none focus:border-[#9B8B6E] dark:focus:border-[#C4A882] transition-colors"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-lg bg-stone-50 dark:bg-[#161412] border border-stone-200 dark:border-[#2E2924] text-stone-900 dark:text-stone-100 text-sm placeholder-stone-400 dark:placeholder-stone-600 focus:outline-none focus:border-[#9B8B6E] dark:focus:border-[#C4A882] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-2"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  required
                  value={formState.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project, team, or opportunity..."
                  className="w-full px-4 py-3 rounded-lg bg-stone-50 dark:bg-[#161412] border border-stone-200 dark:border-[#2E2924] text-stone-900 dark:text-stone-100 text-sm placeholder-stone-400 dark:placeholder-stone-600 focus:outline-none focus:border-[#9B8B6E] dark:focus:border-[#C4A882] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-lg text-sm font-medium hover:bg-stone-700 dark:hover:bg-stone-200 transition-colors duration-200"
              >
                {sent ? (
                  <>
                    <CheckCircle2 size={16} className="text-emerald-500" />
                    <span>Opening email client...</span>
                  </>
                ) : (
                  <>
                    <Send size={15} strokeWidth={1.75} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
