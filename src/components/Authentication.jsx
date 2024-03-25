import React, { useContext, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import loginimage from '../Assets/login.png'
import { Link, useNavigate } from 'react-router-dom'
import { loginAPI, registerAPI } from '../services/allAPI'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isAuthTokenContext } from '../context/ContextShare'


function Authentication({register}) {
    const {isAuthtoken,setIsAuthtoken} = useContext(isAuthTokenContext)
    const navigate = useNavigate()
    //create a state to hold the value of user registration details
    const [userData,setUserData] = useState({
        username:"",
        email:"",
        password:""
    })

    console.log(userData);

      //function to register

     const handleRegister = async(e)=>{
        e.preventDefault()

        const {username,email,password} = userData
        if(!username || !email || !password){
            toast.info("please fill the form correctly")
        }
        else{
            const result = await registerAPI(userData)
            console.log(result.data);
            if(result.status===200){
                toast.success(`${result.data.username} is registered successfully`)
                setUserData({
                    username:"",
                    email:"",
                    password:""

                })
                navigate("/login")
            }
        }
     }
    
    const registrationForm = register?true:false


    //function for login

    const handleLogin =async(e)=>{
        e.preventDefault()

        const {email,password} = userData
        if(!email || !password){
            toast.info('please fill the form completely')
        }
        else{
            //api call
           const result = await loginAPI(userData)
            console.log(result);
            if(result.status === 200){
                //alert
                toast.success("login successfull")
                setIsAuthtoken(true)
                //store
                sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
                sessionStorage.setItem("token",(result.data.token))
                //state empty
                setUserData({
                    username:"",
                    email:"",
                    password:""
                })

                //navigate
                
                setTimeout(()=>{
                    navigate('/')
                },2500)
            }
            else{
                toast.error(result.response.data)
            }
        }
    }
  return (
    <div className='d-flex justify-content-center align-items-center flex-column'>
        <div className='mt-5' style={{marginRight:'800px'}}>
            <Link to={'/'} style={{textDecoration:'none',color:'black'}}>
            {/* <h5 style={{marginRight:'660px',textDecoration:'none'}}></h5>  */}
            <i class="fa-solid fa-arrow-right fa-rotate-180" ></i> Back to Home
            </Link>
        </div>
        <div style={{width:'900px',height:'450px',backgroundColor:'greenyellow'}}>
            <Row>
                <Col sm={12} md={6} lg={4} className='mt-5 ms-3'> 

                    <img src={loginimage} alt="" />
                </Col>
                <Col className='d-flex align-items-center justify-content-center flex-column' >
                <h2 className='text-dark mt-5'><i class="fa-brands fa-stack-overflow fa-1x"></i>Project-Fair</h2>
                <h5>
                    {
                      registrationForm?"Sign Up to Your Account":"Sign in to Your Account"  
                    }
                </h5>

                <Form className='w-75 mt-3'>

                {registrationForm &&
                    <Form.Group className="mb-3" controlId="formBasicUsername">

                    <Form.Control type="text" placeholder="Enter Username" 
                    value={userData.username} onChange={(e)=>setUserData({...userData,username:e.target.value})}/>
                </Form.Group>}

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="email" placeholder="Enter email" value={userData.email} onChange={(e)=>setUserData({...userData,email:e.target.value})}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="password" placeholder="Enter password" value={userData.password} onChange={(e)=>setUserData({...userData,password:e.target.value})}/>
                </Form.Group>

               { registrationForm ?
               <div className='mt-4'>
                    <button className='btn btn-warning rounded' onClick={handleRegister}>Register</button>
                    <p className='mt-2'>Already a user click here to <Link to={'/login'} style={{color:'blue'}}>Login</Link></p>
                </div>:
                <div className='mt-4'>
                    <button className='btn btn-warning rounded' onClick={handleLogin}>Login</button>
                    <p className='mt-2'>New user click here to <Link to={'/register'} style={{color:'blue'}}>Register</Link></p>
                </div>}
                </Form>
               
                
                
            </Col>
            </Row>
        </div>
        <ToastContainer autoClose={2000} theme='colored' position='top-center'/>
    </div>
  )
}

export default Authentication