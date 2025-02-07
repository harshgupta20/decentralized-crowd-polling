const { Router } = require('express');
const User = require('../controllers/User/Index');
const auth = require('../middleware/authMiddleware');
const validation = require('../middleware/validation');
const router = Router();

router.post('/signin', new User().signin);
router.post("/task", auth.userAuthMiddleware, validation.taskInput, new User().addTask);
router.get("/task", auth.userAuthMiddleware, validation.taskInput, new User().getTask);
router.get('/', auth.userAuthMiddleware, new User().GetUsers);


module.exports = router;