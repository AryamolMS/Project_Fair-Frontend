import { commonAPI } from "./commonAPI"
import {base_URL} from "./baseUrl"

//register api


export const registerAPI = async(user)=>{
   return await commonAPI('POST',`${base_URL}/user/register`,user,"")
}

//login api
export const loginAPI = async(user)=>{
  return await commonAPI('POST',`${base_URL}/user/login`,user,"")
}

//addproject api
export const addprojectAPI = async(reqbody,reqHeader)=>{
  return await commonAPI('POST',`${base_URL}/project/add`,reqbody,reqHeader)
}

//home project
export const homeProjectAPI = async()=>{
  return await commonAPI('GET',`${base_URL}/projects/home-project`)
}

//all projects
export const allProjectAPI = async(searchKey,reqHeader)=>{
  return await commonAPI('GET',`${base_URL}/projects/all-project?search=${searchKey}`,"",reqHeader)
}

//user project
export const userProjectAPI = async(reqHeader)=>{
  return await commonAPI('GET',`${base_URL}/user/user-project`,"",reqHeader)
}

//edit project
export const editProjectAPI = async(projectId,reqBody,reqHeader)=>{
  return await commonAPI('PUT',`${base_URL}/user-project/edit/${projectId}`,reqBody,reqHeader)
}

//delete project
export const deleteProjectAPI = async(projectId,reqHeader)=>{
  return await commonAPI('DELETE',`${base_URL}/user-project/remove/${projectId}`,{},reqHeader)
}

//edit profile
export const editProfileAPI = async(reqBody,reqHeader)=>{
  return await commonAPI('PUT',`${base_URL}/user-project/edit`,reqBody,reqHeader)
}