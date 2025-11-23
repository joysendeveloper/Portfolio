const express = require('express');
const router = express.Router();
const {
    getExperiences,
    createExperience,
    updateExperience,
    deleteExperience,
} = require('../controllers/experienceController');
const { protect } = require('../middleware/authMiddleware');
const validate = require('../middleware/validationMiddleware');
const { experienceSchema } = require('../utils/validationSchemas');

router.route('/').get(getExperiences).post(protect, validate(experienceSchema), createExperience);
router.route('/:id').put(protect, validate(experienceSchema), updateExperience).delete(protect, deleteExperience);

module.exports = router;
