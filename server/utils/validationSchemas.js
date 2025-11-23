const { z } = require('zod');

const skillSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    level: z.number().min(1).max(100),
    category: z.string().min(1, 'Category is required'),
    icon: z.string().optional(),
});

const experienceSchema = z.object({
    company: z.string().min(1, 'Company is required'),
    role: z.string().min(1, 'Role is required'),
    startDate: z.string().or(z.date()),
    endDate: z.string().or(z.date()).optional().nullable(),
    description: z.string().min(1, 'Description is required'),
    technologies: z.array(z.string()).optional(),
});

const projectSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    imageUrl: z.string().min(1, 'Image URL is required'),
    tags: z.array(z.string()).optional(),
    demoUrl: z.string().optional(),
    repoUrl: z.string().optional(),
    featured: z.boolean().optional(),
});

const messageSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    subject: z.string().optional(),
    message: z.string().min(1, 'Message is required'),
});

module.exports = {
    skillSchema,
    experienceSchema,
    projectSchema,
    messageSchema,
};
