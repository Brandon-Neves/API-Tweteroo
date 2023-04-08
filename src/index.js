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
  res.send('OK')
})

app.post('/tweets', (req, res) => {
  if (!newUsers.username) {
    return res.sendStatus(400)
  }
  const newTweets = req.body
  const user = {
    username: newUsers.username,
    avatar: newUsers.avatar,
    tweet: newTweets.tweet
  }
  tweets.push(user)
  res.send('OK')
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
