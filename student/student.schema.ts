import { DataTypes } from "sequelize";
import postgres from "../connections/postgres.config";

export const Student = postgres.define('Student', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    year: {
        type: DataTypes.INTEGER
    },
    avg: {
        type: DataTypes.INTEGER
    },
    file:{
        type:DataTypes.STRING
    }
}, {
    tableName: 'Student',
    timestamps: false
});

