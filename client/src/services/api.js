import axios from 'axios';
// import LOGIN from './apiConstants';
import { CREATE_TODO, DELETE_TODO, LOGIN, MARK_TODO, REGISTER, TODO_LIST } from "./apiConstants";


export const login = async(data)=>{
    return  await axios.post(LOGIN,data)
}

export const register = async(data)=>{
    return  await axios.post(REGISTER,data)
}

export const createTodoApi = async(data)=>{
    let token=getToken();
    // console.log(token,'token')
    return await axios.post(CREATE_TODO,data,{
        headers:{
            auth:token
        }
    })

}

export const getTodoListApi = async(data)=>{
    let token=getToken();
    // console.log(token,'token')
    return await axios.get(TODO_LIST,{
        headers:{
            auth:token
        }
    })

}


export function getToken(){
    let user=localStorage.getItem('user')
    if(!user) return
    const userObj=JSON.parse(user);
    return  userObj.token;
}

export const deleteTodoApi = async(data)=>{
    let token=getToken();
    // console.log(token,'token')
    return await axios.post(DELETE_TODO,data,{
        headers:{
            auth:token
        }
    })

}

export const MarkTodoApi = async(data)=>{
    let token=getToken();
    // console.log(token,'token')
    return await axios.post(MARK_TODO,data,{
        headers:{
            auth:token
        }
    })

}
