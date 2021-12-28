function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            specialAttackCounter: 0,
            healCounter: 0,
            winner: null,
            gameRunning: true,
            logMessages: []
        }
    },

    watch: {
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0) {
                // Draw
                this.winner = 'draw';
                this.gameRunning = false;
            } else if (value <= 0) {
                // Player lost
                this.winner = 'monster';
                this.gameRunning = false;
            }
        },

        monsterHealth(value) {
            if (value <= 0 && this, this.playerHealth <= 0) {
                // Draw
                this.winner = 'draw';
                this.gameRunning = false;
            } else if (value <= 0) {
                // monster lost
                this.winner = 'player';
                this.gameRunning = false;
            }
        }
    },

    computed: {
        monsterBarStyle() {
            if (this.monsterHealth < 0) {
                return { width: '0%' };
            } else {
                return { width: this.monsterHealth + '%' };
            }
        },

        playerBarStyle() {
            if (this.playerHealth < 0) {
                return { width: '0%' };
            } else {
                return { width: this.playerHealth + '%' };
            }
        },

        specialAttackPermission() {
            if (this.specialAttackCounter >= 3) {
                return false;
            } else {
                return true;
            }
        },

        healPermission() {
            if (this.healCounter >= 4) {
                return false;
            } else {
                return true;
            }
        }
    },

    methods: {
        startGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.specialAttackCounter = 0;
            this.healCounter = 0;
            this.winner = null;
            this.gameRunning = true;
            this.logMessages = [];
        },

        attackMoster() {
            const attackValue = getRandomValue(5, 12);
            this.monsterHealth = this.monsterHealth - attackValue;
            this.specialAttackCounter += 1;
            this.healCounter += 1;
            this.addLogMessages('player', 'attack', attackValue);
            this.attackPlayer();
        },

        attackPlayer() {
            const attackValue = getRandomValue(8, 15);
            this.playerHealth = this.playerHealth - attackValue;
            this.addLogMessages('monster', 'attack', attackValue);
        },

        specialAttackMonster() {
            const attackValue = getRandomValue(15, 35);
            this.monsterHealth = this.monsterHealth - attackValue;
            this.specialAttackCounter = 0;
            this.addLogMessages('player', 'special-attack', attackValue);
            this.attackPlayer();
        },

        healPlayer() {
            this.healCounter = 0;

            const healValue = getRandomValue(8, 20);

            if (this.playerHealth + healValue > 100) {
                this.playerHealth = 100;
            } else {
                this.playerHealth += healValue;
            }
            this.addLogMessages('player', 'heal', healValue);
            this.attackPlayer();
        },

        surrender() {
            this.winner = 'monster';
            this.gameRunning = false;
        },

        addLogMessages(who, what, value) {
            this.logMessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            });
        }
    }
});

app.mount('#game');