import {useContext,useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Link} from "react-router-dom";
import {UserContext} from "../UserContext";
import {formatISO9075} from "date-fns";

export default function PostPage(){
  const [postInfo,setPostInfo] = useState(null);
  const {id} = useParams();
  const {userInfo} = useContext(UserContext);
  useEffect(()=>{
    fetch(
    //`http://192.168.43.1:4000/post/${id}`)
 `http://localhost:4000/post/${id}`)
    .then(response =>{
     response.json().then(postInfo=>{
      setPostInfo(postInfo);
    });
    });
  },[])
  
  if (!postInfo)return"";
  
  return(
    <div className="post">
    <h1>{postInfo.title}</h1>
    <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
    <div className="author">by @dlaskkfkdj {postInfo.author.username}</div>
    
       { userInfo.id === postInfo.author._id && (
      <div className="edit-row">
        <Link className="edit-bt" to={`/edit/${postInfo._id}`}>
          <img className="icon" src="" alt ="icon" />
        </Link>
        Edit post
     </div>
    )}
    
      <div className="image">
       <img src={//`http://192.168.43.1:4000/${postInfo.cover}`
         `http://localhost:4000/${postInfo.cover}`
         } alt="cover" />
      </div>
      
      <div className="content" dangerouslySetInnerHTML={{__html:postInfo.content}} />
    </div>
    );
};