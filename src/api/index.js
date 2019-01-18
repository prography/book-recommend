import user from 'api/routes/user';
import book from 'api/routes/book';
import auth from 'api/routes/auth';
//import authCheck from 'lib/middleware/authCheck';
import express from 'express';
import authCheck from '../lib/middleware/authCheck';

const router = express.Router();

router.use('/auth', auth);
router.use('/auth2',authCheck(), auth)
//router.use('/user', authCheck(), user);
//router.use('/book', authCheck(), book);

export default router;


