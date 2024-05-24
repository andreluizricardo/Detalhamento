const Sequelize = require("sequelize");
const connection = new Sequelize('detalhamento', 'root', 'foroni369', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
});


module.exports = connection;