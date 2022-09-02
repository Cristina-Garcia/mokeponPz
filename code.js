let attackPlayer;
let attackEnemy;
let lifeGamer = 3;
let lifeEnemy = 3;

function startGame() {
  let sectionSelectAttack = document.getElementById("section-attack");
  sectionSelectAttack.style.display = "none";

  let sectionReload = document.getElementById("restart");
  sectionReload.style.display = "none";

  // seleccionamos el elemento al que vamos a hacer funcionar
  let buttonPetPlayer = document.getElementById("button-pet");
  //al elemento le hacemos funcionar con dos parametros
  buttonPetPlayer.addEventListener("click", selectPetPlayer);
  // varaibles para botones de ataque, elemento de DOM seleccionado, al hacer click
  //hará lo que dice la funcion del segundo parametro
  let buttonFire = document.getElementById("button-fire");
  buttonFire.addEventListener("click", attackFire);
  let buttonWater = document.getElementById("button-water");
  buttonWater.addEventListener("click", attackWater);
  let buttonGround = document.getElementById("button-ground");
  buttonGround.addEventListener("click", attackGround);

  let buttonRestart = document.getElementById("button-restart");
  buttonRestart.addEventListener("click", restartGame);
}
// como abajo nombramos un parametro, ahora creamos una funcion para  que se trabaje al hacer click
function selectPetPlayer() {
  let sectionSelectPet = document.getElementById("section-pet");
  sectionSelectPet.style.display = "none";

  let sectionSelectAttack = document.getElementById("section-attack");
  sectionSelectAttack.style.display = "flex";

  let inputHipodoge = document.getElementById("hipodoge");
  let inputCapipepo = document.getElementById("capipepo");
  let inputRatigueya = document.getElementById("ratigueya");
  let spanPet = document.getElementById("name-pet");

  if (inputHipodoge.checked) {
    // alert("Seleccionaste como mascota a hipodoge");
    spanPet.innerHTML = "Hipodoge";
  } else if (inputCapipepo.checked) {
    spanPet.innerHTML = "Capipepo";
    // alert("Seleccionaste como mascota a Capipepo");
  } else if (inputRatigueya.checked) {
    // alert("Seleccionaste como mascota a Ratigueya");
    spanPet.innerHTML = "Ratigueya";
  } else {
    alert("Selecciona alguna mascota");
  }
  selectPetEnemy();
}
//funcion para que aleatoreamente para el enemigo se elija una mascota
function selectPetEnemy() {
  let petRandom = aleatorio(1, 3);
  let spanPetEnemy = document.getElementById("namePetEnemy");

  if (petRandom == 1) {
    spanPetEnemy.innerHTML = "Hipodoge";
  } else if (petRandom == 2) {
    spanPetEnemy.innerHTML = "Capipepo";
  } else if (petRandom == 3) {
    spanPetEnemy.innerHTML = "Ratigueya";
  }
}

//declaramos las funciones a ejecutarse al hacer click en el
//botón de ataque
function attackFire() {
  attackPlayer = "FUEGO";
  // alert(attackPlayer);
  attackRandomEnemy();
}
function attackWater() {
  attackPlayer = "AGUA";
  // alert(attackPlayer);
  attackRandomEnemy();
}
function attackGround() {
  attackPlayer = "TIERRA";
  // alert(attackPlayer);
  attackRandomEnemy();
}
//creamos funciónpara generar un attaque aleatorio del enemigo
function attackRandomEnemy() {
  let attackRandom = aleatorio(1, 3);
  if (attackRandom == 1) {
    attackEnemy = "FUEGO";
  } else if (attackRandom == 2) {
    attackEnemy = "AGUA ";
  } else if (attackRandom == 3) {
    attackEnemy = "TIERRA";
  }

  combat();
}
function combat() {
  let spanLifePlayer = document.getElementById("life-player");
  let spanLifeEnemy = document.getElementById("life-enemy");

  if (attackEnemy == attackPlayer) {
    createMessage("EMPATE");
  } else if (attackPlayer == "FUEGO" && attackEnemy == "TIERRA") {
    createMessage("GANASTE");
    lifeEnemy--;
    spanLifeEnemy.innerHTML = lifeEnemy;
  } else if (attackPlayer == "AGUA" && attackEnemy == "FUEGO") {
    createMessage("GANASTE");
    lifeEnemy--;
    spanLifeEnemy.innerHTML = lifeEnemy;
  } else if (attackPlayer == "TIERRA" && attackEnemy == "AGUA") {
    createMessage("GANASTE");
    lifeEnemy--;
    spanLifeEnemy.innerHTML = lifeEnemy;
  } else {
    createMessage("PERDISTE");
    lifeGamer--;
    spanLifePlayer.innerHTML = lifeGamer;
  }
  reviewLives();
}
function reviewLives() {
  if (lifeEnemy == 0) {
    createMessageFinal("FELICITACIONES! GANASTE");
  } else if (lifeGamer == 0) {
    createMessageFinal("UPS! HAS PERDIDO");
  }
}

//FUNCION PARA CCREAR MENSAJES POR CADA ATAQUE
function createMessage(result) {
  //nuestra variable result en realidad no es una variable
  //que estemos creando en esta función, si no un parametro que vamos a recibir
  //que vamos a recibir de la función combat por medio de argumentos
  let sectionMessage = document.getElementById("result");
  let attackOfEnemy = document.getElementById("attack-enemy");
  let attackOFPlayer = document.getElementById("attack-player");

  let newAttackPlayer = document.createElement("p");
  let newAttackEnemy = document.createElement("p");

  sectionMessage.innerHTML = result;
  newAttackPlayer.innerHTML = attackPlayer;
  newAttackEnemy.innerHTML = attackEnemy;
  //1.Creamos un elemento de tipo parrafo
  // let paragraph = document.createElement("p");
  //2.Metemos texto
  // paragraph.innerHTML =
  //   "Tu mascota atacó con " +
  //   attackPlayer +
  //   ", las mascota del enemigo atacó con " +
  //   attackEnemy +
  //   "-" +
  //   result;
  // Metemos el texto anterior a la seccion de mensajes

  attackOfEnemy.appendChild(newAttackEnemy);
  attackOFPlayer.appendChild(newAttackPlayer);
}

function createMessageFinal(resultFinal) {
  let sectionMessage = document.getElementById("result");

  let paragraph = document.createElement("p");
  sectionMessage.innerHTML = resultFinal;

  let buttonFire = document.getElementById("button-fire");
  buttonFire.disabled = true;
  let buttonWater = document.getElementById("button-water");
  buttonWater.disabled = true;
  let buttonGround = document.getElementById("button-ground");
  buttonGround.disabled = true;

  let sectionReload = document.getElementById("restart");
  sectionReload.style.display = "block";
}

function restartGame() {
  location.reload();
}

//funcion de aleatorio
function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//otra forma de iniciar el juego
window.addEventListener("load", startGame);
