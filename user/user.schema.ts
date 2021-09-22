import { DataTypes } from "sequelize";
import postgres from "../connections/postgres.config";

export const User = postgres.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
}, {
    tableName: 'User',
    timestamps: false
}
);


