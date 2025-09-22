const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'mysql',
    logging: false,
});

const Brand = require('./models/brand')(sequelize);
const Category = require('./models/category')(sequelize);
const Device = require('./models/device')(sequelize);
const DeviceImage = require('./models/deviceImage')(sequelize);
const Tag = require('./models/tag')(sequelize);
const DeviceTag = require('./models/deviceTag')(sequelize);
const User = require('./models/user')(sequelize);
const Comment = require('./models/comment')(sequelize);
const Customer = require('./models/customer')(sequelize);
const Sale = require('./models/sale')(sequelize);
const SaleDetail = require('./models/saleDetail')(sequelize);

/** Asociaciones */

// Brand 1:N Device
Brand.hasMany(Device, { foreignKey: 'brandId', sourceKey: 'id' });
Device.belongsTo(Brand, { foreignKey: 'brandId', targetKey: 'id' });

// Category 1:N Device
Category.hasMany(Device, { foreignKey: 'categoryId', sourceKey: 'id' });
Device.belongsTo(Category, { foreignKey: 'categoryId', targetKey: 'id' });

// Device 1:N DeviceImage
Device.hasMany(DeviceImage, { foreignKey: 'deviceId', sourceKey: 'id', as: 'images' });
DeviceImage.belongsTo(Device, { foreignKey: 'deviceId', targetKey: 'id' });

// Device N:M Tag
Device.belongsToMany(Tag, { through: DeviceTag, foreignKey: 'deviceId', otherKey: 'tagId', as: 'tags' });
Tag.belongsToMany(Device, { through: DeviceTag, foreignKey: 'tagId', otherKey: 'deviceId' });

// Device 1:N Comment
Device.hasMany(Comment, { foreignKey: 'deviceId', sourceKey: 'id', as: 'comments' });
Comment.belongsTo(Device, { foreignKey: 'deviceId', targetKey: 'id' });

// User 1:N Comment
User.hasMany(Comment, { foreignKey: 'userId', as: 'userComments' });
Comment.belongsTo(User, { foreignKey: 'userId' });

// Customer 1:N Sale, Sale 1:N SaleDetail, SaleDetail N:1 Device
Customer.hasMany(Sale, { foreignKey: 'customerId' });
Sale.belongsTo(Customer, { foreignKey: 'customerId' });

Sale.hasMany(SaleDetail, { foreignKey: 'saleId', as: 'details' });
SaleDetail.belongsTo(Sale, { foreignKey: 'saleId' });

Device.hasMany(SaleDetail, { foreignKey: 'deviceId' });
SaleDetail.belongsTo(Device, { foreignKey: 'deviceId' });

module.exports = {
    sequelize,
    Brand, Category, Device, DeviceImage, Tag, DeviceTag, User, Comment,
    Customer, Sale, SaleDetail,
};
