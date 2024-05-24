const Sequelize = require("sequelize");
const connection = require("../database/database");

const User = connection.define('users', {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    }, 
    sobrenome: {
        type: Sequelize.STRING,
        allowNull: false
    }, 
    identidade: {
        type: Sequelize.STRING,
        allowNull: false
    }, 
    orgEmissor: {
        type: Sequelize.STRING,
        allowNull: false
    }, 
    uf: {
        type: Sequelize.STRING,
        allowNull: false
    }, 
    cpf: {
        type: Sequelize.STRING,
        allowNull: false
    }, 
    dtNascimento: {
        type: Sequelize.DATE,
        allowNull: false
    }, 
    nomePai: {
        type: Sequelize.STRING,
        allowNull: false
    }, 
    nomeMae: {
        type: Sequelize.STRING,
        allowNull: false
    }, 
    permissao: {
        type: Sequelize.STRING,
        allowNull: false
    }, 
    acc: {
        type: Sequelize.STRING,
        allowNull: false
    }, 
    img: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// User.sync({forse: true});

module.exports = User;