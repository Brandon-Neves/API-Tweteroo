import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

const users = []
const tweets = []
const avatar = []

app.post('/sign-up', (req, res) => {
  const newUsername = req.body.username
  const newAvatar = req.body.avatar

  if (!newUsername || !newAvatar) {
    return res.status(400).send('Todos os campos são obrigatórios!')
  }
  users.push({ username: newUsername, avatar: newAvatar })
  res.status(201).send('OK')
})

app.post('/tweets', (req, res) => {
  const username = req.body.username
  const tweet = req.body.tweet
  if (!username) {
    return res.status(401).send('UNAUTHORIZED')
  }
  const userIsExist = users.filter(user => user.username === username)
  const [newUser] = userIsExist

  const newAvatar = newUser.avatar

  tweets.push({ username, tweet })
  avatar.push({ username, avatar: newAvatar, tweet })
  res.status(201).send('OK')
})

app.get('/tweets', (req, res) => {
  if (!tweets) {
    res.send([])
    return
  }
  res.send(avatar.slice(-10).reverse())
})

app.get('/sign-up', (req, res) => {
  res.send(users)
})

const PORT = 5000

app.listen(PORT, () => console.log('Servidor rodando'))
