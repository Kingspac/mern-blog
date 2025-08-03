import Post from '../Post';
import {useEffect,useState} from "react";
export default function Home (){
  const [posts, setPosts] = useState([]);
  useEffect(()=>{
    fetch(//"http://10.138.140.55:4000/post"
    "http://localhost:4000/post"
    ).then(response =>{
      response.json().then(posts =>{
      setPosts(posts)
    });
  });
  },[]);
  return(
    <>
      {posts.length > 0 && posts.map(post =>(
        <Post {...post} />
        ))}
    </>
    
    )
}