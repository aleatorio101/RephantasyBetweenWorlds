const minDelay = 8000;   // 8 segundos ou 8000ms
const maxDelay = 24000;  // 24 segundos ou 24000ms
const randomDelay = Phaser.Math.Between(minDelay, maxDelay);

this.time.delayedCall(randomDelay, () => {
    this.scene.start('battle_bg');
});


    startCombatTrigger() {
        const minDelay = 8000;
        const maxDelay = 24000;
        const randomDelay = Phaser.Math.Between(minDelay, maxDelay);

        // Aqui chama a batalha depois do tempo aleatório
        this.combatTimer = this.time.delayedCall(randomDelay, () => {
            this.triggerBattle();
        });

        // Aqui forca a batalha acontecer se o tempo atingir 24s
        this.combatTimeout = this.time.delayedCall(maxDelay, () => {
            if (this.combatTimer && !this.combatTimer.hasDispatched) {
                this.combatTimer.remove(false);
                this.triggerBattle();
            }
        });
    }

    triggerBattle() {
        // Aqui cancela os timers sempre que o battle_bg é iniciado
        this.cancelCombatTrigger();
        this.scene.start('battle_bg');
    }

    cancelCombatTrigger() {
        if (this.combatTimer) {
            this.combatTimer.remove(false);
            this.combatTimer = null;
        }
        if (this.combatTimeout) {
            this.combatTimeout.remove(false);
            this.combatTimeout = null;
        }
    }
