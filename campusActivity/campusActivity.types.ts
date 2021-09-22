import { IStudent } from "../student/student.types";

export interface ICampusActivity {
    company_name: string;
    domain: string;
    noOfStudents: number;
    noOfVacancies:number;
    students:IStudent[];
}

export interface IStudentCampusActivity {
    StudentId: number;
    CampusActivityId: number;

}