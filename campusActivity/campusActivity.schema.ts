import { DataTypes } from "sequelize";
import postgres from "../connections/postgres.config";
import { Student } from "../student/student.schema";

export const CampusActivity = postgres.define('CampusActivity', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    company_name: {
        type: DataTypes.STRING
    },
    domain: {
        type: DataTypes.STRING
    },
    noOfStudents: {
        type: DataTypes.INTEGER
    },
    noOfVacancies: {
        type: DataTypes.INTEGER
    },
}, {
    tableName: 'CampusActivity',
    timestamps: false
});
Student.belongsToMany(CampusActivity, { through: 'Student_CampusActivity' });
CampusActivity.belongsToMany(Student, { through: 'Student_CampusActivity' });
