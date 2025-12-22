const express = require('express')
const {createTask,getTask,updateTask,deleteTask} = require('../Controller/taskController')
const authMiddleware = require('../Middleware/authMiddleware')

const router = express.Router()

router.post('/',authMiddleware,createTask)
router.get('/',authMiddleware,getTask)
router.put('/:id',authMiddleware,updateTask)
router.delete('/:id',authMiddleware,deleteTask)

module.exports = router;