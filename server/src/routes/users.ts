import { addUser, signIn } from '../controllers/userController';
import { Router } from 'express'
const router = Router();

router.post("/signup", addUser);
router.post("/signin", signIn);

export default router;
