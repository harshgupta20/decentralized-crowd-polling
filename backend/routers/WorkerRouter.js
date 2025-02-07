const {Router} = require('express');
const Worker = require('../controllers/Worker/Index');
const auth = require('../middleware/authMiddleware');
const router = Router();

router.get('/', auth.workerAuthMiddleware,  new Worker().GetWorkers);
router.post('/signin', new Worker().signin);



module.exports = router;