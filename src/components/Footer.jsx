import React from 'react'
import {Link} from 'react-router-dom'
function Footer() {
  return (<div style={{backgroundColor:'greenyellow'}}>
   
      <div style={{width:"100%",height:"300px"}} className='d-flex justify-content-center align-items-center flex-column mt-5'>
        <div className='footer d-flex justify-content-evenly align-items-center w-100 mb-5'>
        <div className='website' style={{width:"400px"}}>
          <h4 className='text-dark'><i class="fa-solid fa-user"></i>{' '}Project Fair</h4>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut repudiandae error dolorum, voluptatum, nesciunt sapiente placeat ullam soluta ea ipsam, fugit ipsum pariatur accusamus nemo a consectetur autem quibusdam maxime!</p>
          <p> sit amet consectetur, adipisicing elit</p>
        </div>
        <div className='links d-flex flex-column '>
          <h3 className='text-dark'>Links</h3>
          <Link to={'/'} style={{textDecoration:"none",color:'black'}}>Home</Link>
          <Link to={'/register'} style={{textDecoration:"none",color:'black'}}>Register</Link>
          <Link to={'/login'} style={{textDecoration:"none",color:'black'}}>Login</Link>
          <Link to={'/dashboard'} style={{textDecoration:"none",color:'black'}}>Dashboard</Link>
          <Link to={'/project'} style={{textDecoration:"none",color:'black'}}>Project</Link>
        </div>
        <div className='guides d-flex flex-column text-dark'>
          <h4>Guides</h4>
          <Link to={'https://bootswatch.com'} style={{textDecoration:"none",color:'black'}}>react</Link>
          <Link  to={'https://bootswatch.com'} style={{textDecoration:"none",color:'black'}}>react bootstrap</Link>
          <Link  to={'https://bootswatch.com'} style={{textDecoration:"none",color:'black'}}>bootswatch</Link>
          <Link  to={'https://bootswatch.com'} style={{textDecoration:"none",color:'black'}}>fontaswome</Link>

        </div>
        <div className='contact'>
          <h4 className='mb-3 text-dark'>contact us</h4>
          <div className='d-flex'>
            <input type="text" className='form-control' placeholder='enter your email id'/>
            <button type='button' className='btn btn-success text-white ms-2' >Subscribe</button>
          </div>
          <div className='icons d-flex justify-content-evenly mt-3'>
          <Link to={'https://bootswatch.com'} style={{textDecoration:"none"}}><i class="fa-brands fa-instagram fa-2x text-success" ></i></Link>
          <Link to={'https://bootswatch.com'} style={{textDecoration:"none"}}><i class="fa-brands fa-facebook-f fa-2x text-success" ></i></Link>
          <Link to={'https://bootswatch.com'} style={{textDecoration:"none"}}><i class="fa-brands fa-github fa-2x text-success" ></i></Link>
         
          <Link to={'https://bootswatch.com'} style={{textDecoration:"none"}}> <i class="fa-brands fa-linkedin fa-2x text-success"></i></Link>
          </div>
        </div>
        </div>
        <p >Copyright © 2023 Project Fair .Built with React</p>
      </div>
  </div>
  )
}
export default Footer