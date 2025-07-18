import { Router } from 'express';
import * as services from './Services/comment.services.js';

const commentRouter = Router();

commentRouter.post('/comments', services.createComments)
commentRouter.patch('/:commentId', services.updateCommentContent)
commentRouter.post('/find-or-create', services.findOrCreateComment);
commentRouter.get('/search', services.searchCommentsByWord);
commentRouter.get('/newest/:postId', services.getRecentCommentsForPost);
commentRouter.get('/details/:id', services.getCommentDetails);

export default commentRouter;