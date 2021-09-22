import { IStudent } from "./student.types";
import studentRepo from "./student.repo";

const get = async () => {

    const data = await studentRepo.find();
    return data;
}


const create = async (student: IStudent) => {

    const data = await studentRepo.create(student);
    return data;
}

const getOne = async (id: number) => {
    const result = await studentRepo.getOne(id);
    if (!result)
        return { messsage: "Not Found" };
    return result;
}


export default {
    create,
    getOne,
    get
}

