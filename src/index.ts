import "dotenv/config"
import express, { response } from 'express'
import mongoose from 'mongoose'

const app = express()

app.use('/', (request, response) => {
  response.send('Hello, world!')
})

const mongoURL = process.env.DB_URL

if (!mongoURL) throw Error('Missing db url')

mongoose.connect(mongoURL)
  .then(() => {
    const PORT = parseInt(process.env.PORT || '3000')
    
    app.listen(PORT, () => {
      console.log(`Backend listening on ${PORT}`)
    })
  })
