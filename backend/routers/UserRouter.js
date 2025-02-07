const { Router } = require('express');
const User = require('../controllers/User/Index');
const authMiddleware = require('../middleware/authMiddleware');
const validation = require('../middleware/validation');
const router = Router();

router.post('/signin', new User().signin);
router.post("/task", authMiddleware, validation.taskInput, new User().addTask);
router.get("/task", authMiddleware, validation.taskInput, new User().getTask);
router.get('/', authMiddleware, new User().GetUsers);


module.exports = router;