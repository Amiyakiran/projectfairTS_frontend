import { useState } from 'react'
import { createContext } from 'react'

export const addProjectResponseContext = createContext({})
export const editProjectResponseContext = createContext({})
export const isAuthorizedContext = createContext({})


function DataShare({children}:any) {
    const [addProjectResponse,setAddProjectResponse] = useState({})

    const [editProjectResponse,setEditProjectResponse] = useState({})

    const [isAuthorized , setIsAuthorized] = useState(true)

  return (
    <>
    <addProjectResponseContext.Provider value={{addProjectResponse,setAddProjectResponse}}>
        <editProjectResponseContext.Provider value={{editProjectResponse,setEditProjectResponse}}> 
        <isAuthorizedContext.Provider value={{isAuthorized , setIsAuthorized}}> 

        {children}

        </isAuthorizedContext.Provider>
         
        </editProjectResponseContext.Provider>
      </addProjectResponseContext.Provider>
    </>
  )
}

export default DataShare