import { Button } from 'bootstrap';
import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthTokenContext } from '../context/ContextShare';


function Header({dashboard}) {

  const {isAuthtoken,setIsAuthtoken} =useContext(isAuthTokenContext)
  const navigate = useNavigate()

  const handleLogout =()=>{
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("existingUser")
    setIsAuthtoken(false)
    navigate('/')
  }

  return (
    <>
        <Navbar style={{backgroundColor:'greenyellow'}}>
        <Container>
          <Navbar.Brand>
            <Link to={'/'} style={{textDecoration:'none',color:'black'}}>
                <i class="fa-brands fa-stack-overflow fa-2x"></i>{' '}
           Project Fair</Link>
          </Navbar.Brand>
          {
            dashboard && 
            <button onClick={handleLogout} className='btn btn-warning '>LogeOut<i class="fa-solid fa-power-off ms-2"></i></button>
          }
        </Container>
      </Navbar>
    </>
  )
}

export default Header