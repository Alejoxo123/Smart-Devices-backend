const { DataTypes } = require('sequelize');
module.exports = (sequelize) => sequelize.define('Brand', {
    id: { type: DataTypes.STRING(50), primaryKey: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
}, {
    tableName: 'brands',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
});
