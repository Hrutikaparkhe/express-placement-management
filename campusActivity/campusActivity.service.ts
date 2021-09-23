import { ICampusActivity } from "./campusActivity.types";
import campusActivityRepo from "./campusActivity.repo";
import { CampusActivityResponse, ECampusActivityResponse } from "./campusActivity.response";

const get = async () => {

    const data = await campusActivityRepo.find();
    return data;
}


const create = async (campusActivity: ICampusActivity) => {

    const response = await campusActivityRepo.create(campusActivity);
    if(response)
    
    return CampusActivityResponse[ECampusActivityResponse.CAMPUS_ACTIVITY_ADD_SUCCESS];
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

