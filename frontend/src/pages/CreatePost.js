import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useState } from "react";
import {Navigate, useParams} from 'react-router-dom';

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect,setRedirect] = useState(false);
  const {id} = useParams;
  
  async function UpdatePost(ev) {
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);
    if (files?.[0]){
      data.set("file", files[0]);
    }
    await fetch(
     "http://localhost:4000/post"
      //"http://192.168.43.1:4000/post"
      ,{
      method: "PUT",
      body: data,
      credentials: "include"
    });
    ev.preventDefault();
    const response = await fetch(//"http://192.168.43.1:4000/post"
      "http://localhost:4000/post"
    ,{
      method: "POST",
      body: data,
      credentials:"include",
    });
    if (response.ok){
      setRedirect(true);
    }
  }
if (redirect){
  return <Navigate to={"/"} />
}
  return (
    <form onSubmit={UpdatePost}>
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
      <ReactQuill
        value={content}
        onChange={(value) => setContent(value)}
        modules={modules}
        formats={formats}
      />
      <button style={{ marginTop: "5px" }}>Update Post</button>
    </form>
  );
}
