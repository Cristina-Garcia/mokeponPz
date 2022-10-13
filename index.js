// const { response } = require("express");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.static("public"));
app.use(cors());
app.use(express.json());

const players = [];
class Player {
  constructor(id) {
    this.id = id;
  }
  assignMokepon(mokepon) {
    this.mokepon = mokepon;
  }

  updatePosition(x, y) {
    this.x = x;
    this.y = y;
  }
  assignAttacks(ataques) {
    this.ataques = ataques;
  }
}

class Mokepon {
  constructor(nombre) {
    this.nombre = nombre;
  }
}

app.get("/join", (req, res) => {
  const id = `${Math.random()}`;

  const player = new Player(id);
  players.push(player);

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send(id);
});

app.post("/mokepon/:playerId", (req, res) => {
  const playerId = req.params.playerId || "";
  const nombre = req.body.mokepon || "";
  const mokepon = new Mokepon(nombre);

  const playerIndex = players.findIndex((player) => playerId === player.id);

  if (playerIndex >= 0) {
    players[playerIndex].assignMokepon(mokepon);
  }

  console.log(players);
  console.log(playerId);
  res.end();
});

app.post("/mokepon/:playerId/position", (req, res) => {
  const playerId = req.params.playerId || "";
  const x = req.body.x || 0;
  const y = req.body.y || 0;

  const playerIndex = players.findIndex((player) => playerId === player.id);

  if (playerIndex >= 0) {
    players[playerIndex].updatePosition(x, y);
  }
  const enemies = players.filter((player) => playerId !== player.id);
  res.send({ enemies });
});

app.post("/mokepon/:playerId/ataques", (req, res) => {
  const playerId = req.params.playerId || "";
  const ataques = req.body.ataques || "";

  const playerIndex = players.findIndex((player) => playerId === player.id);

  if (playerIndex >= 0) {
    players[playerIndex].assignAttacks(ataques);
  }

  res.end();
});
app.get("/mokepon/:playerId/ataques", (req, res) => {
  const playerId = req.params.playerId || "";
  const player = players.find((player) => player.id === playerId);
  res.send({
    ataques: player.ataques || [],
  });
});
app.listen(8080, () => {
  console.log("Servidor funcionando");
});
