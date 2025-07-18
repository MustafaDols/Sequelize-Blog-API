import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('Assignment_6', 'root', 'Mustafa#2004', {
  host: 'localhost',
  dialect: 'mysql',
});

export const dbconnection = async () => {
  try {
    await sequelize.sync({ alter: true, force: false , logging: false });
    console.log('Database connected successfully');

  } catch (error) {
    console.error('Error connecting to database:', error);
  }
}




