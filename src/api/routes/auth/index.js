import * as authCtrl from './auth.ctrl';
import express from 'express';
const router = express.Router();

router.get('/register',authCtrl.register);
router.get('/login',authCtrl.login);

export default router;
