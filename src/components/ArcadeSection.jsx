import React, { useState } from "react";
import { Gamepad2, ChevronDown, ChevronUp } from "lucide-react";
import DinoGame from "./DinoGame";

const ArcadeSection = () => {
  const [open, setOpen] = useState(false);

  return (
    <section className="py-12 bg-[#F8F6F2] dark:bg-[#0E0D0B] border-t border-stone-200 dark:border-[#252219]">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col items-center">
          <button
            onClick={() => setOpen(!open)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-stone-300 dark:border-[#2E2924] bg-white dark:bg-[#1A1814] text-stone-700 dark:text-stone-300 text-xs font-medium hover:border-[#9B8B6E] dark:hover:border-[#C4A882] hover:text-stone-900 dark:hover:text-stone-100 transition-all shadow-sm"
          >
            <Gamepad2 size={16} className="text-[#9B8B6E] dark:text-[#C4A882]" />
            <span>{open ? "Hide Arcade Mini-Game" : "Need a quick break? Play Dino Runner"}</span>
            {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>

          {open && (
            <div className="w-full mt-8 card p-6 overflow-hidden">
              <DinoGame />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ArcadeSection;
