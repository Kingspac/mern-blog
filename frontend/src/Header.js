import {Link} from "react-router-dom";
import {UserContext} from './UserContext';
import {useContext,useEffect, useState} from 'react';

export default function Header (){
  const {SetUserInfo,userInfo} = useContext(UserContext);
  
  useEffect(()=>{
        //fetch("http://10.138.140.55:4000/profile"
  fetch('http://localhost:4000/profile'
    ,{
      method: "POST",
      credentials:'include',
    }).then(response =>{
      response.json().then(userInfo =>{
        SetUserInfo(userInfo)
      });
    });
  },[]);
  function logout(){
    fetch('http://localhost:4000/logout'
   //fetch("http://192.168.43.1:4000/logout"
   ,{
      credentials:'include',
      method:'POST',
    });
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