export interface BlogPost {
  title: string;
  url: string;
}

export interface Project {
  name: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
}

export interface Skills {
  languages: string[];
  frameworks: string[];
  tools: string[];
}

export interface ResumeExperience {
  role: string;
  company: string;
  period: string;
  bullets: string[];
}

export interface ResumeEducation {
  degree: string;
  school: string;
  year: string;
}

export interface Resume {
  summary: string;
  experience: ResumeExperience[];
  education: ResumeEducation;
}

export type WallpaperStyle =
  | "aurora"
  | "big-sur"
  | "sequoia"
  | "monterey";
