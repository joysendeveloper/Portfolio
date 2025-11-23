const express = require('express');
const router = express.Router();
const {
    getSkills,
    createSkill,
    updateSkill,
    deleteSkill,
} = require('../controllers/skillController');
const { protect } = require('../middleware/authMiddleware');
const validate = require('../middleware/validationMiddleware');
const { skillSchema } = require('../utils/validationSchemas');

router.route('/').get(getSkills).post(protect, validate(skillSchema), createSkill);
router.route('/:id').put(protect, validate(skillSchema), updateSkill).delete(protect, deleteSkill);

module.exports = router;
