export interface Skill {
    _id: string;
    name: string;
    level: number;
    category: string;
    icon?: string;
}

export interface Experience {
    _id: string;
    company: string;
    role: string;
    startDate: string;
    endDate?: string;
    description: string;
    technologies: string[];
}

export interface Project {
    _id: string;
    title: string;
    description: string;
    imageUrl: string;
    tags: string[];
    demoUrl?: string;
    repoUrl?: string;
    featured: boolean;
}
