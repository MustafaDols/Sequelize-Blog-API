import { Router } from 'express';
import * as services from './Services/post.service.js';

const postRouter = Router();

postRouter.post('/create',services.createPost)
postRouter.delete('/deletePost/:postId',services.deletePost)
postRouter.get('/details', services.getPostDetails);
postRouter.get('/comment-count', services.getPostsWithCommentCount);


export default postRouter;