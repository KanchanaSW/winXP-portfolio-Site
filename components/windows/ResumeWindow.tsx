"use client";

import { XPButton } from "@/components/xp/XPButton";
import { DocumentIcon } from "@/components/xp/icons";
import { portfolio } from "@/portfolio.config";

export function ResumeWindow() {
  const { resume } = portfolio;

  return (
    <div className="flex flex-col h-full min-h-0 sm:min-h-[320px] p-3 text-[11px]">
      <p className="font-bold mb-2">Open</p>
      <div className="flex flex-col sm:flex-row gap-4 flex-1 min-h-0">
        <div className="w-full sm:w-28 flex flex-row sm:flex-col items-center p-2 xp-bevel-inset bg-white shrink-0 gap-2 sm:gap-0">
          <DocumentIcon size={48} />
          <span className="sm:mt-2 text-center">Resume.pdf</span>
        </div>
        <div className="flex-1 min-w-0 xp-bevel-inset bg-white p-3 overflow-auto xp-scrollbar">
          <p className="m-0 mb-2 font-bold">
            {portfolio.name} — {portfolio.title}
          </p>
          <p className="m-0 mb-3 leading-relaxed">{resume.summary}</p>
          {resume.experience.map((job) => (
            <div key={`${job.company}-${job.period}`} className="mb-3">
              <p className="m-0 font-bold">
                {job.role} — {job.company}
              </p>
              <p className="m-0 mb-1 text-[#666]">{job.period}</p>
              <ul className="m-0 pl-4 list-disc">
                {job.bullets.map((bullet) => (
                  <li key={bullet} className="mb-1">
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <p className="m-0 font-bold">{resume.education.degree}</p>
          <p className="m-0 text-[#666]">
            {resume.education.school} ({resume.education.year})
          </p>
        </div>
      </div>
      <div className="mt-3 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2">
        <div className="text-[#666]">
          <div>File name: Resume.pdf</div>
          <div>Date modified: 5/31/2026</div>
        </div>
        <XPButton
          variant="primary"
          className="w-full sm:w-auto"
          onClick={() => {
            const link = document.createElement("a");
            link.href = "/resume.pdf";
            link.download = "Resume.pdf";
            link.click();
          }}
        >
          Download Resume
        </XPButton>
      </div>
    </div>
  );
}
