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

            const keyBase = this.unit.spriteKey || (this.unit.name || '').toLowerCase();
            const animKey = `${keyBase}_attack`;

            console.log('Tentando tocar animação:', animKey);

            const applyDamage = () => {
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
            };

            if (this.scene.anims.exists(animKey)) {
                this.sprite.once('animationstart', () => {
                    const unitName = (this.unit.name || '').toLowerCase();
                    if (unitName === 'goblin' && this.scene.sfx['goblin_attack_sfx']) {
                        this.scene.sfx['goblin_attack_sfx'].play();
                    } else if (unitName === 'skeleton' && this.scene.sfx['skeleton_attack_sfx']) {
                        this.scene.sfx['skeleton_attack_sfx'].play();
                    } else if (this.scene.sfx && this.scene.sfx[sfxKey]) {
                        this.scene.sfx[sfxKey].play();
                    }
                });

                this.sprite.setScale(this.animScale);
                this.sprite.play(animKey);

                this.sprite.once('animationcomplete', () => {
                    this.sprite.setFrame(0);
                    this.sprite.setScale(this.staticScale);

                    if (this.scene.updateHUD) {
                        this.scene.updateHUD();
                    }

                    applyDamage();
                });
            } else {
                console.warn(`Animação ${animKey} não encontrada! Aplicando dano direto.`);
                applyDamage();
            }
        });
    }



    useAbility(ability, targetCharacter) {
        const sfxKey = ability.sfxKey || `${this.unit.name.toLowerCase()}_attack_sfx`;
        return new Promise((resolve) => {
            if (!targetCharacter.isAlive) {
                resolve();
                return;
            }

            if (this.unit.mana < ability.manaCost) {
                this.showFloatingText('Mana insuficiente!', '#0000ff');
                resolve();
                return;
            }

            this.unit.mana -= ability.manaCost;

            const keyBase = this.unit.spriteKey || this.unit.name.toLowerCase();
            const animKey = ability.animationKey || `${keyBase}_attack`;

            const applyEffect = () => {
                if (ability.type === 'debuff') {
                    this.applyDebuff(targetCharacter, ability);
                } else if (ability.type === 'heal') {
                    const healed = Math.min(ability.power, targetCharacter.unit.maxHp - targetCharacter.unit.hp);
                    targetCharacter.unit.hp += healed;

                    targetCharacter.showFloatingText(`+${healed}`, '#00ff88');
                    targetCharacter.updateHpBar();
                } else {
                    let damage = ability.power - targetCharacter.unit.defense;
                    if (damage < 0) damage = 0;

                    targetCharacter.unit.hp -= damage;
                    if (targetCharacter.unit.hp < 0) targetCharacter.unit.hp = 0;

                    targetCharacter.showFloatingText(`-${damage}`, '#ff4444');
                    targetCharacter.updateHpBar();
                    targetCharacter.playHitAnimation();
                }

                if (this.scene.updateHUD) this.scene.updateHUD();
                resolve();
            };


            if (this.scene.anims.exists(animKey)) {
                this.sprite.setScale(this.animScale);
                this.sprite.play(animKey);
                if (this.scene.sfx && this.scene.sfx[sfxKey]) {
                    this.scene.sfx[sfxKey].play();
                }

                this.sprite.once('animationcomplete', () => {
                    this.sprite.setFrame(0);
                    this.sprite.setScale(this.staticScale);
                    applyEffect();
                });
            } else {
                applyEffect();
            }
        });
    }

    applyDebuff(targetCharacter, ability) {
        const attr = ability.attribute;
        const power = ability.power;
        const duration = ability.duration;

        if (!targetCharacter.unit) return;
        if (!targetCharacter.debuffs) targetCharacter.debuffs = [];

        // Armazena valor original uma única vez
        if (targetCharacter.unit[`original_${attr}`] === undefined) {
            targetCharacter.unit[`original_${attr}`] = targetCharacter.unit[attr];
        }

        // Aplica o debuff
        targetCharacter.unit[attr] = Math.max(0, targetCharacter.unit[attr] - power);

        // Adiciona à lista de debuffs
        targetCharacter.debuffs.push({
            attribute: attr,
            power: power,
            remainingTurns: duration
        });

        targetCharacter.showFloatingText(`${attr} -${power}`, '#ff8800');
        targetCharacter.updateHpBar();
    }

    updateDebuffs() {
        if (!this.unit.debuffs) return;

        const attrMap = {};

        for (let i = this.unit.debuffs.length - 1; i >= 0; i--) {
            const debuff = this.unit.debuffs[i];
            debuff.remainingTurns--;

            if (debuff.remainingTurns <= 0) {
                this.unit.debuffs.splice(i, 1);
            } else {
                if (!attrMap[debuff.attribute]) attrMap[debuff.attribute] = 0;
                attrMap[debuff.attribute] += debuff.power;
            }
        }

        const originalAttrs = Object.keys(this.unit).filter(k => k.startsWith('original_'));
        originalAttrs.forEach(key => {
            const attr = key.replace('original_', '');
            const stillDebuffed = this.unit.debuffs.some(d => d.attribute === attr);

            if (!stillDebuffed) {
                this.unit[attr] = this.unit[key];
                delete this.unit[key];
                this.showFloatingText(`${attr} restaurado`, '#00ffff');
            } else {
                this.unit[attr] = Math.max(0, this.unit[`original_${attr}`] - attrMap[attr]);
            }
        });

        this.updateHpBar();
    }


    showFloatingText(text, color = '#ffffff') {
        const floatText = this.scene.add.text(this.sprite.x, this.sprite.y - 30, text, {
            fontSize: '20px',
            fill: color,
            stroke: '#000',
            strokeThickness: 2,
            fontStyle: 'bold'
        }).setOrigin(0.5);

        this.scene.tweens.add({
            targets: floatText,
            y: floatText.y - 40,
            alpha: 0,
            duration: 1500,
            ease: 'Cubic.easeOut',
            onComplete: () => floatText.destroy()
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
}