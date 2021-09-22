
import { Student } from "./student.schema";
import { IStudent } from "./student.types";

const find = async () => {
    const result = await Student.findAll();
    return result;
}

const getOne = async (id: number) => {
    const student = await Student.findOne({ where: { id: id } });
    return student;
};

const create = async (student: IStudent) => {
    const result = await Student.create(student);
    return result;

}
export default {
    find,
    create,
    getOne
}