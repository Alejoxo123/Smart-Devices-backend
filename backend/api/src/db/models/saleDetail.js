const { DataTypes } = require('sequelize');

module.exports = (sequelize) => sequelize.define('SaleDetail', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    saleId: { type: DataTypes.INTEGER, allowNull: false },
    deviceId: { type: DataTypes.STRING(50), allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    unitPrice: { type: DataTypes.BIGINT, allowNull: false },
    subtotal: { type: DataTypes.BIGINT, allowNull: false },
}, {
    tableName: 'sale_details',
    timestamps: false,
});
