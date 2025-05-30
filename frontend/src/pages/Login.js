import {useState} from 'react';
import {Navigate} from 'react-router-dom';

export default function Login(){
  const [ username, setUsername] = useState('');
  const [ password, setPassword] = useState('');
  const [ redirect, setRedirect] = useState(false);
  //const [ email, setEmail] = useState('');
  async function logIn(e){
    e.preventDefault();
   const response = await fetch('http://localhost:4000/login',{
      method:'POST',
      body: JSON.stringify({username,password}),
      headers:{'content-type':'application/json'},
      credentials:'include',
    });
    
    
   if(response.ok){
     setRedirect(true)
   }else{
     alert('wrong credentials');
   }
  }
  if(redirect){
    return <Navigate to={'/'} />
  }
  return(
    <form action="" className="login" onSubmit={logIn}>
      <h1>Login</h1>
      <input type="text"
      placeholder="username"
      value={username}
      onChange={e => setUsername(e.target.value)}
      />
      <input type="password" 
      placeholder="password" 
      value={password}
      onChange={e => setPassword(e.target.value)}
      />{/*
      <input type="email" 
      placeholder="email" 
      value={email}
      onChange={e => setEmail(e.target.value)}
      />*/}
      <button>Login</button>
    </form>
    )
}