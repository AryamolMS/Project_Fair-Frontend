import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Container, Row } from 'react-bootstrap'
import MyProjects from '../components/MyProjects'
import Profile from '../components/Profile'
import { json } from 'react-router-dom'

function Dashboard() {
  const [username,setUsername] = useState("") 
  useEffect(()=>{
    setUsername(JSON.parse(sessionStorage.getItem("existingUser")).username)
  },[])
  console.log(username);
  return (
   <>
   <Header dashboard/>
      <div>
      <h1 className='ms-4 mt-3'>Welcome<span className='text-warning '> {username}</span></h1>
       <Container>
          <Row className='mt-5'>
            <Col  md={8}  >
              <MyProjects/>
            </Col>
            <Col md={4} >
            <Profile/>
            </Col>
          </Row>
       </Container>
      </div>
   </>
  )
}

export default Dashboard