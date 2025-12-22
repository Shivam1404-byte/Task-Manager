const pool = require('../config/db')

const createTask = async (req,res)=>{
    try{
        const {title,description} = req.body
        const userId = req.userId

        if(!title){
            return res.status(400).json({Error:'Title Required'})
        }

        const task = await pool.query(
            'INSERT INTO tasks (user_id,title,description ) VALUES ($1,$2,$3) RETURNING *',[userId,title,description]
        );

        res.json({
            message:'Task Created Successfully',
            Task:task.rows[0]
        })
    }
    catch(error){
        console.log(error)
        res.status(500).json({Error:'Server Error'})
    }
}

const getTask = async (req,res)=>{
    try{
        const userId = req.userId

        const tasks = await pool.query(
            'SELECT * FROM tasks WHERE user_Id = $1 ORDER BY created_at DESC',[userId]
        );

        res.json({
            Tasks:tasks.rows
        })
    }
    catch(error){
        console.log(error)
        res.status(500).json({Error:'Server Error'})
    }
}

const updateTask = async (req,res)=>{
    try{
        const {id} = req.params
        const {title,description,completed} = req.body
        const userId = req.userId

        const task = await pool.query(
            'SELECT * FROM tasks WHERE id = $1 AND user_id = $2',[id,userId]
        );

        if(task.rows.length === 0){
            return res.status(404).json({Error:"Task not found"})
        }

        const updateTask = await pool.query(
            'UPDATE tasks SET title = $1,description = $2, completed = $3 WHERE id = $4 AND user_id = $5 RETURNING id, title, description, completed, created_at',[
                title || task.rows[0].title,
                description !== undefined ? description:task.rows[0].description,
                completed !== undefined ? completed:task.rows[0].completed,
                id,
                userId
            ]
        );

        res.json(updateTask.rows[0])
    }
    catch(error){
        console.log(error)
        res.status(500).json({Error:'Server Error'})
    }
}

const deleteTask = async (req,res)=>{
    try{
        const {id} = req.params
        const userId = req.userId

        const task = await pool.query(
            'SELECT * FROM tasks WHERE id = $1 AND user_Id = $2',[id,userId]
        )

        if(task.rows.length === 0){
            return res.status(404).json({Error:'Task not Found'})
        }

        await pool.query(
            'DELETE FROM tasks WHERE id = $1 && user_id = $2 RETURNING *',[id,userId]
        )

        res.json({
            message:"Task Deleted Successfully"
        })
    }
    catch(error){
        console.log(error)
        res.status(500).json({Error:'Server Error'})
    }
}

module.exports = {createTask,getTask,updateTask,deleteTask}