import { useRef, useEffect, useState } from "react";

const Fade = ({ children, delay = 0, direction = "up", className = "" }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-60px 0px" },
    );
    const el = ref.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const transforms = {
    up: visible ? "translateY(0)" : "translateY(24px)",
    down: visible ? "translateY(0)" : "translateY(-24px)",
    left: visible ? "translateX(0)" : "translateX(-24px)",
    right: visible ? "translateX(0)" : "translateX(24px)",
    scale: visible ? "scale(1)" : "scale(0.93)",
    none: "none",
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: transforms[direction] ?? transforms.up,
        transition: `opacity .72s cubic-bezier(0.16,1,.3,1) ${delay}ms, transform .72s cubic-bezier(0.16,1,.3,1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
};

export default Fade;
