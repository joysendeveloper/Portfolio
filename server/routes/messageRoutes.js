const express = require('express');
const router = express.Router();
const {
    getMessages,
    createMessage,
    deleteMessage,
} = require('../controllers/messageController');
const { protect } = require('../middleware/authMiddleware');
const validate = require('../middleware/validationMiddleware');
const { messageSchema } = require('../utils/validationSchemas');

router.route('/').get(protect, getMessages).post(validate(messageSchema), createMessage);
router.route('/:id').delete(protect, deleteMessage);

module.exports = router;
