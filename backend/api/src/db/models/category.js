const { DataTypes } = require('sequelize');
module.exports = (sequelize) => sequelize.define('Category', {
    id: { type: DataTypes.STRING(50), primaryKey: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
}, {
    tableName: 'categories',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
});
