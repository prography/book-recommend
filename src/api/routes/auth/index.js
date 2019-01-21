import * as authCtrl from './auth.ctrl';
import express from 'express';
const router = express.Router();

router.post('/register',authCtrl.register);
router.post('/login',authCtrl.login);
router.post('/update', authCtrl.update);
router.post('/validate', authCtrl.login);

export default router;
