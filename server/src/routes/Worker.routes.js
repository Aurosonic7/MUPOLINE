import { 
  getWorker, 
  loginWorker,
  registerWorker, 
  deleteWorker,
} from '../controllers/workerController.js';
import { Router } from 'express';

const router = Router();

router.route('/').get(getWorker);
router.route('/login').post(loginWorker);
router.route('/register').post(registerWorker);
router.route('/:id').delete(deleteWorker);

export default router;
