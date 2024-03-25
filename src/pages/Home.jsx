import React, { useContext, useEffect, useState } from 'react'
import { Col,Row } from 'react-bootstrap'
import titleImage from '../Assets/img1-removebg-preview.png'
import ProjectCard from '../components/ProjectCard'
import { Link } from 'react-router-dom'
import { homeProjectAPI } from '../services/allAPI'


function Home() {


  const [islogin , setIsLogin] = useState(false)
  const [homeProject,sethomeProject] = useState([])

  const gethomeProject = async()=>{
    const result = await homeProjectAPI()
    sethomeProject(result.data)
  }

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setIsLogin(true)
    }
    else{
      setIsLogin(false)
    }
  },[])



  useEffect(()=>{
    gethomeProject()
  },[])
  
  return (
  <>
      <div style={{width:'100v%',height:'100vh',backgroundColor:'yellowgreen'}}>
        <div className='container-fluid rounded'>
          <Row className='align-items-center p-5'>
            <Col sm={12} md={6}>
              <h1 style={{fontSize:'80px',color:'white'}}>Project Fair</h1>
              <p>One stop destination for all software development projects</p>
              { islogin?
              <Link to={'/dashboard'}>
              <button className='btn btn-success rounded ms-3'>Manage Projet <i class="fa-solid fa-arrow-right ms-3"></i></button>              
              </Link>
              :
              <Link to={'/login'}>
                <button className='btn btn-success rounded ms-3'>Get started <i class="fa-solid fa-arrow-right ms-3"></i></button>
              </Link>
              }
            </Col>
  
            <Col sm={12} md={6}>
                <img src={titleImage} alt="no image"  />
            </Col>
          </Row> 
        </div>
    </div>


  <div className='all_projects mt-5 ms-3'>
    <h1 className='text-center mt-5'>All Projects</h1>
    <marquee scrollAmount={10}>
    <div className='d-flex mt-5'>
      { homeProject?.length>0?
      homeProject.map((item)=>(
        <div style={{width:'500px'}}>
        <ProjectCard project={item}/>
      </div>
      ))  
      :null
      }
  
    </div>
    </marquee>
    
    <div className='text-center mt-3'>
      <Link to={'/project'}>See more projects</Link>
    </div>
  </div>
 
  </>
  )
}

export default Home