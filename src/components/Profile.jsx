import React, { useEffect } from 'react'
import { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import { editProfileAPI } from '../services/allAPI';
import { base_URL } from '../services/baseUrl';

function Profile() {

  const [isUpdate,setIsUpdate]= useState(false)

  const [open, setOpen] = useState(false);

  const [userProfile,setUserprofile] = useState({
    username:"",
    email:"",
    password:"",
    github:"",
    linkedin:"",
    Profile:""
  })
//once an image is uploaded then that image will be stored in existing image
const [existingImage,setExistingimage] = useState("")
//to hold the url of the image
const [preview,setPreview] = useState("")




  const handleProfileupdate =async()=>{
    const {username,email,password,github,linkedin,profile} = userProfile
    
    if(!github || !linkedin){
      alert('Please fille the form completely')
    }
    else{
      const reqBody = new FormData()
      reqBody.append("username",username)
      reqBody.append("email",email)
      reqBody.append("password",password)
      reqBody.append("github",github)
      reqBody.append("linkedin",linkedin)
      preview?reqBody.append('profile',profile):reqBody.append("profile",existingImage)
    
    const token = sessionStorage.getItem("token")

    if(preview){
      const reqHeader ={
        "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`
      }
      const result = await editProfileAPI(reqBody,reqHeader)
      console.log(result.data);
      if(result.status ===200){
        alert('profile updated successfully')
        sessionStorage.getItem("existingUser",JSON.stringify(result.data))
        setIsUpdate(true)
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
      const result = await editProfileAPI(reqBody,reqHeader)
      console.log(result);
      if(result.status ===200){
        alert('profile updated successfully')
        sessionStorage.getItem("existingUser",JSON.stringify(result.data))
        setIsUpdate(true)
      }
      else{
        console.log(result.response.data);
      }
    }
  }
}


useEffect(()=>{
  const user = JSON.parse(sessionStorage.getItem("existingUser"))

  setUserprofile({...userProfile,username:user.username,email:user.email,password:user.password,github:user.github,linkedin:user.linkedin,Profile:""})

  setExistingimage(user.Profile)
},[isUpdate])


useEffect(()=>{
  if(userProfile.Profile){
    setPreview(URL.createObjectURL(userProfile.Profile))
  }
  else{
    setPreview("")
  }
},[userProfile.Profile])


  return (
    <div className='card shadow p-5'>
        <div className='d-flex justify-content-between'>
           <h3> Profile</h3>
           <button className='btn 'onClick={() => setOpen(!open)} ><i class="fa-solid fa-arrow-up-from-bracket fa-rotate-180 ms-auto"></i></button>
        </div>
       <Collapse in={open}>
          <div className='row justify-content-center'>
              <label htmlFor="profile" >
              <input id='profile' type="file" style={{ display: 'none' }} onChange={(e)=>setUserprofile({...userProfile,Profile:e.target.files[0]})} />
                    {existingImage==""?
                      <img src={preview?preview:"https://cdn-icons-png.flaticon.com/512/3135/3135823.png"} alt="no image" className='ms-5' style={{ width: "200px", height: '200px',borderRadius:'5' }} />
                    :
                    <img src={preview?preview:`${base_URL}/uploads/${existingImage}`} alt="no image" className='ms-5' style={{ width: "200px", height: '200px',borderRadius:'5' }} />
                    }
              </label>
              <div className='mb-3'>
                <input type="text" placeholder='Github' className='form-control mt-3' value={userProfile.github} onChange={(e)=>setUserprofile({...userProfile,github:e.target.value})}/>
                </div>
                <div className='mb-3'>
                  
                <input type="text" placeholder='LinkedIn' className='form-control mt-3' value={userProfile.linkedin} onChange={(e)=>setUserprofile({...userProfile,linkedin:e.target.value})}/>
  
                </div>
              <button type='button' className='btn btn-warning mt-3' onClick={handleProfileupdate}>Update</button>
          </div>
       </Collapse>
    </div>
  )
}

export default Profile