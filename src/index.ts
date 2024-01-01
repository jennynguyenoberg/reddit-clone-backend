import "dotenv/config"
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import * as authController from './controllers/auth'
import * as postsController from './controllers/posts'
import validateToken from './middleware/validateToken'

const app = express()

app.use(cors())
app.use(express.json())

app.post('/register', authController.register)
app.post('/login', authController.logIn)
app.get('/profile', validateToken, authController.profile);

app.post('/posts', validateToken, postsController.create)
app.get('/posts', postsController.getAllPosts);

const mongoURL = process.env.DB_URL

if (!mongoURL) throw Error('Missing db url')

mongoose.connect(mongoURL)
  .then(() => {
    const PORT = parseInt(process.env.PORT || '3000')
    
    app.listen(PORT, () => {
      console.log(`Backend listening on ${PORT}`)
    })
  })
