const Sequelize = require("sequelize");
const connection = require("../database/database");

const User = connection.define('usersadmin', {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    login: {
        type: Sequelize.STRING,
        allowNull: false
    }, 
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// User.sync({forse: true});

module.exports = User