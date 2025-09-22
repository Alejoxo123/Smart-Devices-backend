const { DataTypes } = require('sequelize');
module.exports = (sequelize) => sequelize.define('Tag', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(150), unique: true, allowNull: false },
}, {
    tableName: 'tags',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
});
