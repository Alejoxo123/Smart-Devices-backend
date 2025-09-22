const app = require('./app');
const { sequelize } = require('./db');

const PORT = Number(process.env.PORT) || 3000;

(async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ DB connection OK');
        app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
    } catch (err) {
        console.error('❌ DB connection failed:', err);
        process.exit(1);
    }
})();
