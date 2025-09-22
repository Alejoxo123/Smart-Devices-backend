const { Tag, DeviceTag } = require('../db');

exports.list = async (_req, res) => {
    const items = await Tag.findAll({ order: [['name', 'ASC']] });
    res.json(items);
};

exports.get = async (req, res) => {
    const item = await Tag.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
};

exports.create = async (req, res) => {
    const created = await Tag.create(req.body); // { name }
    res.status(201).json(created);
};

exports.update = async (req, res) => {
    await Tag.update(req.body, { where: { id: req.params.id } });
    const updated = await Tag.findByPk(req.params.id);
    res.json(updated);
};

exports.remove = async (req, res) => {
    await Tag.destroy({ where: { id: req.params.id } });
    res.status(204).send();
};

/** Asignar/retirar tag a un device (admin) */
exports.attachToDevice = async (req, res) => {
    const { id, deviceId } = req.params; // id = tagId
    await DeviceTag.findOrCreate({ where: { tagId: id, deviceId } });
    res.status(204).send();
};

exports.detachFromDevice = async (req, res) => {
    const { id, deviceId } = req.params; // id = tagId
    await DeviceTag.destroy({ where: { tagId: id, deviceId } });
    res.status(204).send();
};
