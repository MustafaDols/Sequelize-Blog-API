import { DataTypes, Model } from "sequelize";
import {sequelize} from '../db.connection.js';

export class User extends Model {
  userId() {
    return this.getDataValue("id");
  }
}

User.init(
  {
    id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: 'user_id'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        checkPasswordLength(value) {
          if (value.length <= 6) throw new Error("Password must be longer than 6 characters");
        }
      }
    },
    role: {
      type: DataTypes.ENUM("user", "admin"),
      defaultValue: "user"
    }
  },
  {
    sequelize,
    modelName: "User",
    indexes: [
      {
        name: "idx_email_unique",
        unique: true,
        fields: ["email"],
      },
    ],
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    hooks: {
      beforeCreate: (user) => {
        if (user.name.length <= 2) throw new Error("Name must be longer than 2 characters");
      }
    }
  }
);


export default User;
