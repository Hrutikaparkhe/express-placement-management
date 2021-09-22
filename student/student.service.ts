import { IStudent, IStudentUpdate } from "./student.types";
import studentRepo from "./student.repo";
import { EStudentResponse, StuentResponse } from "./student.response";

const get = async () => {
  const data = await studentRepo.find();
  return data;
};

const create = async (student: IStudent) => {
  const data = await studentRepo.create(student);
  return {
    ...StuentResponse[EStudentResponse.STUDENT_ADD_SUCCESS],
    data: data,
  };
};

const getOne = async (id: number) => {
  const result = await studentRepo.getOne(id);
  if (!result) return { messsage: "Not Found" };
  return result;
};
const update = async (student: IStudentUpdate) => {
  try {
    const isExists = await studentRepo.getOne(student.id);
    if (!isExists) return { messsage: "Not Found" };
    const result = await studentRepo.update(student);
    if (result) return StuentResponse[EStudentResponse.STUDENT_UPDATE_SUCCESS];
  } catch (error) {
    throw { error: error, message: "Failed To Update" };
  }
};

export default {
  create,
  getOne,
  get,
  update,
};
