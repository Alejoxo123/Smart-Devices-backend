const { DataTypes } = require('sequelize');
module.exports = (sequelize) => sequelize.define('DeviceImage', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    deviceId: { type: DataTypes.STRING(50) },
    url: { type: DataTypes.STRING(500), allowNull: false },
    isCover: { type: DataTypes.BOOLEAN, defaultValue: false },
}, {
    tableName: 'device_images',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
});
