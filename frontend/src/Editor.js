import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

export default function Editor({value,onChange}){
  return(
          <ReactQuill
        value={value}
        theme={"snow"}
        onChange={onChange}
        module={module}
      />
    )
}