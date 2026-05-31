"use client";

import { WindowId } from "@/stores/desktopStore";
import { AboutWindow } from "./AboutWindow";
import { ProjectsWindow } from "./ProjectsWindow";
import { SkillsWindow } from "./SkillsWindow";
import { ResumeWindow } from "./ResumeWindow";
import { ContactWindow } from "./ContactWindow";
import { BlogWindow } from "./BlogWindow";

export function WindowContent({ id }: { id: WindowId }) {
  switch (id) {
    case "about":
      return <AboutWindow />;
    case "projects":
      return <ProjectsWindow />;
    case "skills":
      return <SkillsWindow />;
    case "resume":
      return <ResumeWindow />;
    case "contact":
      return <ContactWindow />;
    case "blog":
      return <BlogWindow />;
    default:
      return null;
  }
}
