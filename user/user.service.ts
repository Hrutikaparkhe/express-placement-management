import { ICredentials, IUser } from "./user.types";
import userRepo from "./user.repo";
import { compare, genSalt, hash } from "bcrypt";
import { EUserResponse, UserResponse } from "./user.response";
import { sign } from "jsonwebtoken";

const get = async () => {
  const data = await userRepo.find();

  return data;
};

const create = async (user: IUser) => {
  //Search for an existing user with the supplied email - to make sure same email is only used once
  const userExists = await userRepo.getOne(user.email);
  if (userExists) throw UserResponse[EUserResponse.USER_ALREADY_REGISTERED];

  // change the password to in encrypted format
  const salt = await genSalt(10);
  const hashedPassword = await hash(user.password, salt);

  user.password = hashedPassword;

  const response = await userRepo.create(user);

  return response;
};

const login = async (credentials: ICredentials) => {
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

  const token = sign(payload, process.env.SECRET_KEY || "");

  // 3. send out the response
  return { ...UserResponse[EUserResponse.LOGIN_SUCCESS], token };
};

export default {
  create,
  get,
  login,
};
