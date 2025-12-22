import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const Register = ()=>{
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const res = await api.post('/api/auth/register', {email,password})
            localStorage.setItem('token',res.data.token)
            navigate('/login')
        }
        catch(error){
            alert(error.response?.data?.error||"Register Failed")
        }
    }

    return (
        <form onSubmit={handleSubmit} style={{display:'flex',justifyContent:'center', flexDirection:'column', width:'300px',margin:'10px', border:'2px solid black'}}>
            <input placeholder="Email" type="text" onChange={(e)=>{setEmail(e.target.value)}} style={{margin:'4px 3px'}}/>
            <input placeholder="Password" type="password" onChange={(e)=>{setPassword(e.target.value)}} style={{margin:'3px'}}/>
            <button type="submit" style={{backgroundColor:'blue',color:"white",fontWeight:"bold", border:'none', padding:"4px"}}>Register</button>
        </form>
    )
}

export default Register;