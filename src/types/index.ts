export interface Project {
  id: string;
  title: string;
  description: string;
  role: string;
  technologies: string[];
  category: string;
  imageUrl: string;
  githubUrl?: string;
  liveUrl?: string;
  keyFeatures: string[];
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
  details: string[];
}
