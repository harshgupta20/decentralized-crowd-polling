const {Router} = require('express');
const User = require('../controllers/User/Index');
const authMiddleware = require('../middleware/authMiddleware');
const router = Router();

router.post('/signin', new User().signin);
router.get('/', authMiddleware, new User().GetUsers);


module.exports = router;