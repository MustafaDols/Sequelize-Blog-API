import express from 'express';
import UserRouter from './Modules/User/user.controller.js';
import PostRouter from './Modules/Post/post.controller.js';
import CommentRouter from './Modules/Comment/comment.controller.js';
import { dbconnection } from './DB/db.connection.js';
import { User } from './DB/Models/user.model.js';
import { Post } from './DB/Models/post.model.js';
import { Comment } from './DB/Models/comment.model.js';

const PORT = 3000;

const app = express();

app.use(express.json());

await dbconnection();  



app.use('/users', UserRouter);
app.use('/post', PostRouter);
app.use('/comment', CommentRouter);

app.use((req, res) => res.status(404).json(
    { error: 'Router not found' }
));

app.use((error, req, res) => res.status(500).json(
    { error: error.message }
));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});