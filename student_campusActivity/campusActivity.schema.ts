import { DataTypes } from "sequelize";
import { CampusActivity } from "../campusActivity/campusActivity.schema";
import postgres from "../connections/postgres.config";
import { Student } from "../student/student.schema";

export const Student_CampusActivity = postgres.define('Student_CampusActivity', {}, { timestamps: false });
Student.belongsToMany(CampusActivity, { through: 'Student_CampusActivity' });
CampusActivity.belongsToMany(Student, { through: 'Student_CampusActivity' });
