const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Player {
  constructor(name, health, strength, attack) {
    this.name = name;
    this.health = health;
    this.strength = strength;
    this.attack = attack;
  }

  rollDice() {
    return Math.floor(Math.random() * 6) + 1;
  }

  attackOpponent(opponent) {
    const attackRoll = this.rollDice();
    const attackDamage = this.attack * attackRoll;
    console.log(`${this.name} rolled a ${attackRoll} for attack.`);

    const defenseRoll = opponent.rollDice();
    const defenseDamage = opponent.strength * defenseRoll;
    console.log(`${opponent.name} rolled a ${defenseRoll} for defense.`);

    const damageTaken = Math.max(0, attackDamage - defenseDamage);
    opponent.health -= damageTaken;
    console.log(`${opponent.name} took ${damageTaken} damage.`);

    console.log(`${opponent.name}'s health: ${opponent.health}\n`);
  }
}

function getPlayerInput(playerNumber, callback) {
  rl.question(`Enter name for Player ${playerNumber}: `, (name) => {
    rl.question(`Enter health for Player ${playerNumber}: `, (health) => {
      rl.question(`Enter strength for Player ${playerNumber}: `, (strength) => {
        rl.question(`Enter attack for Player ${playerNumber}: `, (attack) => {
          const player = new Player(
            name,
            parseInt(health),
            parseInt(strength),
            parseInt(attack)
          );
          callback(player);
        });
      });
    });
  });
}

function playGame(player1, player2) {
  let currentPlayer = player1;
  let opponent = player2;

  while (player1.health > 0 && player2.health > 0) {
    currentPlayer.attackOpponent(opponent);
    // Swap players
    [currentPlayer, opponent] = [opponent, currentPlayer];
  }

  if (player1.health <= 0) {
    console.log(`${player1.name} has been defeated!`);
  } else {
    console.log(`${player2.name} has been defeated!`);
  }
  rl.close();
}

// Get input for Player 1
getPlayerInput(1, (player1) => {
  // Get input for Player 2
  getPlayerInput(2, (player2) => {
    playGame(player1, player2);
  });
});
