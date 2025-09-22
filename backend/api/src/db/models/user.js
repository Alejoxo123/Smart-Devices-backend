const { DataTypes } = require('sequelize');
module.exports = (sequelize) => sequelize.define('User', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(150) },
    email: { type: DataTypes.STRING(150), unique: true, allowNull: false },
    password: { type: DataTypes.STRING(255), allowNull: false },
    role: { type: DataTypes.STRING(20), allowNull: false, defaultValue: 'user' },
}, {
    tableName: 'users',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
});
