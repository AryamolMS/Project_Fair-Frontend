import React, { useContext, useEffect, useState } from 'react'
import AddProject from './AddProject'
import { deleteProjectAPI, userProjectAPI } from '../services/allAPI'
import { addProjectResponseContext, editProjectResponseContext } from '../context/ContextShare'
import EditProject from './EditProject'

function MyProjects() {
  const {addProjectResponse,setAddProjectresponse} = useContext(addProjectResponseContext)

  const {editProjectResponse,setEditProjectResponse} = useContext(editProjectResponseContext)


  const [myproject,setMyproject] = useState([])

  const getMyproject = async()=>{
    const token =sessionStorage.getItem("token")
    const reqHeader = {
      "Content-Type":"application/json",
      "Authorization":`Bearer ${token}`
    }
    const result = await userProjectAPI(reqHeader)
    // console.log(result.data);
    setMyproject(result.data)
  }

  console.log(myproject);

  useEffect(()=>{
    getMyproject()
  },[addProjectResponse,editProjectResponse])

  const handleDelete = async(id)=>{
    const token = sessionStorage.getItem("token")
    const reqHeader = {
      "Content-Type":"application/json",
      "Authorization":`Bearer ${token}`
    }
    const result = await deleteProjectAPI(id,reqHeader)
    console.log(result);
    if(result.status ===200){
      getMyproject()
    }
    else{
      console.log(result.response.data);
    }
  }


  return (
   <>
        <div className='card shadow p-5 '>
           <div className='d-flex justify-content-between'>
            <h3 className='text-success me-auto'>My Projects</h3>
            <AddProject/>
           </div>
          <div className='mt-5'>
               {myproject?.length>0?
               myproject?.map((item)=>(<div className='border d-flex align-items-center shadow p-2 mt-3  rounded'>
               <h5>{item.title}</h5>
               <div className='ms-auto d-flex'>
               <EditProject projectDetails = {item}/>
                   <a href={item.github} target='_blank' className='btn'><i class="fa-brands fa-github text-success"></i></a>
                   <button onClick={()=>handleDelete(item._id)} className='btn'><i class="fa-solid fa-trash text-danger"></i></button>
               </div>
           </div>))
                :
            <p className='text-danger fw-bolder fs-4 mt-2'>No project Uploaded yet</p>}
          </div>
        </div>

        
   </>
  )
}

export default MyProjects