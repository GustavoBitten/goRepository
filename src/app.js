const express = require("express");
const cors = require("cors");

const {  uuid  } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

var repositories = [];

class Repository {
  constructor(id, title, url, techs, likes = 0) {
    this.id = id
    this.title = title
    this.url = url
    this.techs = techs
    this.likes = likes
  }
}

app.get("/repositories", (request, response) => {

  response.status(200).json(repositories)

});

app.post("/repositories", (request, response) => {

  const id = uuid()
  const { title, url, techs } = request.body
  const repository = new Repository(id, title, url, techs)

  response.status(201).json(repository)
  return repositories.push(repository)

});

app.put("/repositories/:id", (request, response) => {

  const {
    id
  } = request.params
  const {
    title,
    url,
    techs
  } = request.body

  let changeHappened = false

  repositories = repositories.map((repository) => {

    if (repository.id == id) {

      repository.title = title
      repository.url = url
      repository.techs = techs
      changeHappened = repository

    }
    return repository
  })

  if (changeHappened) {
    response.status(202).json(changeHappened)
  } else {
    response.status(400).json({
      error: 'this repository not exist'
    })
  }


});

app.delete("/repositories/:id", (request, response) => {

  const {
    id
  } = request.params

  const lengthBefore = repositories.length

  repositories = repositories.filter((repository) => {

    return repository.id != id

  })

  if (lengthBefore == repositories.length) {
    return response.status(400).json({
      error: 'this repository not exist'
    })
  } else {
    return response.status(204).send()
  }


});

app.post("/repositories/:id/like", (request, response) => {

  const {
    id
  } = request.params

  let changeHappened = false
  let receivedLike

  repositories = repositories.map((repository) => {

    if (repository.id == id) {

      repository.likes++
      changeHappened = true
     receivedLike = repository
    }
    return repository
  })

  if (changeHappened) {
    response.status(202).json(receivedLike)
  } else {
    response.status(400).json({
      error: 'this repository not exist'
    })
  }
  
});

module.exports = app;