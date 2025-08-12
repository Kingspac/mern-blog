import {useState, useEffect} from "react";
import Editor from "../Editor";
import {useParams, Navigate} from "react-router-dom";

export default function EditPost(){
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect,setRedirect] = useState(false);
  const {id} = useParams;
  
  useEffect(()=>{
   // fetch("http://192.168.43.1:4000/post/" 
    fetch("http://localhost:4000/post/"
    +id)
    .then (response =>{
      response.json().then(postInfo =>{
        setTitle(postInfo.title);
        setContent(postInfo.content);
      });
    });
    
  },[])
async function updatePost(ev) {
     ev.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);
    if (files?.[0]){
      data.set("file", files[0]);
    }
    await fetch(
    //"http://192.168.43.1:4000/post"
   "http://localhost:4000/post"
    ,{
      method: "PUT",
      body: data,
      credentials: "include"
    });
    redirect(true);
}
  
    if (redirect){
  return <Navigate to={"/post"+ id} />
}
  return (
  <form onSubmit={updatePost}>
      <input
        type="text"
        placeholder={"Title"}
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <input
        type="text"
        placeholder={"Summary"}
        value={summary}
        onChange={(ev) => setSummary(ev.target.value)}
      />
      <input type="file" onChange={(ev) => setFiles(ev.target.files)} />
  
      <Editor 
         onChange={setContent}
         value={content} />
         
      <button style={{ marginTop: "5px" }}>Update Post</button>
    </form>
    )
}