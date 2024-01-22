import { LoginParamsInput, getByIdParamsInput } from "../schema/user.schema";
import { getAllUsers, getUserById, login } from "../services/user.services";


export const loginHandler = async ({
  inputData,
}: {
  inputData: LoginParamsInput;
}) => {
  return await login(inputData)
}

export const getUserByIdHandler = async ({
  inputData,
}: {
  inputData: getByIdParamsInput;
}) => {
  return await getUserById(inputData)
}



export const getAllUsersHandler = async () => {
  return await getAllUsers()
}