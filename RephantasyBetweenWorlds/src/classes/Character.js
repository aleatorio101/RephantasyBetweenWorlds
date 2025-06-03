import { attack } from '../Utils/combatUtils/combatUtils.js';
import Unit from '../entities/Unit.js';

export default class Character {
    constructor(scene, unitConfig, x, y, texture) {
        this.scene = scene;
        this.unit = new Unit(unitConfig);

        this.sprite = scene.add.sprite(x, y, texture)
            .setInteractive();

        this.isAlive = true;

        this.hpText = scene.add.text(x, y - 50, `HP: ${this.unit.hp}/${this.unit.maxHp}`, { fontSize: '14px', fill: '#fff' });

        // Aqui adicionamos o nome do personagem
        this.nameText = scene.add.text(x, y - 70, this.unit.name, {
            fontSize: '16px',
            fill: '#ffff00', // amarelo
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0.5);
    }

    updateHpBar() {
        this.hpText.setText(`HP: ${this.unit.hp}/${this.unit.maxHp}`);
        if (!this.unit.isAlive()) {
            this.isAlive = false;
            this.sprite.destroy();
            this.hpText.destroy();
            this.nameText.destroy();
            console.log(`${this.unit.name} foi derrotado!`);
        }
    }

    attackTarget(targetCharacter) {
        return new Promise((resolve) => {
            if (!targetCharacter.isAlive) {
                console.log('Alvo já está morto.');
                resolve();
                return;
            }

            // Aplica dano
            const damage = this.unit.attack; // ou chame alguma função mais precisa
            const result = attack(this.unit, targetCharacter.unit, damage);

            // Mostra texto de dano ou "Desviou!"
            const isMiss = result === 0; // ajuste se você tiver lógica de evasão
            const text = isMiss ? 'Desviou!' : `-${result}`;
            const dmgText = this.scene.add.text(
                targetCharacter.sprite.x,
                targetCharacter.sprite.y - 80,
                text,
                { fontSize: '20px', fill: isMiss ? '#0ff' : '#f00', stroke: '#000', strokeThickness: 2 }
            ).setOrigin(0.5);

            // Destrói texto após um tempo
            this.scene.tweens.add({
                targets: dmgText,
                y: dmgText.y - 30,
                alpha: 0,
                duration: 1000,
                ease: 'Power2',
                onComplete: () => {
                    dmgText.destroy();
                    targetCharacter.updateHpBar();
                    resolve(); // só avança turno depois disso
                }
            });
        });
    }



    showDamage(damage) {
        const dmgText = this.scene.add.text(this.sprite.x, this.sprite.y - 30, `-${damage}`, {
            fontSize: '20px',
            fill: '#ff4444',
            stroke: '#000',
            strokeThickness: 2,
            fontStyle: 'bold'
        });

        this.scene.tweens.add({
            targets: dmgText,
            y: dmgText.y - 50,
            alpha: 0,
            duration: 1500,
            ease: 'Cubic.easeOut',
            onComplete: () => dmgText.destroy()
        });
    }

    playHitAnimation() {
        this.scene.tweens.add({
            targets: this.sprite,
            x: this.sprite.x + 10,
            yoyo: true,
            duration: 100,
            repeat: 1
        });
    }

    showFloatingText(text, color = '#ffffff') {
        const floatText = this.scene.add.text(this.sprite.x, this.sprite.y - 30, text, {
            fontSize: '20px',
            fill: color,
            stroke: '#000',
            strokeThickness: 2,
            fontStyle: 'bold'
        });

        this.scene.tweens.add({
            targets: floatText,
            y: floatText.y - 40,
            alpha: 0,
            duration: 1500,
            ease: 'Cubic.easeOut',
            onComplete: () => floatText.destroy()
        });
    }

    attackTarget(targetCharacter) {
        if (!targetCharacter.isAlive) {
            console.log('Alvo já está morto.');
            return;
        }

        const dodgeChance = targetCharacter.unit.calcularDodge();
        if (Math.random() < dodgeChance) {
            //  this.scene.sound?.play('miss'); // se quiser som opcional
            targetCharacter.showFloatingText('Esquivou!', '#ffff00');
            return;
        }

        const damage = targetCharacter.unit.takeDamage(this.unit.attack);
        targetCharacter.showFloatingText(`-${damage}`, '#ff4444');
        targetCharacter.updateHpBar();
    }


}
