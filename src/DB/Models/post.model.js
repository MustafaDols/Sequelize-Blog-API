import { DataTypes, Model } from "sequelize";
import {sequelize} from '../db.connection.js';
import { User } from "./user.model.js";


export class Post extends Model {
  postId() {
    return this.getDataValue("id");
  }
}

Post.init(
  {
     id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: 'post_id'
  },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "fk_user_id"
    },
  },
  {
    sequelize,
    modelName: "Post",
    freezeTableName: true,
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  }
);


User.hasMany(Post, {
  foreignKey: {
    name: "userId",
    field: "fk_user_id",
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  constraints: true,
  foreignKeyConstraint: true,
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Post.belongsTo(User, {
  as: "UserData",
  foreignKey: {
    name: "userId",
    field: "fk_user_id",
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  constraints: true,
  foreignKeyConstraint: true,
});


export default Post;
