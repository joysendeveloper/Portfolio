const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    level: {
        type: Number, // 1-100 or similar
        required: true,
    },
    category: {
        type: String, // e.g., "Frontend", "Backend", "Tools"
        required: true,
    },
    icon: {
        type: String, // URL or icon name
    },
}, { timestamps: true });

module.exports = mongoose.model('Skill', skillSchema);
