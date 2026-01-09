const pool = require('../config/db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()

const register = async (req,res)=>{
    try{
        const {email,password} = req.body

        if(!email || !password){
            return res.status(400).json({Message:'Email and password are required'})
        }

        const userExists = await pool.query("SELECT * FROM users WHERE email = $1",[email])

        if(userExists.rows.length > 0){
            return res.status(409).json({Error:"User already Exist"})
        }

        const hashPassword = await bcrypt.hash(password,10)

        const NewUser = await pool.query(
            'INSERT INTO users (email,password) VALUES ($1,$2) RETURNING id,email',[email,hashPassword]
        );

        const token = jwt.sign(
            {userId:NewUser.rows[0].id},
            process.env.JWT_SECRET,
            {expiresIn:'7d'}
        )

        res.json({
            Message:"User Created Successfully",
            token,
            user:NewUser.rows[0]
        })
    }
    catch(error){
        console.log(error)
        res.status(500).json("Server Error")
    }
}

const login = async (req,res)=>{
    try{
        const {email,password} = req.body

        if(!email || !password){
            return res.status(400).json({Error:"Email and Password required!"});
        }

        const user = await pool.query(
            'SELECT * FROM users WHERE email = $1',[email]
        );

        if (user.rows.length === 0){
            return res.status(409).json({Error:"Invalid Credentials"})
        }

        const validPassword = await bcrypt.compare(
            password,
            user.rows[0].password
        )

        if(!validPassword){
            return res.status(401).json({Error:"Invalid Credentials"})
        }

        const token = jwt.sign(
            {userId:user.rows[0].id},
            process.env.JWT_SECRET,
            {expiresIn:'7d'}
        )

        res.json(
            {message:"Login Successful",
            token,
            user:{id:user.rows[0].id, email:user.rows[0].email}
            }
        )
    }
    catch(error){
        console.log(error)
        res.status(500).json({Error:"Server Error"})
    }
}

module.exports = {register,login}   