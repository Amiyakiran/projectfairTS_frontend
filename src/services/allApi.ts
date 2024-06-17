import { commonApi } from "./commonApi"
import { serverUrl } from "./serverUrl"


//api for user register
export const registerApi = async(reqBody:object)=>{
   return await commonApi('POST',`${serverUrl}/register`,reqBody,"")
}

//api for user login
export const loginApi = async(reqBody:object)=>{
    return await commonApi('POST',`${serverUrl}/login`,reqBody,"")
}

//api to add project
export const addProjectApi = async(reqBody:object,reqHeader:object)=>{
    return await commonApi('POST',`${serverUrl}/add-project`,reqBody,reqHeader)
}

//api to get home project
export const homeProjectApi = async()=>{
    return await commonApi('GET',`${serverUrl}/home-project`,"","")
}

//api to get all projects
export const allprojectApi = async(searchKey:string,reqHeader:object)=>{
    return await commonApi('GET',`${serverUrl}/all-project?search=${searchKey}`,"",reqHeader)
 }

 //api to get user project
export const userprojectApi = async(reqHeader:object)=>{
    return await commonApi('GET',`${serverUrl}/user-project`,"",reqHeader)
 }

 //api to edit project
export const editprojectApi = async(projectId:string,reqBody:object,reqHeader:object)=>{
    return await commonApi('PUT',`${serverUrl}/edit-project/${projectId}`,reqBody,reqHeader)
 }
 
 //api to delete project
 export const deleteprojectApi = async(projectId:string,reqHeader:object)=>{
    return await commonApi('DELETE',`${serverUrl}/delete-project/${projectId}`,{},reqHeader)
 }

 //api for profile update
 export const updateProfileapi = async(reqbody:object, reqHeader:object)=>{
    return await commonApi('PUT', `${serverUrl}/update-profile`,reqbody,reqHeader)
  }