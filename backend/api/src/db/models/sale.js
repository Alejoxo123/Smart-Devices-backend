const { DataTypes } = require('sequelize');

module.exports = (sequelize) => sequelize.define('Sale', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    customerId: { type: DataTypes.INTEGER, allowNull: true },
    total: { type: DataTypes.BIGINT, allowNull: false },
    saleDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
    tableName: 'sales',
    timestamps: false,      // tu tabla no tiene createdAt/updatedAt
});
