import { useState,useEffect } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const Tasks = () => {
    const [task,setTask] = useState([]);
    const [loading,setLoading] = useState(true)
    const navigate = useNavigate()
    const [editingId,setEditingId] = useState(null);
    const [editingValue,setEditingValue] = useState("")

    useEffect(()=>{
        api.get("/api/tasks")
            .then(res => {
                if(res.data && res.data.Tasks && Array.isArray(res.data.Tasks)){
                    setTask(res.data.Tasks)
                }
                else{
                    console.warn("Unexpected response Format",res.data)
                    setTask([])
                }
            })
            .catch(err => {console.error("Error fetching tasks:",err)
                setTask([])}    
            )
            .finally(()=>{
                setLoading(false)
            })
    },[])

const handleDelete = async (id)=>{
   try{
     await api.delete(`/api/tasks/${id}`)
    setTask(task.filter(t=> t.id != id))
   }
   catch(err){
    alert("Error deleting the task",err)
   }
}

const formatDate = (dateString)=>{
    if(!dateString) return "No Date"
    try{
        const date = new Date(dateString);
        return date.toLocaleDateString()
    }
    catch(err){
        return "Invalid Date"
    }
}

if(loading){
    return <div>Loading Tasks</div>
}

const link = ()=>{
    navigate('/createTask')
}

const handleUpdate = async (id) =>{
    if(!editingValue.trim()) return 

    try{
        const res = await api.put(`/api/tasks/${id}`,{
            title:editingValue
        })
        setTask(prev => prev.map((t)=>t.id === id? res.data:t))
        setEditingId(null)
        setEditingValue("")

    }
    catch(error){console.warn("Update Failed")}
}

const logout = ()=>{
    localStorage.removeItem('token')
    navigate('/login')
    alert('Logout Successful')
}

  return (
    <div>
        <h2>My Tasks ({task.length})</h2>
        <button onClick={logout}>Logout</button>
        
        {/* Add Loading State */}
        {task.length === 0 ? (<p>No Tasks yet Create your first Task <button onClick={link}>Create Task</button></p>):

        (task.map(task => (
            <div key={task.id} style={{
                border:"1px solid #ccc",
                padding:"8px",
                marginBottom:"8px",
                backgroundColor: task.completed ? "#f0fff0" : "#fff",minWidth:'300px'}}>
                {editingId === task.id?(
                    <input
                        style={{display:"block", marginBottom:"8px"}}
                        value={editingValue}
                        autoFocus
                        onChange={(e) => setEditingValue(e.target.value)}
                        onBlur={()=> handleUpdate(task.id)}
                        onKeyDown={(e)=>{
                            if (e.key == "Enter") handleUpdate(task.id)
                            if (e.key == "Escape"){
                                setEditingId(null)
                                setEditingValue("")
                            } 
                        }}
                    />
                ):(
                    <p
                        onClick={()=>{
                            setEditingId(task.id)
                            setEditingValue(task.title)
                        }}
                    >
                        <strong>{task.title}</strong>
                    </p>
                )}
                <textarea
                    defaultValue={task.description}
                    onBlur={async (e)=>{
                        const res = await api.put(`/api/tasks/${task.id}`,{
                            description: e.target.value
                        });
                    }} 
                />
                <p><small>Created At: {formatDate(task.created_at)}</small></p>
                <label style={{display:"Block", marginBottom:'10px'}}>
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={async (e)=>{
                        const res = await api.put(`/api/tasks/${task.id}`,{
                            completed:e.target.checked
                        });
                    setTask((prev=> prev.map(t=>t.id === task.id ? res.data : t)))
                    }}
                />{task.completed?"Completed":"Pending"}</label>
                <button onClick={()=>{handleDelete(task.id)}}>Delete</button>
                <button onClick={link}>Add Task</button>
            </div>
        )))}
    </div>
  )
};

export default Tasks;
