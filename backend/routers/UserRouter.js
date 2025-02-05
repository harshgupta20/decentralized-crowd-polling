const {Router} = require('express');
const User = require('../controllers/User/Index');
const router = Router();

router.post('/signin', new User().signin);
router.post('/', new User().GetUsers);


module.exports = router;