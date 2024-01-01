import express, { response } from 'express'

const app = express()

app.use('/', (request, response) => {
  response.send('Hello, world!')
})

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Backend listening on ${PORT}`)
})