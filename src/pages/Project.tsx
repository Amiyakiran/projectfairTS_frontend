import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Header from "../components/Header"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { Col, Row } from "react-bootstrap"
import ProjectCard from "../components/ProjectCard"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { allprojectApi } from "../services/allApi"





/* import React from 'react'
 */
function Project() {
  const [isToken, setIsToken] = useState(false)
  const [allProject,setAllProject]= useState([])
  const [searchKey,setSearchKey] = useState("")

  const getAllProject = async()=>{

    if(sessionStorage.getItem("token")){
      const token = sessionStorage.getItem("token")

      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    const result = await allprojectApi(searchKey,reqHeader)
    console.log(result);
    if(result.status === 200){
        setAllProject(result.data)
    }
    else{
      console.log(result.response.data);
    }

    }
  }
  console.log(allProject);
  console.log(searchKey);

  useEffect(()=>{
    getAllProject()
  },[searchKey])


  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setIsToken(true)
    }
  }, [])
  return (
    <>
      <Header />

      <div className='mt-5'>
        <h2 className='text-center'>All projects</h2>
      </div>

     {isToken? 
       <div>

        <div className='row mt-5 d-flex justify-content-center w-100'>
          <div className="col-md-4"></div>
          <div className="col-md-4 d-flex p-4 justify-content-center">
            <input type="text" className='form-control' value={searchKey} onChange={(e)=>setSearchKey(e.target.value)} placeholder='Search by Technologies' />
            <FontAwesomeIcon icon={faMagnifyingGlass} rotation={90} className='text-secondary' style={{ marginTop: '12px', marginLeft: '-30px' }} />
          </div>
          <div className="col-md-4"></div>

        </div>

        {allProject?.length>0?<div>


          <Row className='mt-5 mx-3'>
            {allProject.map((item:any)=>(<Col sm={12} md={6} lg={4} className='p-4'>
               <ProjectCard project={item} /> 
            </Col>))}
          </Row>
        </div>
          :
        <div className='mt-5'>
          <h1 className='text-danger text-center fs-3'>No project to display...</h1>
        </div>
        }


      </div>


      :
      <div className='d-flex justify-content-center align-items-center flex-column mt-5'>
        <img src="https://cdn.pixabay.com/animation/2023/06/13/15/12/15-12-30-710_512.gif" alt="no image" style={{ width: '16%' }} />
        <h4 className='mt-4 text-danger'>Please <Link to={'/login'}>Login</Link> to See More Project</h4>
      </div>}

    </>
  )
}

export default Project