// initDB.js
import sequelize, { connectToDB } from './db.js';
import User from '../models/users.js';
import Product from '../models/products.js';

export async function initDB() {
  await connectToDB(); // authenticate

  try {
    await sequelize.sync({ alter: true }); // or { force: true }
    console.log('✅ All models were synchronized successfully.');
  } catch (error) {
    console.error('❌ Sequelize sync error:', error);
  }
}
