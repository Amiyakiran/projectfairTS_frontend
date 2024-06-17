import axios from "axios"



export const commonApi = async(httpRequest:string , url:string, reqBody:object| "", reqHeader:object | "")=>{

    const reqConfig ={
        method:httpRequest,
        url,
        data:reqBody,
        headers:reqHeader?reqHeader:{"Content-Type":'application/json'}

    }
   return   await axios(reqConfig).then((result:any)=>{
        return result
      }).catch((err:any)=>{
        return err
      })
    
}