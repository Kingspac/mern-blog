import './App.css';
import Post from "./Post";
import Layout from "./Layout";
import Header from "./Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {Route, Routes} from "react-router-dom";

function App() {
  return (
    <div className="App">
     <Routes>
       <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
       </Route>
      
     </Routes>
    </div>
  );
}

export default App;
