const { DataTypes } = require('sequelize');
module.exports = (sequelize) => sequelize.define('Comment', {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    deviceId: { type: DataTypes.STRING(50), allowNull: false },
    userId: { type: DataTypes.INTEGER },
    author: { type: DataTypes.STRING(150) },
    body: { type: DataTypes.TEXT, allowNull: false },
    rating: { type: DataTypes.TINYINT, allowNull: false }, // validar 1..5 en controller
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
    tableName: 'comments',
    updatedAt: false,
});
