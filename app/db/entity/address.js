import DataTypes from "sequelize";
export default {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    address_1: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    address_2: {
        type: DataTypes.TEXT,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    region: {
        type: DataTypes.STRING,
        allowNull: false
    },
    postal_code: {
        type: DataTypes.INTEGER,
        allowNull: false,
        len: [6, 6]
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false
    },
};