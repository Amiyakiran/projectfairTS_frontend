import { Col, Row } from "react-bootstrap"
import photo from '../assets/designer.svg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import ProjectCard from "../components/ProjectCard"
import { useEffect, useState } from "react"
import { homeProjectApi } from "../services/allApi"

 
function Landing() {
    const [isLogin, setIsLogin] = useState(false)
    const [homeProject , setHomepRoject] = useState([])

    useEffect(()=>{
        if(sessionStorage.getItem("token")){
            setIsLogin(true)
        }
        else{
            setIsLogin(false)
        }
    },[])

    const getHomeProject =async()=>{
      const result = await homeProjectApi()
      setHomepRoject(result.data)
      
    }
    useEffect(()=>{
       getHomeProject()
    },[])
    console.log(homeProject);
  return (
    <>
    
    <>
      <div className="container-fluid w-100" style={{ backgroundColor: 'rgb(27, 194, 158)', height: '100vh' }}>
        <Row className='align-items-center p-5'>
          <Col sm={12} md={6}>
            <h1 className='text-light' style={{fontSize:'76px'}} >Project Fair</h1>
            <p className='mt-3 '>One stop destination for all software development Projects</p>

         
           {!isLogin ?<button className='btn  rounded-2 mt-3'><Link to={'/login'} style={{textDecoration:'none',color:'white'}}>Get Started <FontAwesomeIcon icon={faArrowRight} /></Link></button>
            :
            <button className='btn  mt-3 rounded-2'><Link to={'/dashboard'}  style={{textDecoration:'none',color:'white'}}>Manage Project <FontAwesomeIcon icon={faArrowRight} /></Link></button>}
          </Col>
          <Col sm={12} md={6} className='mt-5'>
            <img src={photo} alt="image" className='w-75' />
          </Col>
        </Row>


      </div>

      <div>
        <h1 className='mt-5 text-center'>Explore our Projects</h1>
       
           {homeProject?.length>0?<div className='row w-100'>
           {homeProject.map((item:object)=>(<div className="col-md-4 px-5 py-3"><ProjectCard project={item}/></div>))}
           </div>:null}
       

        <Link to={'/project'} style={{color:'red'}}><p className="text-center mt-4">See more Project</p></Link>
      </div>

    </>
    
    </>
  )
}

export default Landing