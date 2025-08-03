import './App.css';
import Post from "./Post";
import Layout from "./Layout";
import Header from "./Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {UserContextProvider} from './UserContext';
import {Route, Routes} from "react-router-dom";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import EditPost from "./pages/EditPost";
function App() {
  return (
    <div className="App">
      <UserContextProvider>
         <Routes>
          <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
           <Route path="/create" element={<CreatePost />} />
           <Route path="/Post/:id" element={<PostPage />} />
        </Route>
         {/* <"Route path="/edit/:id" element={<EditPost />} />*/}
     </Routes>
      </UserContextProvider>
    </div>
  );
}

export default App;
