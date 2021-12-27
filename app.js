function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100
        }
    },

    methods: {
        attackMoster() {
            const attackValue = getRandomValue(5, 12);
            this.monsterHealth = this.monsterHealth - attackValue;
            console.log(`monster health == ${this.monsterHealth}`);
            this.attackPlayer();
        },

        attackPlayer() {
            const attackValue = getRandomValue(8, 15);
            this.playerHealth = this.playerHealth - attackValue;
            console.log(`player health == ${this.playerHealth}`);
        }
    }
});

app.mount('#game');