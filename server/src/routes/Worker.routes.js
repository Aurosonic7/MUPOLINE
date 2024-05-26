import { 
  getWorker, 
  procedureInsertWorker, 
  procedureUpdateWorker, 
  procedureDeleteWorker, 
} from '../controllers/workerController.js';
import { Router } from 'express';

const router = Router();

router.route('/').get(getWorker);
router.route('/').post(procedureInsertWorker);
router.route('/:id').put(procedureUpdateWorker);
router.route('/:id').delete(procedureDeleteWorker);

export default router;
