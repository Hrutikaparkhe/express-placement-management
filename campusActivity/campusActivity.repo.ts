import {
  ICampusActivity,
  IStudentCampusActivity,
  IUpdateCampusActivity,
} from "./campusActivity.types";
import { CampusActivity } from "./campusActivity.schema";
import { Student } from "../student/student.schema";
import { Student_CampusActivity } from "../student_campusActivity/campusActivity.schema";
import { IStudent } from "../student/student.types";

const find = async () => {
  const result = await CampusActivity.findAll({
    include: [
      {
        model: Student,
        through: {
          attributes: [],
        },
      },
    ],
  });
  return result;
};

const getOne = async (id: number) => {
  const campusActivity = await CampusActivity.findOne({
    where: { id: id },
    include: [
      {
        model: Student,
        through: {
          attributes: [],
        },
      },
    ],
  });

  return campusActivity;
};

const create = async (campusActivity: ICampusActivity) => {
  try {
    let student_campusActivityData: IStudentCampusActivity[] = [];

    // Destructure data from reequest object to insert record to tables.
    //students-->  students data in cammpus activity(Many to Many)
    //campus activity ---> campus activity data(Many to Many)

    const { students, ...campusActivityData } = campusActivity;
    const result = await CampusActivity.create(campusActivityData);
    //insert students array data into students table
    // create an array to insert mapping datato the third table
    students.forEach((data) => {
      student_campusActivityData.push({
        CampusActivityId: result.get("id") as number,
        StudentId: data as number,
      });
    });
    //insert record to the third table
    const responeFromStu_CampActivity = await Student_CampusActivity.bulkCreate(
      student_campusActivityData
    );
    return true;
  } catch (error) {
    console.log(error);
  }
};

const update = async (campusActivity: IUpdateCampusActivity) => {
  const result = await CampusActivity.update(campusActivity,{ where: { id: campusActivity.id } });
  return result;

}

export default {
  find,
  create,
  getOne,
  update
};
