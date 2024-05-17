import { Sequelize } from "sequelize"

const sequelize = new Sequelize('sunshine', 'sa', '123', {
    host: 'localhost',
    dialect: 'mssql',
    port:49825,
    dialectOptions: {
        options: {
            encrypt: false,
        }
    }
});

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;