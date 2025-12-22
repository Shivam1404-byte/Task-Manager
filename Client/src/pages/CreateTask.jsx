import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const CreateTask = ()=>{
    const [title,setTitle] = useState("")
    const [description,setDescription] = useState("")
    const navigate = useNavigate()

    const handleSubmit =async (e)=>{
        e.preventDefault()
        console.log(title,description)
        try{
            const res = await api.post('/api/tasks',{title,description})
            navigate('/tasks')
        }
        catch(err){
            console.warn("Task not Created")
        }
    }
    return (
        <form onSubmit={handleSubmit}
        style={{display:'flex',justifyContent:'center', flexDirection:'column', width:'400px' ,height:'110px',margin:'10px', border:'2px solid black'}}
        >
            <input placeholder="Enter Title" type="text" onChange={(e)=>{setTitle(e.target.value)}} style={{padding:'4px',margin:'4px'}}/>
            <textarea placeholder="Enter Description" type="text" onChange={(e)=>{setDescription(e.target.value)}} style={{padding:'4px',margin:'4px'}}/>
            <button type="Submit">Submit</button>
        </form>
    )
}

export default CreateTask;