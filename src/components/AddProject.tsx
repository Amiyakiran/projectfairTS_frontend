import { useState, useEffect, useContext } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectApi } from "../services/allApi";
import { addProjectResponseContext } from "../context/ContextData";





function AddProject() {
const {setAddProjectResponse}:any = useContext(addProjectResponseContext)

  interface projectDetails{
      title:string,
      language:string,
      github:string,
      website:string,
      overview:string,
      projectImage:null | File
  }
 
    const [projectDetails , setProjectDetails] = useState <projectDetails>({
      title:"",
      language:"",
      github:"",
      website:"",
      overview:"",
      projectImage:null
    })
    //state to hold token
    const [token, setToken] = useState("")
    const [preview, setPreview] = useState("")
    const [key ,setKey] = useState(0)
   
    const [show, setShow] = useState(false);
    //function to close the modal
  const handleClose = () =>{ setShow(false);
    handleClose1()
  }
  //function to open the model
  const handleShow = () => setShow(true);

 //function to upload file to the state
  console.log(projectDetails);
  const handleFile =(e:any)=>{
    e.preventDefault()
    if(e.target.files){
      setProjectDetails({...projectDetails , projectImage:e.target.files[0]})
    }
  }
//function to clear the input
  const handleClose1 = () => {
    setProjectDetails({
      title: "",
      language: "",
      github: "",
      website: "",
      overview: "",
      projectImage:null
    })
    setPreview("")
    if(key==0){
      setKey(1)
    }else{
      setKey(0)
    }

  };
 

 useEffect(() => {
   if (sessionStorage.getItem("token")) {
     setToken(sessionStorage.getItem("token")||"")
   }
 }, [])

 console.log(token);
 
//function to upload content

const handleUpload = async () => {
 console.log('inside add function');
 

    const { title, language, github, website, overview, projectImage } = projectDetails

    if (!title || !language || !github || !website || !overview || !projectImage) {
      alert(`please fill the form completely`)
    }
    else {
      //reqbody 
      //1) create an object of formdata class - since we have uploadeed content
      const reqBody = new FormData()
      //2) add data  - append() - can add only single item.
      reqBody.append("title", title)
      reqBody.append("language", language)
      reqBody.append("github", github)
      reqBody.append("website", website)
      reqBody.append("overview", overview)
      reqBody.append("projectImage", projectImage)

      //reqHeader

      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
        const result = await addProjectApi(reqBody, reqHeader)
        console.log(result);
        if(result.status===200){
          console.log(result.data);
          alert('Project added Successfully')
          setAddProjectResponse(result.data)
          handleClose()

        }
        else{
          alert(result.response.data);
          handleClose1()
        }
        
         

        }
        
      }
    }



  useEffect(() => {
    projectDetails.projectImage &&
      setPreview(URL.createObjectURL(projectDetails.projectImage))//URL is predefined method in javaScript which has createObjectURL method which can convert file into url
  }, [projectDetails.projectImage])
  console.log(preview);
  
  return (
    <>
      <Button variant="success" onClick={handleShow}>Add Project</Button>


      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title className='text-success'>Add Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={12} md={6}>
              <label htmlFor="projectImage">
              <input id='projectImage' type="file" style={{display:'none'}} className="ms-5" key={key} onChange={(e) =>handleFile(e) } />
                <img src={preview?preview:"https://m.media-amazon.com/images/I/71sKzRQtXtL.png"} alt="no image" className='w-100 mt-4' />
              </label>

            </Col>
            <Col sm={12} md={6}>
              <form>
                <div className="mb-3 mt-5">
                  <input type="text" placeholder='title' className='form-control w-100' value={projectDetails.title} onChange={(e)=>setProjectDetails({...projectDetails , title:e.target.value})}   />
                </div>
                <div className="mb-3">
                  <input type="text" placeholder='Language' className='form-control w-100' value={projectDetails.language} onChange={(e)=>setProjectDetails({...projectDetails , language:e.target.value})} />
                </div>
                <div className="mb-3">
                  <input type="text" placeholder='GitHub'  className='form-control w-100' value={projectDetails.github} onChange={(e)=>setProjectDetails({...projectDetails , github:e.target.value})} />
                </div>
                <div className="mb-3">
                  <input type="text" placeholder='Website' className='form-control w-100' value={projectDetails.website} onChange={(e)=>setProjectDetails({...projectDetails , website:e.target.value})}  />
                </div>
                <div className="mb-3">
                  <textarea rows={4} placeholder='Overview' className='form-control w-100' value={projectDetails.overview} onChange={(e)=>setProjectDetails({...projectDetails , overview:e.target.value})} ></textarea>
                </div>
              </form>
             
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleClose1}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleUpload} >
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer theme='colored' position='top-center' autoClose={2000} />
   {/* <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim vitae alias blanditiis doloremque totam similique odit quasi delectus dolores voluptas ipsam sed, aut eum nesciunt impedit molestiae. Earum, corrupti fugit.</p> */}
    </>
  )
}

export default AddProject