import { Post } from '../../../DB/Models/post.model.js';
import { User } from '../../../DB/Models/user.model.js';
import { Comment } from '../../../DB/Models/comment.model.js';

export const createPost = async (req, res) => {
  try {
    const { title, content, userId } = req.body;
    const post = new Post({ title, content, userId });
    await post.save();

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(201).json({
      message: 'Post created successfully',
      post
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;
    const post = await Post.findByPk(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    if (post.userId !== userId) {
      return res.status(403).json({ message: 'You are not authorized to delete this post' });
    }
    await post.destroy();
    res.status(200).json({ message: 'Post deleted successfully' });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getPostDetails = async (req, res) => {
  try {
    const posts = await Post.findAll({
      attributes: ['id', 'title'],
      include: [
        {
          model: User,
          as: 'UserData',
          attributes: ['id', 'name']
        },
        {
          model: Comment,
          attributes: ['id', 'content'],
        }
      ]
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPostsWithCommentCount = async (req, res) => {
  try {
    const posts = await Post.findAll({
      attributes: ['id', 'title'],
      include: [
        {
          model: Comment,
          attributes: [],
        }
      ],
      group: ['post_id'],
      raw: true,
      nest: true,
      attributes: [
        'id',
        'title',
        [Post.sequelize.fn('COUNT', Post.sequelize.col('comment_id')), 'commentCount']
      ]
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
