import express from 'express';
import dotenv from 'dotenv';
import { connectToDB } from './config/dbConnection.mjs';
import cors from 'cors'
import authRoutes from './routes/authRoutes.mjs';
import bookRoutes from './routes/bookRoutes.mjs';




dotenv.config()
const app = express()
app.use(express.json())

app.use(cors({
    origin:process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

connectToDB()

const port = process.env.PORT || 5001 

app.use('/api/auth', authRoutes)
app.use('/api/books', bookRoutes)



app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal server Error'

    return res.status(statusCode).json({
        success:false,
        statusCode,
        message

    })
})



app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
