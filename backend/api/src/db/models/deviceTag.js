const { DataTypes } = require('sequelize');
module.exports = (sequelize) => sequelize.define('DeviceTag', {
    deviceId: { type: DataTypes.STRING(50), primaryKey: true },
    tagId: { type: DataTypes.INTEGER, primaryKey: true },
}, {
    tableName: 'device_tags',
    timestamps: false,
});
