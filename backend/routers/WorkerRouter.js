const {Router} = require('express');
const Worker = require('../controllers/Worker/Index');
const auth = require('../middleware/authMiddleware');
const router = Router();

router.get('/', auth.workerAuthMiddleware,  new Worker().GetWorkers);
router.get('/nextTask', auth.workerAuthMiddleware,  new Worker().nextTask);
router.post('/submission', auth.workerAuthMiddleware,  new Worker().submission);
router.post('/signin', new Worker().signin);



module.exports = router;