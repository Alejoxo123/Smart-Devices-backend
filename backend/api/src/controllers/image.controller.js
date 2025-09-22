const { DeviceImage, sequelize } = require('../db');

/**
 * Lista imágenes (opcional: ?deviceId=xxx)
 */
exports.list = async (req, res) => {
    const { deviceId } = req.query;
    const where = {};
    if (deviceId) where.deviceId = deviceId;

    const items = await DeviceImage.findAll({
        where,
        order: [['isCover', 'DESC'], ['id', 'ASC']],
    });
    res.json(items);
};

exports.get = async (req, res) => {
    const item = await DeviceImage.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
};

/**
 * Crea imagen. Si isCover = true, asegura que sea la única portada del device.
 * Body: { deviceId, url, isCover? }
 */
exports.create = async (req, res) => {
    const { deviceId, url, isCover } = req.body;
    if (!deviceId || !url) return res.status(400).json({ error: 'deviceId y url son requeridos' });

    if (isCover) {
        const t = await sequelize.transaction();
        try {
            await DeviceImage.update({ isCover: false }, { where: { deviceId }, transaction: t });
            const created = await DeviceImage.create({ deviceId, url, isCover: true }, { transaction: t });
            await t.commit();
            return res.status(201).json(created);
        } catch (e) {
            await t.rollback();
            throw e;
        }
    } else {
        const created = await DeviceImage.create({ deviceId, url, isCover: !!isCover });
        return res.status(201).json(created);
    }
};

/**
 * Actualiza imagen. Si pasas isCover=true, convierte esta en portada única.
 * Body: { url?, isCover? }
 */
exports.update = async (req, res) => {
    const id = req.params.id;
    const img = await DeviceImage.findByPk(id);
    if (!img) return res.status(404).json({ error: 'Not found' });

    const { url, isCover } = req.body;

    if (isCover === true) {
        const t = await sequelize.transaction();
        try {
            await DeviceImage.update({ isCover: false }, { where: { deviceId: img.deviceId }, transaction: t });
            await img.update({ url: url ?? img.url, isCover: true }, { transaction: t });
            await t.commit();
        } catch (e) {
            await t.rollback();
            throw e;
        }
    } else {
        await img.update({ url: url ?? img.url, isCover: isCover ?? img.isCover });
    }

    const updated = await DeviceImage.findByPk(id);
    res.json(updated);
};

exports.remove = async (req, res) => {
    await DeviceImage.destroy({ where: { id: req.params.id } });
    res.status(204).send();
};
