import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

const users = []
const tweets = []

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
  if (!username || username === ' ' || !tweet || tweet === '') {
    res.status(401).send('UNAUTHORIZED')
    return
  }

  tweets.push({ username, tweet })
  res.status(201).send('OK')
})

app.get('/tweets', (req, res) => {
  const loggedUser = tweets.map(tweet => {
    const user = users.find(item => item.username === tweet.username)
    return { username: user.username, avatar: user.avatar, tweet: tweet.tweet }
  })
  if (!loggedUser) {
    res.send([])
    return
  }
  res.send(loggedUser.slice(-10).reverse())
})

app.get('/sign-up', (req, res) => {
  res.send(users)
})

const PORT = 5000

app.listen(PORT, () => console.log('Servidor rodando'))
