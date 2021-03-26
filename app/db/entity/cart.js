import DataTypes from "sequelize";
export default {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        // autoIncrement: true,
    },

};