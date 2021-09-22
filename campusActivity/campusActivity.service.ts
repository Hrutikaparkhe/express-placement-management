import { ICampusActivity } from "./campusActivity.types";
import campusActivityRepo from "./campusActivity.repo";

const get = async () => {

    const data = await campusActivityRepo.find();
    return data;
}


const create = async (campusActivity: ICampusActivity) => {

    const data = await campusActivityRepo.create(campusActivity);
    return data;
}

const getOne = async (id: number) => {
    const result = await campusActivityRepo.getOne(id);
    if (!result)
        return { messsage: "Not Found" };
    return result;
}


export default {
    create,
    getOne,
    get
}

