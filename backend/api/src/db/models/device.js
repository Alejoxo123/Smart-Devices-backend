const { DataTypes } = require('sequelize');
module.exports = (sequelize) => sequelize.define('Device', {
    id: { type: DataTypes.STRING(50), primaryKey: true },
    name: { type: DataTypes.STRING(200), allowNull: false },
    brandId: { type: DataTypes.STRING(50) },
    categoryId: { type: DataTypes.STRING(50) },
    releaseDate: { type: DataTypes.DATEONLY },
    priceCOP: { type: DataTypes.BIGINT }, // o DECIMAL(12,2) si cambias en BD
    description: { type: DataTypes.TEXT },
    specs: { type: DataTypes.JSON },
}, {
    tableName: 'devices',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
});
