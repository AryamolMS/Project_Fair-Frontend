import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { base_URL } from '../services/baseUrl';
import { editProjectAPI } from '../services/allAPI';
import { editProjectResponseContext } from '../context/ContextShare';

function EditProject({projectDetails}) {

const {editProjectResponse,setEditProjectResponse} = useContext(editProjectResponseContext)

const [show, setShow] = useState(false);

const [project,setProjects] = useState({
  id:projectDetails._id,
  title:projectDetails.title,
  language:projectDetails.language,
  github:projectDetails.github,
  website:projectDetails.website,
  overview:projectDetails.overview,
  projectImage:""
})

console.log(project);

const handleShow = () => setShow(true);
const handleClose =()=>  {setShow(false)
  handleClose1()
}

const [preview,setPreview] = useState("")

useEffect(()=>{
  if(project.projectImage){
    setPreview(URL.createObjectURL(project.projectImage))
  }
},[project.projectImage])
  
const handleClose1 = ()=>{
  setProjects({
    id:projectDetails._id,
  title:projectDetails.title,
  language:projectDetails.language,
  github:projectDetails.github,
  website:projectDetails.website,
  overview:projectDetails.overview,
  projectImage:""
  })
  setPreview("")
}

const handleUpdate = async()=>{
  const {id,title,language,github,website,overview,projectImage} = project

  if(!title || !language || !github || !website|| !overview){
    alert('Please fill this form completely')
  }
  else{
    const reqBody = new FormData()
    reqBody.append("title",title)
    reqBody.append("language",language)
    reqBody.append("github",github)
    reqBody.append("website",website)
    reqBody.append("overview",overview)
    preview?reqBody.append("projectImage",projectImage):reqBody.append("projectImage",projectDetails.projectImage)
  

  const token = sessionStorage.getItem("token")
  if(preview){
    const reqHeader = {
      "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`
    }

    const result = await editProjectAPI(id,reqBody,reqHeader)
    console.log(result);
    if(result.status === 200){
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
      "Content-Type":"application/json",
      "Authorization":`Bearer ${token}`
    }

    const result = await editProjectAPI(id,reqBody,reqHeader)
    console.log(result);
    if(result.status === 200){
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
        <button onClick={handleShow} className='btn'><i class="fa-solid fa-pen-to-square text-info"></i></button>

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
              <input type="file" id="image" style={{display:'none'}}  onChange={(e)=>setProjects({...project,projectImage:e.target.files[0]})}/>
              
                <img src={preview?preview:`${base_URL}/uploads/${projectDetails.projectImage}`} alt="no image" style={{width:'200px'}} />
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
                    <input type="text" className='form-control' placeholder='project github link' value={project.github} onChange={(e)=>setProjects({...project,github:e.target.value})}  />
                </div>
                <div className='mb-3 w-100'>
                    <input type="text" className='form-control' placeholder='project website link' value={project.website} onChange={(e)=>setProjects({...project,website:e.target.value})} />
                </div>
                <div className='mb-3 w-100'>
                    <textarea type="text" className='form-control' placeholder='project overview' value={project.overview} onChange={(e)=>setProjects({...project,overview:e.target.value})}></textarea>
                </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className='justify-content-center'>
          <Button variant="danger" onClick={handleClose1}>
            Cancel
          </Button>
          <Button  variant="success" onClick={handleUpdate}>Add</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EditProject