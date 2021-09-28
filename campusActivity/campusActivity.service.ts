import { ICampusActivity, IUpdateCampusActivity } from "./campusActivity.types";
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
const update = async (campusActivity: IUpdateCampusActivity) => {
    try {
      const isExists = await campusActivityRepo.getOne(campusActivity.id);
      if (!isExists) return { messsage: "Not Found" };
      const result = await campusActivityRepo.update(campusActivity);
      if (result) return CampusActivityResponse[ECampusActivityResponse.CAMPUS_ACTIVITY_UPDATE_SUCCESS];
    } catch (error) {
      throw { error: error, message: "Failed To Update" };
    }
  };

export default {
    create,
    getOne,
    get,
    update
}

