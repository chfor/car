const sequelize = require('../config/database');
const User = require('../models/User');
const Vehicle = require('../models/Vehicle');

async function initializeDatabase() {
  try {
    // 同步数据库结构
    await sequelize.sync({ force: true });
    console.log('数据库结构已初始化');

    // 创建超级管理员账户
    const superAdmin = await User.create({
      username: 'admin',
      password: 'admin123',
      role: 'superadmin',
      email: 'chfor@qq.com'  // 使用您的邮箱
    });
    console.log('超级管理员账户已创建');

    // 创建测试车辆数据
    await Vehicle.create({
      licensePlate: '京A12345',
      firstRegistrationDate: '2023-01-01',
      mileage: 10000.50,
      compulsoryInsurance: '2024-12-31',
      commercialInsurance: '2024-12-31',
      vehicleType: '非营运',
      price: 150000.00,
      soldStatus: '未出售',
      condition: '精品'
    });
    console.log('测试车辆数据已创建');

    console.log('数据库初始化完成');
  } catch (error) {
    console.error('数据库初始化失败:', error);
    process.exit(1);
  }
}

initializeDatabase();
