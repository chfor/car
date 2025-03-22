const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Vehicle = sequelize.define('Vehicle', {
  licensePlate: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  firstRegistrationDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  mileage: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  compulsoryInsurance: {
    type: DataTypes.STRING,
  },
  commercialInsurance: {
    type: DataTypes.STRING,
  },
  vehicleType: {
    type: DataTypes.ENUM('营运', '非营运'),
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  soldStatus: {
    type: DataTypes.ENUM('已出售', '未出售'),
    allowNull: false,
  },
  condition: {
    type: DataTypes.ENUM('精品', '普通'),
    allowNull: false,
  },
});

module.exports = Vehicle;
