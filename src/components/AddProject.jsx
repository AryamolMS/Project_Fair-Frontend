import React, { useEffect } from 'react'
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addprojectAPI } from '../services/allAPI';
import { useContext } from 'react';
import { addProjectResponseContext } from '../context/ContextShare';

function AddProject() {
  const {addProjectResponse,setAddProjectresponse} = useContext(addProjectResponseContext)

  //to change the image 
  const [preview,setPreview] = useState("")
    const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    handleClear()
  }
  const handleShow = () => setShow(true);


  const [token,setToken] = useState("")

  const [project,setProjects] = useState({
    title:"",
    language:"",
    github:"",
    website:"",
    overview:"",
    projectImage:""
  })
  console.log(project);

  const handleClear =()=>{
    setProjects({
    title:"",
    language:"",
    github:"",
    website:"",
    overview:"",
    projectImage:""})
    setPreview("")
  }

  useEffect(()=>{
    if(project.projectImage)
    {(setPreview(URL.createObjectURL(project.projectImage)))}
  },[project.projectImage])


  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }
    else{
      setToken("")
    }
  },[])

  console.log(preview);

  //add project
  const handleAdd = async(e)=>{
    e.preventDefault()

    const {title,language,github,website,overview,projectImage} = project
    
    if(!title || !language || !github || !website || !overview || !projectImage){
      alert("please fill the form completely")
    }
    else{
      //reqBody
      //1)create object for formData - since we have uploaded conent
      const reqBody = new FormData()
      //2) add data to formData - append()
      reqBody.append("title",title)
      reqBody.append("language",language)
      reqBody.append("github",github)
      reqBody.append("website",website)
      reqBody.append("overview",overview)
      reqBody.append("projectImage",projectImage)

      if(token){
        const reqHeader={
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`
        }
        const result = await addprojectAPI(reqBody,reqHeader)
      console.log(result);
      if(result.status===200){
        console.log(result.data);
        alert('Project added successfully')
        handleClose()
        setAddProjectresponse(result.data)
      }
      else{
        console.log(result.response.data);
      }
    }
      
    }
  }
  return (
    <div>
         <Button variant="success" onClick={handleShow}>
        Add Project
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <label htmlFor="image" className='text-center'>
              <input type="file" id="image" style={{display:'none'}} onChange={(e)=>setProjects({...project,projectImage:e.target.files[0]})} />
              
                <img src={preview?preview:"https://icon-library.com/images/add-photo-icon/add-photo-icon-13.jpg"} alt="no image" style={{width:'200px'}} />
                </label>
            </Col>
            <Col md={6} className=' justify-content-center align-items-center'>
                <div className='mb-3 w-100'>
                    <input type="text" className='form-control' placeholder='project title' value={project.title} onChange={(e)=>setProjects({...project,title:e.target.value})}/>
                </div>
                <div className='mb-3 w-100'>
                    <input type="text" className='form-control' placeholder='project language' value={project.language} onChange={(e)=>setProjects({...project,language:e.target.value})}/>
                </div>
                <div className='mb-3 w-100'>
                    <input type="text" className='form-control' placeholder='project github link' value={project.github} onChange={(e)=>setProjects({...project,github:e.target.value})} />
                </div>
                <div className='mb-3 w-100'>
                    <input type="text" className='form-control' placeholder='project website link' value={project.website} onChange={(e)=>setProjects({...project,website:e.target.value})}/>
                </div>
                <div className='mb-3 w-100'>
                    <textarea type="text" className='form-control' placeholder='project overview' value={project.overview} onChange={(e)=>setProjects({...project,overview:e.target.value})}></textarea>
                </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className='justify-content-center'>
          <Button variant="danger" onClick={handleClear}>
            Cancel
          </Button>
          <Button onClick={handleAdd} variant="success" >Add</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default AddProject
