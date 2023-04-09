import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

const users = []
const tweets = []
let newUsers

app.post('/sign-up', (req, res) => {
  newUsers = req.body
  users.push(newUsers)
  res.status(201).send('OK')
})

app.post('/tweets', (req, res) => {
  if (
    !newUsers.username ||
    newUsers.username === null ||
    newUsers.username === undefined
  ) {
    return res.status(401).send('UNAUTHORIZED')
  }
  const newTweets = req.body
  const user = {
    username: newUsers.username,
    avatar: newUsers.avatar,
    tweet: newTweets.tweet
  }
  tweets.push(user)
  res.status(201).send('OK')
})

app.get('/tweets', (req, res) => {
  if (!tweets) {
    res.send([])
    return
  }
  res.send(tweets.slice(-10).reverse())
})

app.get('/sign-up', (req, res) => {
  res.send(users)
})

const PORT = 5000

app.listen(PORT, () => console.log('Servidor rodando'))
