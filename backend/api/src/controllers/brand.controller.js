const { Brand } = require('../db');
exports.list = async (_req, res) => res.json(await Brand.findAll({ order: [['name','ASC']] }));
exports.create = async (req, res) => res.status(201).json(await Brand.create(req.body));
exports.update = async (req, res) => { await Brand.update(req.body, { where: { id: req.params.id }}); res.json(await Brand.findByPk(req.params.id)); };
exports.remove = async (req, res) => { await Brand.destroy({ where: { id: req.params.id }}); res.status(204).send(); };
