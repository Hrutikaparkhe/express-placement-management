
import { User } from "./user.schema";
import { IUser } from "./user.types";

const find = async () => {
    const result = await User.findAll({attributes:['id','name','email']});
    return result;
}

const getOne = async (email: string) => {
    const user = await User.findOne({ where: { email: email }});

    return user;
};

const getOneById = async (id: number) => {

    const user = await User.findOne({where:{id:id}});
    console.log(user);

    return user;
};

const create = async (user: IUser) => {
    const result = await User.create(user,{raw:true}).then(savedUser=>{
        return savedUser.get('id');
    });
    return result;

}

export default {
    find,
    create,
    getOneById,
    getOne,
}