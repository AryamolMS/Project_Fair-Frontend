import React, { createContext, useState } from 'react'

//create context api
export const addProjectResponseContext = createContext()
export const editProjectResponseContext = createContext()
export const isAuthTokenContext = createContext()

//children is predefined prop used to share datas between all components
function ContextShare({children}) {
    //data to share
    const [addProjectResponse,setAddProjectresponse] = useState({})

    const [editProjectResponse,setEditProjectResponse] = useState({})

    const [isAuthtoken,setIsAuthtoken] = useState(true)
  return (
    <>
    {/* only provider can provide data and value  */}
    <addProjectResponseContext.Provider value={{addProjectResponse,setAddProjectresponse}}>
      <editProjectResponseContext.Provider value={{editProjectResponse,setEditProjectResponse}}>
        <isAuthTokenContext.Provider value={{isAuthtoken,setIsAuthtoken}}>
        {children}
        </isAuthTokenContext.Provider>
      </editProjectResponseContext.Provider>    
    </addProjectResponseContext.Provider>
    </>
  )
}

export default ContextShare