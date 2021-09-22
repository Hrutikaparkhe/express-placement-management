
import { CampusActivity } from "../campusActivity/campusActivity.schema";
import { Student } from "../student/student.schema";
import { Student_CampusActivity } from "../student_campusActivity/campusActivity.schema";

import postgres from "./postgres.config";

export const connectToPostgres = async () => {
    try {
        await postgres.authenticate();
        await Student.sync();
        await CampusActivity.sync();
        await Student_CampusActivity.sync();
        console.log('POSTGRES CONNECTED SUCCESSFULLY');

        return true;
    } catch (e) {
        console.log(e);
        throw { message: 'COULD NOT CONNECT TO POSTGRES' }
    }
}

