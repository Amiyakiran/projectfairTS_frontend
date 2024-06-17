import { faStackOverflow } from "@fortawesome/free-brands-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginApi, registerApi } from "../services/allApi";
import { isAuthorizedContext } from "../context/ContextData";





function Auth({register}:any) {
  interface userDetails{
    username:string,
    email:string,
    password:string
  }
  const {setIsAuthorized}:any = useContext(isAuthorizedContext)
    const [userDetails, setUserDetails] = useState<userDetails>({
      username:"",
      email:"",
      password:""
    })
    const navigate = useNavigate()
    console.log(register);
  console.log(userDetails);
  
  const handleRegister =async(e:any)=>{
    e.preventDefault()

    const {username , email , password} = userDetails

    if(!username || !email || !password){
      alert('Please fill the formcompletely')
    }
    else{
       const result = await registerApi(userDetails)
       console.log(result);
       if(result.status==200){
        alert('Registration successfull')
        setUserDetails({
          username:"",
          email:"",
          password:""
        })
        navigate('/login')
       }
       else{
        alert('Something Went wrong')
        setUserDetails({
          username:"",
          email:"",
          password:""
        })
       }
      
       
    }

  }


  const handleLogin = async(e:any)=>{
    e.preventDefault()
    const {email , password} = userDetails

    if(!email || !password){
      alert('please fill the form completely')
    }
    else{
      const result = await loginApi({email, password})
      console.log(result);
      if(result.status==200){
        alert('login successfull')
        sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
        sessionStorage.setItem("token",result.data.token)
        setUserDetails({...userDetails,email:"",password:""})
        setIsAuthorized(true)
          navigate('/')
        
      }
      else{
        alert(result.response.data)
        setUserDetails({...userDetails,email:"",password:""})
      }
      
    }
  }

    

    
  return (
    <div className='w-100 d-flex justify-content-center align-items-center flex-column' style={{ height: '100vh' }}>

    <div className='w-75 container'>
      <Link to={'/'} style={{ textDecoration: 'none', color: 'orange' }}><h5><FontAwesomeIcon icon={faArrowLeft} />Back to home</h5></Link>
      <div style={{ backgroundColor: 'rgb(27, 194, 158)' }} className='rounded  mt-3'>
        <Row>
          <Col sm={12} md={6} className='p-5'>
            <img src="https://icon-library.com/images/admin-login-icon/admin-login-icon-20.jpg" alt="no image" className='w-100' />
          </Col>
          <Col sm={12} md={6} className='d-flex justify-content-center align-items-center flex-column'>
            <h2 className='text-light'><FontAwesomeIcon icon={faStackOverflow} /> Project fair</h2>

            {register ? <h5 className='text-light'>Sign Up to Your Account</h5> :
              <h5 className='text-light'>Sign In to Your Account</h5>}

            <Form className='mt-5 w-75'>

              {register && <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="email" value={userDetails.username} placeholder="username" onChange={(e)=>setUserDetails({...userDetails,username:e.target.value})} />
              </Form.Group>}

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="email" value={userDetails.email}  placeholder="Email" onChange={(e)=>setUserDetails({...userDetails,email:e.target.value})} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type="password" value={userDetails.password} placeholder="Password" onChange={(e)=>setUserDetails({...userDetails,password:e.target.value})} />
              </Form.Group>

              {register ? <div>
                <Button  variant="warning" type="submit" className='w-100' onClick={handleRegister}>Register</Button>
                <p className='text-light mt-3'>Already a User? click Here to <Link to={'/login'} className='text-danger'>Login</Link></p>
              </div>
                :
                <div>
                  <Button variant="warning" type="submit" className='w-100' onClick={handleLogin}>login</Button>
                  <p className='text-light mt-3'>New User? click Here to <Link to={'/register'} className='text-danger'>Register</Link></p>
                </div>
              }

            </Form>
          </Col>
        </Row>
      </div>
    </div>
    <ToastContainer theme='colored' autoClose={2000} position='top-center' />
  </div>
  )
}

export default Auth 