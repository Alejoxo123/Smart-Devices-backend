const { DataTypes } = require('sequelize');

module.exports = (sequelize) => sequelize.define('Customer', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(150), allowNull: false },
    email: { type: DataTypes.STRING(150), unique: true },
    phone: { type: DataTypes.STRING(30) },
}, {
    tableName: 'customers',
    timestamps: true,       // tienes createdAt / updatedAt en la tabla
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
});
