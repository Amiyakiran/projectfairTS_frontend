import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { faGlobe, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"
import AddProject from "./AddProject"
import EditProject from "./EditProject"
import { useContext, useEffect, useState } from "react"
import { deleteprojectApi, userprojectApi } from "../services/allApi"
import { addProjectResponseContext, editProjectResponseContext } from "../context/ContextData"





function MyProject() {
  const { addProjectResponse }: any = useContext(addProjectResponseContext)
  const { editProjectResponse }:any = useContext(editProjectResponseContext)

  const [userProject, setUserProject] = useState([])

  const getUserProject = async () => {

    const token = sessionStorage.getItem("token")
    const reqHeader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }

    const result = await userprojectApi(reqHeader)
    console.log(result.data);
    setUserProject(result.data)

  }
  console.log(userProject);

  const handleDelete = async (id: string) => {
    const token = sessionStorage.getItem("token")
    const reqHeader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
    const result = await deleteprojectApi(id, reqHeader)
    console.log(result);
    if (result.status == 200) {
      getUserProject()
    }
    else {
      console.log(result.response.data);
    }
  }

  useEffect(() => {
    getUserProject()
  }, [addProjectResponse, editProjectResponse])

  return (
    <div className='m-md-5 ms-4 shadow p-5 rounded'>
      <div className="d-flex">
        <h3 className='text-success mt-4'>My Project</h3>
        <div className='ms-auto mt-4'>
          <AddProject />
        </div>
      </div>
      {userProject?.length > 0 ?
        userProject.map((item: any) => (<div className='mt-4 p-3 bg-light rounded row w-100'>
          <div className="col-md-9">
            <h5>{item.title}</h5>
          </div>
          <div className="col-md-3">
            <div className="d-flex align-items-center ">
              <EditProject project={item} />
              <Link to={item.website} target='_blank'> <FontAwesomeIcon icon={faGlobe} className='text-warning mx-2' /></Link>
              <Link to={item.github} target='_blank'> <FontAwesomeIcon icon={faGithub} className='text-success mx-2' /></Link>

              <FontAwesomeIcon icon={faTrash} className='text-danger mx-2' onClick={() => handleDelete(item._id)} />
            </div>
          </div>
        </div>))
        :

        <p className='text-danger mt-3'>No project Yet Added</p>}



    </div>
  )
}

export default MyProject