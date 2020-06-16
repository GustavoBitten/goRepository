const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

var repositories = [];



class Repository {
  constructor(id,title,url,techs,likes = 0){
    this.id = id
    this.title = title
    this.url = url
    this.techs = techs
    this.likes = likes

  }
}

app.get("/repositories", (req, res) => {

  res.status(200).json(repositories)

});

app.post("/repositories", (req, res) => {

  const id = uuid()
  const {title,url,techs} = req.body

  const repository = new Repository(id,title,url,techs)

  res.status(201).json(repository)

  return repositories.push(repository)

});

app.put("/repositories/:id", (req, res) => {
  
  const {id} = req.params
  const {title,url,techs} = req.body

  let changeHappened = false 

  repositories = repositories.map((repository)=>{

    if(repository.id == id ){
      
      repository.title = title
      repository.url = url
      repository.techs = techs
      changeHappened = true
    }
    return repository
  })

  if(changeHappened){
    res.status(202).json(repositories)
  }else{
    res.status(400).json({error: 'this repository not exist'})
  }

  
});

app.delete("/repositories/:id", (req, res) => {
  
  

});

app.post("/repositories/:id/like", (req, res) => {
  // TODO
});

module.exports = app;