import {useState} from 'react';

export default function Register(){
  const [ username, setUsername] = useState('');
  const [ password, setPassword] = useState('');
 
  //const [ email, setEmail] = useState('');
  async function register(e){
    e.preventDefault();
    
  const response = await fetch('http://localhost:4000/register',
  //fetch("http://10.138.140.55:4000/register",
  {
      method:'POST',
      body: JSON.stringify({username,password}),
      headers:{'content-type':'application/json'}
    });
    if(response.status === 200){
      alert('Registration succesfull!')
    }else{
      alert('registration failed')
    }
  }
  
  return(
    <form
    className="register" 
    onSubmit={register}>
      <h1>Register</h1>
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
      <button>Register</button>
    </form>
    )
}