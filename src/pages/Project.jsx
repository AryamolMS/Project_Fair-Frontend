import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard'
import Header from '../components/Header'
import { allProjectAPI } from '../services/allAPI'
import { Link } from 'react-router-dom'

function Project() {
  const [allProject,setAllproject] = useState([])
  
const [searchKey,setSearchKey] = useState("")

const [isToken,setIstoken] = useState(false)

  const getAllproject = async()=>{
    
    if(sessionStorage.getItem("token")){
      const token = sessionStorage.getItem("token")
      const reqHeader = {
        "Content-Type":"application/json",
      "Authorization":`Bearer ${token}`
      }
      const result = await allProjectAPI(searchKey,reqHeader)
      setAllproject(result.data)
    }
  }

console.log(searchKey);

  useEffect(()=>{
    getAllproject()
  },[searchKey])

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setIstoken(true)
    }
  })
  return (
    <>
    <Header/>
    <h1 className='text-center mt-5'>All Projects</h1>
      <div className='d-flex aligin-items-center justify-content-center mt-3'>
          
          <input value={searchKey} onChange={(e)=>setSearchKey(e.target.value)} type="text" placeholder='Search the project using technologies' className='form-control w-25' />
          <i class="fa-solid fa-magnifying-glass fa-rotate-90" style={{marginLeft:"-40px",color:'lightgray'}}></i>
      </div>

      <Row className='mt-5'>
       {allProject?.length>0?
       allProject?.map((item)=>(<Col sm={12} md={6} lg={4}>
         <ProjectCard project={item}/>
       </Col>))
        
        :

        <div>

          { isToken?<p className='fw-5 fs-2 text-danger text-center'>Sorry no such project</p>:
            <div className='d-flex align-items-center justify-content-center flex-column'>
            <img src="https://assets-v2.lottiefiles.com/a/790b2fc0-1171-11ee-afd8-87913996c05d/D74t1SWF5f.gif" alt="" height={300}/>
            <p className='fw-5 fs-2 text-danger'>Please <Link style={{textDecoration:'none'}} className='text-info' to={'/login'}>Login </Link>to see more Projects</p>
     
          </div>}
        </div>     }
      </Row>
    </>
   
  )
}

export default Project