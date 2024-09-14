import axios from "./Axios";

export interface UserLogin {
    email: string
    password: string
}
export async function loginUser(values:UserLogin) {
    console.log("there")
    return await axios.post(`/login`, values, {
        withCredentials: true,
    });
}
export interface UserRegister {
    name: string
    email: string
    password: string
    confirmPassword: string
}
export async function registerUser(values:UserRegister) {
    return await axios.post(`/register`, values, {
        withCredentials: true,
    });
}