import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../api/api'

const Login = ()=>{
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e)=>{
        e.preventDefault()
        try{
            const res = await api.post("/api/auth/login", {email,password})
            localStorage.setItem("token",res.data.token);
            navigate("/tasks")
        }
        catch(error){
            alert(error.response?.data?.error || "login failed")
        }
    }

    return (
        <form onSubmit={handleSubmit} style={{display:'flex',justifyContent:'center', flexDirection:'column', width:'300px',margin:'10px', border:'2px solid black'}}>
            <input placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}} style={{margin:'4px 3px'}}/>
            <input placeholder="Password" type="password" onChange={(e)=>{setPassword(e.target.value)}} style={{margin:'3px'}} />
            <button style={{backgroundColor:'blue',color:"white",fontWeight:"bold", border:'none', padding:"4px"}} type="submit">Login</button>
        </form>
    )
}

export default Login;