
import { ICampusActivity, IStudentCampusActivity } from "./campusActivity.types";
import { CampusActivity } from "./campusActivity.schema";
import { Student } from "../student/student.schema";
import { Student_CampusActivity } from "../student_campusActivity/campusActivity.schema";
import { IStudent } from "../student/student.types";

const find = async () => {
    const result = await CampusActivity.findAll();
    return result;
}

const getOne = async (id: number) => {
    const campusActivity = await CampusActivity.findOne({ where: { id: id } });

    return campusActivity;
};

const create = async (campusActivity: ICampusActivity) => {
    try {
        let student_campusActivityData:IStudentCampusActivity[]=[];
        const {students,...campusActivityData}=campusActivity;
        const result = await CampusActivity.create(campusActivityData);
        console.log(result.get("id"));
        // await addStudent(students,result.get('id')as number);
        const responseFromStudent=await Student.bulkCreate(students);
       
        responseFromStudent.forEach((data)=>{
            student_campusActivityData.push({
                CampusActivityId:result.get("id") as number,
                StudentId:data.get('id')as number,
            })
        });
        const responeFromStu_CampActivity=await Student_CampusActivity.bulkCreate(student_campusActivityData);
        return responeFromStu_CampActivity;
    } catch (error) {
        console.log(error);
    }

}
// const addStudent=async (student:IStudent[],campusActivityId:number) => {
//     try {
      
       
//         student.forEach(async (studentData)=>{
//             const student= await Student.create(studentData);
//             student_campusActivityData.CampusActivityId=campusActivityId;
//             student_campusActivityData.StudentId=student.get('id')as number;
//             console.log(student_campusActivityData);
//             await Student_CampusActivity.create(student_campusActivityData);
//         })
//         return true;
//     } catch (error) {
//         console.log(error);
//     }

// }
export default {
    find,
    create,
    getOne
}