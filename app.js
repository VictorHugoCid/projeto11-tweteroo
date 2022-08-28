import express from 'express';
import cors from 'cors';

const app = express(); // Cria um servidor

app.use(cors());
app.use(express.json());

const users = [];

const tweets = [];

app.post("/sign-up", (req, res) => {
  const signUp = req.body

  // usando desestruturação:
  //const { user, avatar } = req.body
  // if(!use || !avatar)........

  if(signUp.user === '' || signUp.avatar ===''){
    res.status(400).send({error:'Todos os campos são obrigatórios!'})
    return
  }

  users.push(signUp);
  res.status(201).send('CREATED');
});

app.post('/tweets', (req, res) => {
  const newTweetPost = req.body;
  
  const username = req.body.username
  const avatar = users.find(user => user.username === username).avatar

  const newTweet = {...newTweetPost, avatar: avatar}

  if(newTweet.username === '' || newTweet.tweet ===''){
    res.status(400).send({error:'Todos os campos são obrigatórios!'})
    return
  }

  tweets.push(newTweet);
  res.send('OK');
});

app.get("/tweets", (req, res) => {

  const newTweets = tweets.map((value, index) => ({ ...value, id: index+1}))

  const tweets10 = newTweets.slice(-10)

  res.send(tweets10);
});


app.listen(5000);