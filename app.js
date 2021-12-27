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
        }
    },

    computed: {
        monsterBarStyle() {
            return { width: this.monsterHealth + '%' };
        },

        playerBarStyle() {
            return { width: this.playerHealth + '%' };
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
        attackMoster() {
            const attackValue = getRandomValue(5, 12);
            this.monsterHealth = this.monsterHealth - attackValue;
            this.specialAttackCounter += 1;
            this.healCounter += 1;
            this.attackPlayer();
        },

        attackPlayer() {
            const attackValue = getRandomValue(8, 15);
            this.playerHealth = this.playerHealth - attackValue;
        },

        specialAttackMonster() {
            const attackValue = getRandomValue(15, 35);
            this.monsterHealth = this.monsterHealth - attackValue;
            this.specialAttackCounter = 0;
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

            this.attackPlayer();
        },
    }
});

app.mount('#game');