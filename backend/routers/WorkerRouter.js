const {Router} = require('express');
const Worker = require('../controllers/Worker/Index');
const authMiddleware = require('../middleware/authMiddleware');
const router = Router();

router.get('/', authMiddleware,  new Worker().GetWorkers);



module.exports = router;