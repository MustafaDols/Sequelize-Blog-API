import { DataTypes, Model } from 'sequelize';
import {sequelize} from '../db.connection.js';
import { Post } from './post.model.js';
import { User } from "./user.model.js";

export class Comment extends Model {
  commentId() {
    return this.getDataValue('id');
  }
}

Comment.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: 'comment_id'
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'fk_post_id'
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'fk_user_id'
  }
}, {
  sequelize,
  modelName: 'Comment',
  freezeTableName: true,
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});


User.hasMany(Comment, {
  foreignKey: {
    name: "userId",
    field: "fk_user_id",
    type: DataTypes.INTEGER,
    allowNull: false
  },
  constraints: true,
  foreignKeyConstraint: true,
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

Comment.belongsTo(User, {
  as: "UserData",
  foreignKey: {
    name: "userId",
    field: "fk_user_id",
    type: DataTypes.INTEGER,
    allowNull: false
  },
  constraints: true,
  foreignKeyConstraint: true
});

Post.hasMany(Comment, {
  foreignKey: {
    name: "postId",
    field: "fk_post_id",
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  constraints: true,
  foreignKeyConstraint: true,
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Comment.belongsTo(Post, {
  as: "PostData",
  foreignKey: {
    name: "postId",
    field: "fk_post_id",
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  constraints: true,
  foreignKeyConstraint: true,
});



export default Comment;
