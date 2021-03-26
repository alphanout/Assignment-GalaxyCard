import DataTypes from "sequelize";
export default {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    review: {
        type: DataTypes.TEXT,
        allowNull: false
    },
};