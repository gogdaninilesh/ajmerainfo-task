const DataTypes = require("sequelize");
const sequelize = require("../database/sequelize");

const attributs = {
    id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    mobile: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    profile: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    role: {
        type: DataTypes.INTEGER(1),
        allowNull: true,
        defaultValue: 1,
        comment: "1=admin, 2=user"
    },
    status: {
        type: DataTypes.INTEGER(1),
        allowNull: true,
        defaultValue: 1,
        comment: "1=active, 0=inactive, 2=deleted"
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
}

const options = {
    tableName: "users",
    timestamps: true
}

const Users = sequelize.define("Users", attributs, options);
module.exports = Users;