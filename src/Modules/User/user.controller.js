import { Router } from 'express';
import * as services from './Services/user.service.js';

const userRouter = Router();
userRouter.post('/signUp',services.signUp);
userRouter.put('/createOrUpdate/:id',services.CreateOrUpdate);
userRouter.get('/byEmail',services.getUserByEmail);
userRouter.get('/:id',services.getUserById);




export default userRouter;