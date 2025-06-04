import { attack } from '../Utils/combatUtils/combatUtils.js';
import Unit from '../entities/Unit.js';

export default class Character {
    constructor(scene, unitConfig, x, y, texture, staticScale = 1, animScale = 1) {
        this.scene = scene;
        this.unit = new Unit(unitConfig);
        this.staticScale = staticScale;
        this.animScale = animScale;

        this.sprite = scene.add.sprite(x, y, texture)
            .setInteractive()
            .setScale(this.staticScale);

        this.isAlive = true;

        this.hpText = null;
        this.nameText = null;

    }

    updateHpBar() {
        if (!this.unit.isAlive()) {
            this.isAlive = false;
            this.sprite.destroy();
            if (this.hpText) this.hpText.destroy();
            if (this.nameText) this.nameText.destroy();
            console.log(`${this.unit.name} foi derrotado!`);
        }
    }

    attackTarget(targetCharacter) {
        return new Promise((resolve) => {
            if (!targetCharacter.isAlive) {
                resolve();
                return;
            }

            const animKey = `${this.unit.name.toLowerCase()}_attack`;
            console.log('Tentando tocar animação:', animKey);

            const animationKeys = Object.keys(this.scene.anims.anims);
            console.log('Animações disponíveis:', animationKeys);
            console.log('Animação existe?', this.scene.anims.exists(animKey));

            if (this.scene.anims.exists(animKey)) {
                // Aplica a escala da animação
                this.sprite.setScale(this.animScale);

                this.sprite.play(animKey);

                this.sprite.once('animationcomplete', () => {
                    // Volta para a escala estática
                    this.sprite.setFrame(1);

                    if (this.scene.updateHud) {
                        this.scene.updateHud();
                    }


                    const dodgeChance = targetCharacter.unit.calcularDodge ? targetCharacter.unit.calcularDodge() : 0;
                    if (Math.random() < dodgeChance) {
                        targetCharacter.showFloatingText('Esquivou!', '#ffff00');
                        resolve();
                        return;
                    }

                    const damage = targetCharacter.unit.takeDamage(this.unit.attack);
                    targetCharacter.showFloatingText(`-${damage}`, '#ff4444');
                    targetCharacter.updateHpBar();
                    targetCharacter.playHitAnimation();
                    resolve();
                });
            } else {
                console.warn(`Animação ${animKey} não encontrada! Aplicando dano direto.`);
                const dodgeChance = targetCharacter.unit.calcularDodge ? targetCharacter.unit.calcularDodge() : 0;
                if (Math.random() < dodgeChance) {
                    targetCharacter.showFloatingText('Esquivou!', '#ffff00');
                    resolve();
                    return;
                }
                const damage = targetCharacter.unit.takeDamage(this.unit.attack);
                targetCharacter.showFloatingText(`-${damage}`, '#ff4444');
                targetCharacter.updateHpBar();
                targetCharacter.playHitAnimation();
                resolve();
            }
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
}
