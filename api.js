import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json())
app.use(cors())


const usuarios = [];
const tweets = [];


app.post('/sign-up', (req, res)=>{
    const username = req.body.username;
    const avatar = req.body.avatar;

    if(!username || !avatar){
        return res.status(400).send("Todos os campos são obrigatórios");

    }
    const novosUsuarios = req.body;
    usuarios.push(novosUsuarios)
    res.status(201).send("OK")
})

app.post('/tweets', (req, res) => {
	const username = req.headers.user;
	const tweet = req.body.tweet;
	if(username === "" || tweet === ""){
		res.status(400).send('Todos os campos são obrigatórios!');
		return;
	}
    const resultName = usuarios.find((user)=> user.username === username)
    if(!resultName){
        return res.status(404).send("UNAUTHORIZED")
    }
    
	tweets.unshift({username: username, tweet: tweet});
	// console.log(tweets);
	res.status(201).send("OK");
});

app.get("/tweets", (req, res) => {
    tweets.forEach((tweet) => {
      const result = usuarios.find((usuario) => usuario.username === tweet.username);

      tweet.avatar = result.avatar
    });
    const ultimosDez = tweets.slice(-10);
  
    res.send(ultimosDez);
  });


app.listen(5000, ()=> console.log("listening on port 5000"))