import { getWorker, loginWorker, registerWorker, deleteWorker, updateWorker } from '../controllers/workerController.js';
import { Router } from 'express';

const router = Router();

router.route('/api/workers/').get(getWorker);
router.route('/api/workers/login').post(loginWorker);
router.route('/api/workers/register').post(registerWorker);
router.route('/api/workers/:id').delete(deleteWorker);
router.route('/api/workers/:id').put(updateWorker);

export default router;
