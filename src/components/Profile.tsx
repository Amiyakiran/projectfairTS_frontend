import { faAngleDown ,faAngleUp} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react";
import { Collapse } from "react-bootstrap"
import { serverUrl } from "../services/serverUrl";
import { updateProfileapi } from "../services/allApi";






function Profile() {
  interface userDetails{
    username:string,
    email:string,
    password:string,
    github:string,
    linkedin:string,
    profile:null | File

  }
    const [open, setOpen] = useState(false);
    const [updateStatus, setUpdateStatus] = useState(false)
    const [userDetails , setUserDetails] = useState<userDetails>({
     
      username:"",
      email:"",
      password:"",
      github:"",
      linkedin:"",
      profile:null
 
   })
   const [existingImage , setExistingImage] = useState("")
   const [preview , setPreview] = useState("")

   useEffect(()=>{
    if(userDetails.profile){
      setPreview(URL.createObjectURL(userDetails.profile))
    }else{
      setPreview("")
    }

  },[userDetails.profile])

  const handleFile =(e:any)=>{
    e.preventDefault()
    if(e.target.files){
      setUserDetails({...userDetails , profile:e.target.files[0]})
    }
  }

  const handleUpdate = async(e:any)=>{
    e.preventDefault()
    const {username,email,password,github , profile,linkedin} = userDetails
    if(!github || !linkedin){
      alert('Please fill the form completely')
    }
    else{
        const reqBody = new FormData()

        reqBody.append("username",username)
        reqBody.append("email",email)
        reqBody.append("password",password)
        reqBody.append("github",github)
        reqBody.append("linkedin",linkedin)
        profile!=null?reqBody.append("profile",profile):reqBody.append("profile",existingImage)

        const token = sessionStorage.getItem("token")
        if(preview){
          const reqHeader = {
            "Content-Type":"multipart/form-data",
            "Authorization":`Bearer ${token}`
          }
          const result = await updateProfileapi(reqBody,reqHeader)

          if(result.status ==200){
            alert('Profile updated successfully')
            sessionStorage.setItem("existingUser",JSON.stringify(result.data))
            setUpdateStatus(!updateStatus)
          }
          else{
            console.log(result);
            alert('something went wrong')
          }


        }
        else{
          const reqHeader = {
            " Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
           }
           const result = await updateProfileapi(reqBody,reqHeader)

           if(result.status ==200){
            alert('Profile updated successfully')
             sessionStorage.setItem("existingUser",JSON.stringify(result.data))
             setUpdateStatus(!updateStatus)
           }
           else{
             console.log(result);
             alert('something went wrong')
           }
 
        }
    }
  }

   useEffect(()=>{
    if(sessionStorage.getItem("existingUser")){
      const user = JSON.parse(sessionStorage.getItem("existingUser")||"")
      setUserDetails({...userDetails , username:user.username, email:user.email , password:user.password, github:user.github , linkedin:user.linkedin})
      setExistingImage(user.profile)
    }

  },[updateStatus])

  return (
    <>
    <div className='m-md-5 mt-4  ms-4 shadow p-4 rounded' onMouseEnter={() => setOpen(true)} >
      <div className='d-flex justify-content-between'>
        <h3 className='mt-3'> Profile</h3>
        <div className='mt-3'>
          <button  onClick={() => setOpen(!open)} className='btn btn-outline-info'>{!open?<FontAwesomeIcon icon={faAngleDown} />:<FontAwesomeIcon icon={faAngleUp} />}</button>
        </div>
      </div>

      <Collapse in={open}>

        <div>

          <div  className='d-flex justify-content-center align-items-center flex-column'>
  
           <label htmlFor='image'> 
           <input id='image' type="file" style={{display:'none'}}  onChange={(e) =>handleFile(e) } />
            
           { existingImage ==""?
           <img src={preview?preview:'https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png'} alt="no image" width={'200px'} height={'200px'} style={{ borderRadius: '50%' }} />

           : 
           <img src={preview?preview:`${serverUrl}/uploads/${existingImage}`} alt="no image" width={'200px'} height={'200px'} style={{ borderRadius: '50%' }} />

            } 
            </label>
            
  
            <div className="mb-3 w-100 mt-4">
              <input type="text" placeholder='Github' className='form-control w-100' value={userDetails.github} onChange={(e)=>setUserDetails({...userDetails ,github:e.target.value})} />
            </div>
  
            <div className="mb-3  w-100">
              <input type="text" placeholder='LinkedIn' className='form-control w-100' value={userDetails.linkedin} onChange={(e)=>setUserDetails({...userDetails ,linkedin:e.target.value})} />
              
            </div>
            <div className="mb-3  w-100">
              <button className='btn w-100' style={{ backgroundColor: 'green', color: 'white' }} onClick={handleUpdate}>Update</button>
            </div>
  
  
          </div>

        </div>
      </Collapse>

    </div>

 

  </>
  )
}

export default Profile