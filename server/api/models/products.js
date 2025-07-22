// server/models/Product.js
import { DataTypes } from 'sequelize';
import sequelize from '../utils/db.js';
import User from './users.js';

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  ownerId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
}, {
  tableName: 'products',
  timestamps: true,
});

// Set up relation: Product belongs to User
Product.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' });
User.hasMany(Product, { foreignKey: 'ownerId', as: 'products' });

export default Product;
