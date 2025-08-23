let playerHP = 20;
let opponentHP = 20;
let hand = [];

const decks = {
  mage: [
    {name: "Fireball", damage: 5},
    {name: "Lightning", damage: 7},
    {name: "Big Rip (Ult)", effect: "set1kill"}
  ],
  warrior: [
    {name: "Slash", damage: 4},
    {name: "Shield Bash", damage: 3},
    {name: "Rage Breaker (Ult)", damage: 10}
  ],
  knight: [
    {name: "Sword Strike", damage: 6},
    {name: "Piercing Thrust", damage: 5},
    {name: "Blade Storm (Ult)", damage: 9}
  ],
  priest: [
    {name: "Heal", heal: 5},
    {name: "Smite", damage: 4},
    {name: "Resurrection (Ult)", effect: "revive"}
  ]
};

// 기본 덱은 마법사
hand = decks.mage;

function renderHand() {
  const handDiv = document.getElementById("hand");
  handDiv.innerHTML = "";
  hand.forEach((card, i) => {
    const div = document.createElement("div");
    div.className = "card";
    div.textContent = card.name;
    div.onclick = () => playCard(i);
    handDiv.appendChild(div);
  });
}

function playCard(index) {
  const card = hand[index];
  if (card.damage) {
    opponentHP -= card.damage;
  }
  if (card.heal) {
    playerHP += card.heal;
  }
  if (card.effect === "set1kill") {
    playerHP = 1;
    opponentHP = 0;
  }
  if (card.effect === "revive") {
    if (playerHP <= 0) playerHP = 10;
  }
  updateHP();
  sendMessage({type: "state", playerHP, opponentHP});
}

function updateHP() {
  document.getElementById("player-hp").textContent = playerHP;
  document.getElementById("opponent-hp").textContent = opponentHP;
}

function handleMessage(data) {
  if (data.type === "state") {
    opponentHP = data.playerHP;
    playerHP = data.opponentHP;
    updateHP();
  }
}

renderHand();