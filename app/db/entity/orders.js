import DataTypes from "sequelize";
export default {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    price: {
        type: DataTypes.INTEGER,
        validate: {
            isDecimal: true,
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        validate: {
            isDecimal: true,
        }
    },
};