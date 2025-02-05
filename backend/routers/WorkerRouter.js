const {Router} = require('express');
const Worker = require('../controllers/Worker/Index');
const router = Router();

router.get('/', new Worker().GetWorkers);



module.exports = router;