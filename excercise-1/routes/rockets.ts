import { Router } from 'express';
import rocketController from '../controller/rocketController';

const router = Router();

router.get('/', rocketController.getAllRockets);
router.post('/', rocketController.addNewRocket);
router.put('/', rocketController.updateRocket);
router.delete('/:id', rocketController.deleteRocket);

router.get('/:id', rocketController.getRocket);

export default router;
