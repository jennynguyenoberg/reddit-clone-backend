import "dotenv/config"
import express from 'express'
import mongoose from 'mongoose'
import * as authController from './controllers/auth'

const app = express()

app.use(express.json())

app.post('/register', authController.register)
app.post('/login', authController.logIn)

const mongoURL = process.env.DB_URL

if (!mongoURL) throw Error('Missing db url')

mongoose.connect(mongoURL)
  .then(() => {
    const PORT = parseInt(process.env.PORT || '3000')
    
    app.listen(PORT, () => {
      console.log(`Backend listening on ${PORT}`)
    })
  })
