import { ICredentials, IUser } from "./user.types";
import userRepo from "./user.repo";
import { compare, genSalt, hash } from "bcrypt";
import { EUserResponse, UserResponse } from "./user.response";
import { sign } from "jsonwebtoken";
import multer from "multer";
const getAll = async () => {
  try {
    const data = await userRepo.find();
    return data;
  } catch (error) {
    throw UserResponse[EUserResponse.BAD_REQUEST];
  }
};

const getByEmail = async (email: string) => {
  try {
    const data = await userRepo.getOne(email);
    return data;
  } catch (error) {
    throw UserResponse[EUserResponse.BAD_REQUEST];
  }
};

const getById = async (id: number) => {
  try {
    const data = await userRepo.getOneById(id);
    return data;
  } catch (error) {
    throw UserResponse[EUserResponse.BAD_REQUEST];
  }
};

const create = async (user: IUser) => {
  try {
    console.log(user)
    //Search for an existing user with the supplied email - to make sure same email is only used once
    const userExists = await userRepo.getOne(user.email);

    if (userExists) throw UserResponse[EUserResponse.USER_ALREADY_REGISTERED];

    // change the password to in encrypted format
    const salt = await genSalt(10);
    const hashedPassword = await hash(user.password, salt);

    user.password = hashedPassword;
console.log(user.password)
console.log(hashedPassword)
    const response = await userRepo.create(user);

    return response;
  } catch (error) {
    throw UserResponse[EUserResponse.BAD_REQUEST];
  }
};

const login = async (credentials: ICredentials) => {
  try {
    // 1. if the user with the email exists
    const user = await userRepo.getOne(credentials.email);

    if (!user) {
      // throw an error
      throw UserResponse[EUserResponse.LOGIN_FAILED];
    }
    // 2. compare the passwords
    const didMatch = await compare(
      credentials.password,
      user.get("password") as string
    );

    if (!didMatch) {
      // throw an error
      throw UserResponse[EUserResponse.LOGIN_FAILED];
    }

    const { password, ...payload } = user as any;

    const token = sign(payload, process.env.SECRET_KEY || "", {
      expiresIn: "24h",
    });

    // 3. send out the response
    return { ...UserResponse[EUserResponse.LOGIN_SUCCESS], token };
  } catch (error) {
    throw UserResponse[EUserResponse.BAD_REQUEST];
  }
};


export default {
  create,
  getAll,
  getById,
  login,
  getByEmail,
};
