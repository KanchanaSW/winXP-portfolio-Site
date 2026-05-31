"use client";

import { portfolio } from "@/portfolio.config";

const SKILL_SECTIONS = [
  { title: "Languages", skills: portfolio.skills.languages },
  { title: "Frameworks", skills: portfolio.skills.frameworks },
  { title: "Tools", skills: portfolio.skills.tools },
] as const;

export function SkillsWindow() {
  return (
    <div className="p-2 sm:p-3 text-[11px]">
      {SKILL_SECTIONS.map((section) => (
        <fieldset key={section.title} className="xp-group-box">
          <legend className="xp-group-box-legend">{section.title}</legend>
          <ul className="m-0 pl-4 list-disc">
            {section.skills.map((skill) => (
              <li key={skill} className="mb-1">
                {skill}
              </li>
            ))}
          </ul>
        </fieldset>
      ))}
    </div>
  );
}
