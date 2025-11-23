const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Skill = require('./models/Skill');
const Experience = require('./models/Experience');
const Project = require('./models/Project');

dotenv.config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        // Clear existing data
        await User.deleteMany({});
        await Skill.deleteMany({});
        await Experience.deleteMany({});
        await Project.deleteMany({});

        // Create Admin User
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin123', salt);
        await User.create({
            username: 'admin',
            password: hashedPassword,
        });
        console.log('Admin user created');

        // Create Skills
        await Skill.create([
            { name: 'JavaScript', category: 'Frontend', level: 90 },
            { name: 'React', category: 'Frontend', level: 85 },
            { name: 'Node.js', category: 'Backend', level: 80 },
            { name: 'MongoDB', category: 'Backend', level: 75 },
        ]);
        console.log('Skills created');

        // Create Experience
        await Experience.create([
            {
                company: 'Tech Corp',
                role: 'Frontend Developer',
                startDate: new Date('2022-01-01'),
                description: 'Built amazing UIs.',
                technologies: ['React', 'Tailwind'],
            },
        ]);
        console.log('Experience created');

        // Create Projects
        await Project.create([
            {
                title: 'Portfolio',
                description: 'My personal portfolio website.',
                imageUrl: 'https://via.placeholder.com/150',
                tags: ['Next.js', 'Three.js'],
                repoUrl: 'https://github.com/user/portfolio',
            },
        ]);
        console.log('Projects created');

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedData();
