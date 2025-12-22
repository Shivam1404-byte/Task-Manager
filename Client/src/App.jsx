import { BrowserRouter,Routes,Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Tasks from "./pages/Task"
import CreateTask from "./pages/CreateTask"
function App() {

  return (
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path='/createTask' element={<CreateTask/>}/>
        <Route path="/Tasks" element={<Tasks/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
