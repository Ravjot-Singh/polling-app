import {Router} from 'express';
import { verifyJWT } from '../middlewares/Auth.middlewares.js';
import { registerUser , loginUser , logoutUser , refreshAccessToken, getCurrentUser } from '../controllers/Auth.controllers.js';
import { createPoll , getActivePolls , getAllPolls, getYourPolls } from '../controllers/Poll.controllers.js';

const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(verifyJWT , logoutUser);
router.route('/refresh-token').post(refreshAccessToken);
router.route('/me').get(verifyJWT , getCurrentUser);


router.route('/create-new-poll').post(verifyJWT , createPoll);
router.route('/get-all-polls').get(getAllPolls);
router.route('/get-active-polls').get(getActivePolls);
router.route('/get-your-polls').get(verifyJWT , getYourPolls)




export default router;