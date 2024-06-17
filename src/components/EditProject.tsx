import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext, useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { serverUrl } from "../services/serverUrl";
import { editprojectApi } from "../services/allApi";
import { editProjectResponseContext } from "../context/ContextData";







function EditProject({ project }: any) {
  const {setEditProjectResponse}:any = useContext(editProjectResponseContext)
  interface projectDetails {
    id: string,
    title: string,
    language: string,
    github: string,
    website: string,
    overview: string,
    projectImage: null | File
  }
  const [projectDetails, setProjectDetails] = useState<projectDetails>({
    id: project._id,
    title: project.title,
    language: project.language,
    github: project.github,
    website: project.website,
    overview: project.overview,
    projectImage: null
  })
  const [show, setShow] = useState(false);
  const [key, setKey] = useState(0)

  const [preview, setPreview] = useState("")
  //function to close the modal
  const handleClose = () => {
    setShow(false)
    handleClose1()
  }
  //function to show the modal
  const handleShow = () => setShow(true)
  const handleFile = (e:any) => {
    e.preventDefault()
    if (e.target.files) {
      setProjectDetails({ ...projectDetails, projectImage: e.target.files[0] })
    }
  }
  const handleClose1 = () => {
    setProjectDetails({
      id: project._id,
      title: project.title,
      language: project.language,
      github: project.github,
      website: project.website,
      overview: project.overview,
      projectImage: null
    })
    setPreview("")
    if (key == 0) {
      setKey(1)
    } else {
      setKey(0)
    }
  }

  useEffect(() => {
    projectDetails.projectImage &&
      setPreview(URL.createObjectURL(projectDetails.projectImage))//URL is predefined method in javaScript which has createObjectURL method which can convert file into url
  }, [projectDetails.projectImage])
  console.log(preview);

  const handleUpdate = async(e:any)=>{
    e.preventDefault()

    const {id , title, language, github,website,overview, projectImage} = projectDetails

    if(!title ||!language || !github || !website ||!overview){
      alert('please fill the form completely')
    }
    else{
      const reqBody = new FormData()
      reqBody.append("title",title)
      reqBody.append("language",language)
      reqBody.append("github",github)
      reqBody.append("website",website)
      reqBody.append("overview",overview)
      projectImage!=null?reqBody.append("projectImage",projectImage):reqBody.append("projectImage",project.projectImage)
   

    const token = sessionStorage.getItem("token")

    if(preview){
      const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }

        const result = await editprojectApi(id,reqBody,reqHeader)
        console.log(result);
        if(result.status==200){
          alert('updated successfully')
          handleClose()
          setEditProjectResponse(result.data)

        }
        else{
          console.log(result.response.data);
        }
    }

    else{
      const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
        const result = await editprojectApi(id,reqBody,reqHeader)
        console.log(result);
        if(result.status ===200){
          alert('updated successfully')
          handleClose()
          setEditProjectResponse(result.data)

        }
        else{
          console.log(result.response.data);
        }
    }


  }


  }





  return (
    <>
      <FontAwesomeIcon icon={faPenToSquare} onClick={handleShow} className='text-info mx-3' />


      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title className='text-success'>Edit Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={12} md={6}>
              <label htmlFor="Editimage">
                <input id='Editimage' type="file" style={{display:'none'}} key={key} onChange={(e) => handleFile(e)} />
                <img src={preview ? preview : `${serverUrl}/uploads/${project.projectImage}`} alt="no image" className='w-100 mt-4' />
              </label>

            </Col>
            <Col sm={12} md={6}>
              <form>
                <div className="mb-3 mt-3">
                  <input type="text" placeholder='title' className='form-control w-100' value={projectDetails.title} onChange={(e)=>setProjectDetails({...projectDetails , title:e.target.value})} />
                </div>
                <div className="mb-3">
                  <input type="text" placeholder='Language' className='form-control w-100'  value={projectDetails.language} onChange={(e)=>setProjectDetails({...projectDetails , language:e.target.value})} />
                </div>
                <div className="mb-3">
                  <input type="text" placeholder='GitHub' className='form-control w-100'  value={projectDetails.github} onChange={(e)=>setProjectDetails({...projectDetails , github:e.target.value})} />
                </div>
                <div className="mb-3">
                  <input type="text" placeholder='Website' className='form-control w-100'  value={projectDetails.website} onChange={(e)=>setProjectDetails({...projectDetails , website:e.target.value})} />
                </div>
                <div className="mb-3">
                  <textarea rows={4} placeholder='Overview' className='form-control w-100'  value={projectDetails.overview} onChange={(e)=>setProjectDetails({...projectDetails , overview:e.target.value})}></textarea>
                </div>
              </form>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleClose1} >
            Cancel
          </Button>
          <Button variant="success" onClick={handleUpdate} >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer theme='colored' position='top-center' autoClose={2000} />
    </>
  )
}

export default EditProject