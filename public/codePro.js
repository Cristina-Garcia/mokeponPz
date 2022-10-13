const sectionSelectAttack = document.getElementById("section-attack");
// seleccionamos el elemento al que vamos a hacer funcionar
const sectionReload = document.getElementById("restart");
const buttonPetPlayer = document.getElementById("button-pet");

const sectionSelectPet = document.getElementById("section-pet");

const spanPet = document.getElementById("name-pet");

const spanPetEnemy = document.getElementById("namePetEnemy");
const buttonRestart = document.getElementById("button-restart");
const spanLifePlayer = document.getElementById("life-player");
const spanLifeEnemy = document.getElementById("life-enemy");

const sectionMessage = document.getElementById("result");
const attackOfEnemy = document.getElementById("attack-enemy");
const attackOFPlayer = document.getElementById("attack-player");
const conteinerCards = document.getElementById("conteiner-cards");
const conteinerAttacks = document.getElementById("conteiner-attacks");

const sectionSeeMap = document.getElementById("see-map");
const map = document.getElementById("map");

let playerId = null;
let enemyId = null;
let mokepones = [];
// dentro de los corchetes puedo ir metiendo cada uno de los valores que me interesan
let mokeponesEnemigos = [];
let attackPlayer = [];
let attackEnemy = [];
let optionMokepones;
let inputHipodoge;
let inputCapipepo;
let inputRatigueya;
let petPlayer;
let petPlayerObject;
let attacksMokepon;
let attackMokeponEnemy;
let buttonFire;
let buttonWater;
let buttonGround;
let buttons = [];
let indexAttackPlayer;
let indexAttackEnemy;
let victoriesPlayer = 0;
let victoriesEnemy = 0;
let lifeGamer = 3;
let lifeEnemy = 3;
let lienzo = map.getContext("2d");
let interval;
let mapBackground = new Image();
mapBackground.src = "./image/mokemap.png";

let heightSearch;
let widthMap = window.innerWidth - 20;

const widthMaxMap = 350;
if (widthMap > widthMaxMap) {
  widthMap = widthMaxMap - 20;
}
heightSearch = (widthMap * 600) / 800;
map.width = widthMap;
map.height = heightSearch;

class Mokepon {
  constructor(nombre, foto, vida, fotoMap, id = null) {
    // this hace referencia a la clase, osea Mokepon
    this.id = id;
    this.nombre = nombre;
    this.foto = foto;
    this.vida = vida;
    this.ataques = [];
    this.width = 40;
    this.height = 40;
    this.x = aleatorio(0, map.width - this.width);
    this.y = aleatorio(0, map.height - this.height);
    this.mapFoto = new Image();
    this.mapFoto.src = fotoMap;
    this.speedX = 0;
    this.speedY = 0;
  }
  drawMokepon() {
    lienzo.drawImage(this.mapFoto, this.x, this.y, this.width, this.height);
  }
}
let hipodoge = new Mokepon(
  "Hipodoge",
  "./image/hipodoge.png",
  5,
  "./image/hipodogeHead.png"
);

let capipepo = new Mokepon(
  "Capipepo",
  "./image/capipepo.png",
  5,
  "./image/capipepoHead.png"
);
let ratigueya = new Mokepon(
  "Ratigueya",
  "./image/ratigueya.png",
  5,
  "./image/ratigueyaHead.png"
);

const HIPODOGE_ATTACK = [
  { nombre: "💧", id: "button-water" },
  { nombre: "💧", id: "button-water" },
  { nombre: "💧", id: "button-water" },
  { nombre: "🔥", id: "button-fire" },
  { nombre: "🌱", id: "button-ground" },
];

hipodoge.ataques.push(...HIPODOGE_ATTACK);
// hipodogeEnemy.ataques.push(...HIPODOGE_ATTACK);

const CAPIPEPO_ATTACK = [
  { nombre: "🌱", id: "button-ground" },
  { nombre: "🌱", id: "button-ground" },
  { nombre: "🌱", id: "button-ground" },
  { nombre: "💧", id: "button-water" },
  { nombre: "🔥", id: "button-fire" },
];
capipepo.ataques.push(...CAPIPEPO_ATTACK);
// capipepoEnemy.ataques.push(...CAPIPEPO_ATTACK);

const RATIGUEYA_ATTACK = [
  { nombre: "🔥", id: "button-fire" },
  { nombre: "🔥", id: "button-fire" },
  { nombre: "🔥", id: "button-fire" },
  { nombre: "💧", id: "button-water" },
  { nombre: "🌱", id: "button-ground" },
];
ratigueya.ataques.push(...RATIGUEYA_ATTACK);
// ratigueyaEnemy.ataques.push(...RATIGUEYA_ATTACK);

mokepones.push(hipodoge, capipepo, ratigueya);

function startGame() {
  sectionSelectAttack.style.display = "none";
  sectionSeeMap.style.display = "none";
  //nos ayuda a iterar o recorrer cada uno de los objetos que están en el arreglo
  //por cada mokepon que existe en un arreglo de mokepones, haz lo siguiente
  mokepones.forEach((mokepon) => {
    optionMokepones = `<input type="radio" name="mascota" id=${mokepon.nombre} />
          <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre} />
          </label>`;
    conteinerCards.innerHTML += optionMokepones;

    inputHipodoge = document.getElementById("Hipodoge");
    inputCapipepo = document.getElementById("Capipepo");
    inputRatigueya = document.getElementById("Ratigueya");
  });

  sectionReload.style.display = "none";

  //al elemento le hacemos funcionar con dos parametros
  buttonPetPlayer.addEventListener("click", selectPetPlayer);
  // varaibles para botones de ataque, elemento de DOM seleccionado, al hacer click
  //hará lo que dice la funcion del segundo parametro

  buttonRestart.addEventListener("click", restartGame);

  joinGame();
}
function joinGame() {
  fetch("http://192.168.30.199:8080/join").then(function (res) {
    console.log(res);
    if (res.ok) {
      res.text().then(function (respuesta) {
        console.log(respuesta);
        playerId = respuesta;
      });
    }
  });
}
// como abajo nombramos un parametro, ahora creamos una funcion para  que se trabaje al hacer click
function selectPetPlayer() {
  //agregando un mokepon a canvas

  if (inputHipodoge.checked) {
    spanPet.innerHTML = inputHipodoge.id;
    petPlayer = inputHipodoge.id;
  } else if (inputCapipepo.checked) {
    spanPet.innerHTML = inputCapipepo.id;
    petPlayer = inputCapipepo.id;
  } else if (inputRatigueya.checked) {
    spanPet.innerHTML = inputRatigueya.id;
    petPlayer = inputRatigueya.id;
  } else {
    alert("Selecciona alguna mascota");
    return;
  }
  sectionSelectPet.style.display = "none";

  selectMokepon(petPlayer);

  extractAttack(petPlayer);
  sectionSeeMap.style.display = "flex";
  startMap();
}

function selectMokepon(petPlayer) {
  fetch(`http://192.168.30.199:8080/mokepon/${playerId}`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      mokepon: petPlayer,
    }),
  });
}

//decimos que recibe un parametro para poderlo usar como variable interna
function extractAttack(petPlayer) {
  let attacks;
  for (let i = 0; i < mokepones.length; i++) {
    if (petPlayer === mokepones[i].nombre) {
      attacks = mokepones[i].ataques;
    }
  }
  showAttack(attacks);
}

function showAttack(attacks) {
  attacks.forEach((attack) => {
    attacksMokepon = ` <button id=${attack.id} class="button-attack btn-attack">${attack.nombre}</button>`;

    conteinerAttacks.innerHTML += attacksMokepon;
  });

  buttonFire = document.getElementById("button-fire");
  buttonWater = document.getElementById("button-water");
  buttonGround = document.getElementById("button-ground");
  buttons = document.querySelectorAll(".btn-attack");
}
function secuenceAttack() {
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      if (e.target.textContent === "🔥") {
        attackPlayer.push("FUEGO");
        console.log(attackPlayer);
        button.style.background = "#5e83ba";
        button.disabled = true;
      } else if (e.target.textContent === "💧") {
        attackPlayer.push("AGUA");
        console.log(attackPlayer);
        button.style.background = "#5e83ba";
        button.disabled = true;
      } else {
        attackPlayer.push("TIERRA");
        console.log(attackPlayer);
        button.style.background = "#5e83ba";
        button.disabled = true;
      }
      // attackRandomEnemy();
      if (attackPlayer.length === 5) {
        sendAttacks();
      }
    });
  });
}
function sendAttacks() {
  fetch(`http://192.168.30.199:8080/mokepon/${playerId}/ataques`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ataques: attackPlayer,
    }),
  });
  interval = setInterval(getAttacks, 50);
}
function getAttacks() {
  fetch(`http://192.168.30.199:8080/mokepon/${enemyId}/ataques`).then(function (
    res
  ) {
    if (res.ok) {
      res.json().then(function ({ ataques }) {
        if (ataques.length === 5) {
          attackEnemy = ataques;
          combat();
        }
      });
    }
  });
}
//funcion para que aleatoreamente para el enemigo se elija una mascota
function selectPetEnemy() {
  let petRandom = aleatorio(0, mokepones.length - 1);

  //quremos que nos imprima el nombre del personaje por eso agregamos nombre,además debemos utilizar innerHTML
  spanPetEnemy.innerHTML = mokepones[petRandom].nombre;
  attackMokeponEnemy = mokepones[petRandom].ataques;
  secuenceAttack();
}

//creamos función para generar un attaque aleatorio del enemigo
function attackRandomEnemy() {
  let attackRandom = aleatorio(0, attackMokeponEnemy.length - 1);
  if (attackRandom == 0 || attackRandom == 1) {
    attackEnemy.push("FUEGO");
  } else if (attackRandom == 3 || attackRandom == 4) {
    attackEnemy.push("AGUA ");
  } else {
    attackEnemy.push("TIERRA");
  }
  console.log(attackEnemy);
  startCombat();
}
function startCombat() {
  if (attackPlayer.length === 5) {
    combat();
  }
}
function indexBothOpponent(player, enemy) {
  indexAttackPlayer = attackPlayer[player];
  indexAttackEnemy = attackEnemy[enemy];
}
function combat() {
  clearInterval(interval);
  for (let index = 0; index < attackPlayer.length; index++) {
    if (attackPlayer[index] === attackEnemy[index]) {
      indexBothOpponent(index, index);
      createMessage("EMPATE");
    } else if (
      attackPlayer[index] === "FUEGO" &&
      attackEnemy[index] === "TIERRA"
    ) {
      indexBothOpponent(index, index);
      createMessage("GANASTE");
      victoriesPlayer++;
      spanLifePlayer.innerHTML = victoriesPlayer;
    } else if (
      attackPlayer[index] === "AGUA" &&
      attackEnemy[index] === "FUEGO"
    ) {
      indexBothOpponent(index, index);
      createMessage("GANASTE");
      victoriesPlayer++;
      spanLifePlayer.innerHTML = victoriesPlayer;
    } else if (
      attackPlayer[index] === "TIERRA" &&
      attackEnemy[index] === "AGUA"
    ) {
      indexBothOpponent(index, index);
      createMessage("GANASTE");
      victoriesPlayer++;
      spanLifePlayer.innerHTML = victoriesPlayer;
    } else {
      indexBothOpponent(index, index);
      createMessage("PERDISTE");
      victoriesEnemy++;
      spanLifeEnemy.innerHTML = victoriesEnemy;
    }
  }
  reviewLives();
}

function reviewLives() {
  if (victoriesPlayer === victoriesEnemy) {
    createMessageFinal("¡ESTO ES UN EMPATE!");
  } else if (victoriesPlayer > victoriesEnemy) {
    createMessageFinal("FELICITACIONES! GANASTE");
  } else {
    createMessageFinal("UPS! HAS PERDIDO");
  }
}

//FUNCION PARA CCREAR MENSAJES POR CADA ATAQUE
function createMessage(result) {
  let newAttackPlayer = document.createElement("p");
  let newAttackEnemy = document.createElement("p");

  sectionMessage.innerHTML = result;
  newAttackPlayer.innerHTML = indexAttackPlayer;
  newAttackEnemy.innerHTML = indexAttackEnemy;

  attackOfEnemy.appendChild(newAttackEnemy);
  attackOFPlayer.appendChild(newAttackPlayer);
}

function createMessageFinal(resultFinal) {
  sectionMessage.innerHTML = resultFinal;

  sectionReload.style.display = "block";
}

function restartGame() {
  location.reload();
}

//funcion de aleatorio
function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function drawCanvas() {
  petPlayerObject.x = petPlayerObject.x + petPlayerObject.speedX;
  petPlayerObject.y = petPlayerObject.y + petPlayerObject.speedY;

  lienzo.clearRect(0, 0, map.width, map.height);
  lienzo.drawImage(mapBackground, 0, 0, map.width, map.height);
  // lienzo.drawImage(
  //   petPlayerObject.mapFoto,
  //   petPlayerObject.x,
  //   petPlayerObject.y,
  //   petPlayerObject.width,
  //   petPlayerObject.height
  // );
  petPlayerObject.drawMokepon();

  sendPosition(petPlayerObject.x, petPlayerObject.y);
  mokeponesEnemigos.forEach(function (mokepon) {
    mokepon.drawMokepon();
    reviewCollision(mokepon);
  });
  // hipodogeEnemy.drawMokepon();
  // capipepoEnemy.drawMokepon();
  // ratigueyaEnemy.drawMokepon();

  // if (petPlayerObject.speedX !== 0 || petPlayerObject.speedY !== 0) {
  //   reviewCollision(hipodogeEnemy);
  //   reviewCollision(capipepoEnemy);
  //   reviewCollision(ratigueyaEnemy);
  // }
}
function sendPosition(x, y) {
  fetch(`http://192.168.30.199:8080/mokepon/${playerId}/position`, {
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      x,
      y,
    }),
  }).then(function (res) {
    if (res.ok) {
      res.json().then(function ({ enemies }) {
        console.log(enemies);
        mokeponesEnemigos = enemies.map(function (enemy) {
          let mokeponEnemy = null;
          const mokeponName = enemy.mokepon.nombre || "";
          if (mokeponName === "Hipodoge") {
            mokeponEnemy = new Mokepon(
              "Hipodoge",
              "./image/hipodoge.png",
              5,
              "./image/hipodogeHead.png",
              enemy.id
            );
          } else if (mokeponName === "Capipepo") {
            mokeponEnemy = new Mokepon(
              "Capipepo",
              "./image/capipepo.png",
              5,
              "./image/capipepoHead.png",
              enemy.id
            );
          } else if (mokeponName === "Ratigueya") {
            mokeponEnemy = new Mokepon(
              "Ratigueya",
              "./image/ratigueya.png",
              5,
              "./image/ratigueyaHead.png",
              enemy.id
            );
          }
          mokeponEnemy.x = enemy.x;
          mokeponEnemy.y = enemy.y;

          return mokeponEnemy;
        });
      });
    }
  });
}

function moveRight() {
  petPlayerObject.speedX = 5;
  // capipepo.x = capipepo.x + 5;
  // drawCanvas();
}
function moveDown() {
  petPlayerObject.speedY = 5;
  // capipepo.y = capipepo.y + 5;
  // drawCanvas();
}
function moveLeft() {
  petPlayerObject.speedX = -5;
  // capipepo.x = capipepo.x - 5;
  // drawCanvas();
}
function moveUp() {
  petPlayerObject.speedY = -5;
  // capipepo.y = capipepo.y - 5;
  // drawCanvas();
}
function stopMove() {
  const myMokepon = getObjectPet();
  petPlayerObject.speedX = 0;
  petPlayerObject.speedY = 0;
}
function wasPressedKey(event) {
  switch (event.key) {
    case "ArrowUp":
      moveUp();
      break;
    case "ArrowDown":
      moveDown();
      break;
    case "ArrowLeft":
      moveLeft();
      break;
    case "ArrowRight":
      moveRight();
      break;
    default:
      break;
  }
}
function startMap() {
  petPlayerObject = getObjectPet(petPlayer);
  interval = setInterval(drawCanvas, 50);
  // let imageCapipepo = new Image();
  // imageCapipepo.src = capipepo.foto;
  window.addEventListener("keydown", wasPressedKey);
  window.addEventListener("keyup", stopMove);
}
function getObjectPet() {
  for (let i = 0; i < mokepones.length; i++) {
    if (petPlayer === mokepones[i].nombre) {
      return mokepones[i];
    }
  }
}

function reviewCollision(enemy) {
  const upEnemy = enemy.y;
  const downEnemy = enemy.y + enemy.height;
  const rightEnemy = enemy.x + enemy.width;
  const leftEnemy = enemy.x;

  const upPet = petPlayerObject.y;
  const downPet = petPlayerObject.y + petPlayerObject.height;
  const rightPet = petPlayerObject.x + petPlayerObject.width;
  const leftPet = petPlayerObject.x;

  if (
    downPet < upEnemy ||
    upPet > downEnemy ||
    rightPet < leftEnemy ||
    leftPet > rightEnemy
  ) {
    return;
  }
  stopMove();
  clearInterval(interval);
  console.log("Se detecto una colision");

  enemyId = enemy.id;
  sectionSelectAttack.style.display = "flex";
  sectionSeeMap.style.display = "none";
  selectPetEnemy(enemy);
  //alert("Hay colision con" + enemy.nombre);
}
window.addEventListener("load", startGame);
