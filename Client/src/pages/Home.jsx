import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate()
    const [hover,setHover] = useState(false)
    return (
        <>
            <h1>Task Manager</h1>
            <button
            onMouseEnter={()=>setHover(true)}
            onMouseLeave={()=>setHover(false)} 
            onClick={()=>{navigate('/register')}} style={{
                backgroundColor:hover?'blue':"black",
                color:"white",
                fontWeight:"bold",
                 border:'none',
                  padding:"4px",
                    margin:'10px' ,
                }}
                
                >Register</button>
            <button onClick={()=>{navigate('/login')}} 
             onMouseEnter={()=>setHover(true)}
            onMouseLeave={()=>setHover(false)} 
            style={{backgroundColor:hover?'green':"black",
                color:"white",
                fontWeight:"bold",
                 border:'none', 
                 padding:"4px" ,
                  margin:'10px',
                  padding:'8px'}} >Login</button>
        </>
    )
}

export default Home;