import express, { response } from 'express'
import mongoose from 'mongoose'

const app = express()

app.use('/', (request, response) => {
  response.send('Hello, world!')
})

mongoose.connect('mongodb://localhost:27017/reddit-clone')
  .then(() => {
    const PORT = 3000
    
    app.listen(PORT, () => {
      console.log(`Backend listening on ${PORT}`)
    })
  })
