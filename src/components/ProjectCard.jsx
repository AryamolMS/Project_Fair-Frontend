import React from 'react'
import Card from 'react-bootstrap/Card';
import VideoplayerImage from '../Assets/Screenshot (126).png'
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { base_URL } from '../services/baseUrl';

function ProjectCard({project}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);
  return (
    <>
        <Card className='btn shadow' onClick={handleShow}>
      <Card.Img variant="top" src={project?`${base_URL}/uploads/${project.projectImage}`:VideoplayerImage} />
      <Card.Body>
        <Card.Title className='text-center'>{project.title}</Card.Title>
      </Card.Body>
    </Card>


    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title>{project.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row style={{height:'250px'}}>
            <Col md={6}>
            <img src={project?`${base_URL}/uploads/${project.projectImage}`:VideoplayerImage} alt="no image" style={{width:'100%'}} className='mt-3' />
            </Col>
            <Col md={6}>
            <p className='mt-3'>{project.overview}</p>
            <p><span className='fw-bolder'>Technologies</span>: {project.language}</p>
            </Col>
          </Row>

          <div className='d-flex'>
            <a href={project.github} target='_blank'><i class="fa-brands fa-github fa-2x ms-5" style={{color:'grey'}}></i></a>
            <a href={project.linkedin} target='_blank'><i class="fa-solid fa-link fa-2x ms-5" style={{color:'grey'}}></i></a>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ProjectCard