const Experience = require('../models/Experience');

// @desc    Get all experiences
// @route   GET /api/experiences
// @access  Public
const getExperiences = async (req, res) => {
    try {
        const experiences = await Experience.find().sort({ startDate: -1 });
        res.status(200).json(experiences);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create an experience
// @route   POST /api/experiences
// @access  Private
const createExperience = async (req, res) => {
    try {
        const experience = await Experience.create(req.body);
        res.status(201).json(experience);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update an experience
// @route   PUT /api/experiences/:id
// @access  Private
const updateExperience = async (req, res) => {
    try {
        const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!experience) {
            return res.status(404).json({ message: 'Experience not found' });
        }
        res.status(200).json(experience);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete an experience
// @route   DELETE /api/experiences/:id
// @access  Private
const deleteExperience = async (req, res) => {
    try {
        const experience = await Experience.findByIdAndDelete(req.params.id);
        if (!experience) {
            return res.status(404).json({ message: 'Experience not found' });
        }
        res.status(200).json({ id: req.params.id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getExperiences,
    createExperience,
    updateExperience,
    deleteExperience,
};
