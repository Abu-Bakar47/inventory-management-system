
import { axiosInstance } from "./axiosInterseptor"

export interface registerDetails{
    name:string;
    email:string;
    mobile:string;
    password:string;
    address:string;
    storeName:string;
    acceptedTerms:boolean
}

export interface loginDetails {
    email:string,
    password:string
}


export const registerationFn=(registerData:registerDetails) =>{
    return axiosInstance.post("/auth/register",registerData)
}

export const loginFn =(loginData:loginDetails) => {
    return axiosInstance.post("/auth/login",loginData)

}