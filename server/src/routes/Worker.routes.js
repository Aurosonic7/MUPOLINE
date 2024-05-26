import { 
  getWorker, 
  loginWorker,
  procedureRegisterWorker, 
  procedureUpdateWorker, 
  procedureDeleteWorker, 
} from '../controllers/workerController.js';
import { Router } from 'express';

const router = Router();

router.route('/').get(getWorker);
router.route('/login').post(loginWorker);
router.route('/register').post(procedureRegisterWorker);
router.route('/:id').put(procedureUpdateWorker);
router.route('/:id').delete(procedureDeleteWorker);

export default router;
