import {Link} from "react-router-dom";
import {UserContext} from './UserContext';
import {useContext,useEffect, useState} from 'react';

export default function Header (){
  const {SetUserInfo,userInfo} = useContext(UserContext);
  // tutorial code   
  /*
  useEffect(()=>{
        fetch("http://192.168.43.1:4000/profile"
  //'http://localhost:4000/profile'
    ,{
      method: "POST",
      credentials:'include',
    }).then(response =>{
      response.json().then(userInfo =>{
        SetUserInfo(userInfo)
      });
    });
  },[]);*/
  
  useEffect(() => {
  fetch(
//"http://192.168.43.1:4000/profile"
'http://localhost:4000/profile'
  ,{   
    //method: "POST",
    credentials: 'include',
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(userInfo => {
    SetUserInfo(userInfo);
  })
  .catch(error => {
    console.error('Error fetching profile:', error);
  });
}, []);

  
  function logout(){
    fetch(
      'http://localhost:4000/logout'
   //"http://192.168.43.1:4000/logout"
   ,{
      credentials:'include',
      method:'POST',
    })
    SetUserInfo(null);
  }
  const username = userInfo?.username;
  return(
    <header>
         <Link to="/" className="logo">MyBlog</Link>
         <nav>
           {
             username && (
             <>
               <Link to='/create'>create new post</Link>
               <a onClick={logout}>Logout</a>
             </>
             )
           }
           {
             !username && (
            <>
               <Link to="/login" >Login</Link>
             <Link to="/register" >Register</Link>
            </>
             )
           }
         </nav>
       </header>
    )
}
