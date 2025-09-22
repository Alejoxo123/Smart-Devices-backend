const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const routes = require('./routes');
const { errorHandler } = require('./middlewares/error.middleware');

dotenv.config();

const app = express();
app.use(express.json());

const origin = process.env.ALLOWED_ORIGIN || 'http://localhost:4200';
app.use(cors({ origin, credentials: true }));

app.get('/health', (_req, res) => res.json({ ok: true }));
app.use('/api', routes);
app.use(errorHandler);

module.exports = app;
