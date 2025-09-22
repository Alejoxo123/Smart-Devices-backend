const { Device, Brand, Category, DeviceImage, Tag } = require('../db');
const { Op } = require('sequelize');

exports.list = async (req, res) => {
    const { brandId, categoryId, q, order, page = 1, pageSize = 20 } = req.query;

    const where = {};
    if (brandId && brandId !== 'all') where.brandId = brandId;
    if (categoryId && categoryId !== 'all') where.categoryId = categoryId;
    if (q) {
        where[Op.or] = [
            { name: { [Op.like]: `%${q}%` } },
            { description: { [Op.like]: `%${q}%` } },
        ];
    }

    let orderBy = [['releaseDate', 'DESC']];
    if (order === 'price_asc') orderBy = [['priceCOP', 'ASC']];
    if (order === 'price_desc') orderBy = [['priceCOP', 'DESC']];

    const limit = Math.min(100, Math.max(1, Number(pageSize)));
    const offset = (Math.max(1, Number(page)) - 1) * limit;

    const items = await Device.findAll({
        where,
        include: [
            { model: DeviceImage, as: 'images' },
            { model: Brand, attributes: ['id', 'name'] },
            { model: Category, attributes: ['id', 'name'] },
            { model: Tag, as: 'tags', through: { attributes: [] } },
        ],
        order: orderBy,
        limit,
        offset,
    });

    res.json(items);
};

exports.get = async (req, res) => {
    const item = await Device.findByPk(req.params.id, {
        include: [
            { model: DeviceImage, as: 'images' },
            { model: Brand, attributes: ['id', 'name'] },
            { model: Category, attributes: ['id', 'name'] },
        ],
    });
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
};

exports.create = async (req, res) => {
    const created = await Device.create(req.body);
    res.status(201).json(created);
};

exports.update = async (req, res) => {
    await Device.update(req.body, { where: { id: req.params.id } });
    const updated = await Device.findByPk(req.params.id);
    res.json(updated);
};

exports.remove = async (req, res) => {
    await Device.destroy({ where: { id: req.params.id } });
    res.status(204).send();
};
