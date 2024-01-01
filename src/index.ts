import "dotenv/config"
import express from 'express'
import mongoose from 'mongoose'
import User from "./models/User"

const app = express()

app.use(express.json())

app.post('/register', async (req, res) => {
  const { username, password } = req.body

  try {
    if (await User.findOne({ userName: username })) {
      return res.status(400).json({ message: "Username taken" })
    }

    const user = new User({ userName: username, password })
    await user.save()
   
    res.status(201).json({ username, id: user._id })
  } catch (error) {
      console.log(error)
      res.status(500).send('Internal Server Error')
  }
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
