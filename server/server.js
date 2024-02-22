const PORT = process.env.PORT ?? 5000;
const express = require('express')
const { v4: uuidv4} = require('uuid')
const cors = require('cors')
const app = express()
const pool = require('./db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

app.use(cors())
app.use(express.json())

// get all attraction
app.get('/attraction/:userEmail', async (req, res) =>{
    const { userEmail } = req.params
    console.log()

    try {
        const attraction = await pool.query('SELECT * FROM attraction WHERE user_email = $1', [userEmail])
        res.json(attraction.rows)
    } catch (err) {
       console.error(err) 
    }
})

//создание новой дост
app.post('/attraction', async (req, res) =>{
    const { user_email, title, date} = req.body
    const id = uuidv4()
    try {
        const newAtt = await pool.query(`INSERT INTO attraction(id, user_email, title, date) VALUES ($1, $2, $3, $4)`,
        [id, user_email, title, date])
        res.json(newAtt)
    } catch (err) {
       console.error(err) 
    }
})

//редактировать дост
app.put('/attraction/:id', async (req, res) =>{
    const {id} = req.params
    const {user_email, title, date} = req.body
    try {
        const editAtt = await pool.query('UPDATE attraction SET user_email = $1, title = $2, date = $3 WHERE id = $4;', [user_email, title, date, id])
        res.json(editAtt)
    } catch (err) {
        console.error(err)
    }
})


//удаление дост
app.delete('/attraction/:id', async(req,res) => {
    const {id} = req.params
    const deleteAtt = await pool.query('DELETE FROM  attraction WHERE id = $1;', [id])
    res.json(deleteAtt)
    try {
        
    } catch (err) {
        console.error(err0)
    }
})

//регистрация
app.post('/singup', async (req, res) => {
    const {email, password} = req.body
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)

    try {
        const signUp = await pool.query(`INSERT INTO users (email, hashed_password) VALUES ($1, $2)`,
            [email, hashedPassword])

        const token = jwt.sign({email}, 'secret', {expiresIn: '1hr'})
    
        res.json({email, token})
    } catch (err) {
        console.error(err)
        if(err){
            res.json({detail: err.detail})
        }
    }
})

//авторизация
app.post('/login', async (req, res) => {
    const {email, password} = req.body
    try {
        const users = await pool.query('SELECT * FROM users WHERE email = $1', [email])
    
        if(!users.rows.length) return res.json({detail: 'Пользователь не существует!'})
    
        const success = await bcrypt.compare(password, users.rows[0].hashed_password)
        const token = jwt.sign({email}, 'secret', {expiresIn: '1hr'})

        if(success){
            res.json({'email': users.rows[0].email, token})
        }else{
            res.json({detail: 'Ошибка авторизации'})
        }
    } catch (err) {
        console.error(err)
    }
})

app.listen(PORT, ( )=> console.log(`Сервер запущен на порту ${PORT}`));
