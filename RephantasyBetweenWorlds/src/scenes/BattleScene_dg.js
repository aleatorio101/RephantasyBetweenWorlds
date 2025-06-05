import Character from '../classes/Character.js';
import { party } from '../entities/Party.js';
import createAnimations from '../entities/animations.js';

export default class BattleScene_dg extends Phaser.Scene {
    constructor() {
        super('BattleScene');
    }

    preload() {
        //bgm
        this.load.audio('battle_1_bgm', 'assets/sounds/bgm/Battle 1.mp3')

        //sfx
        this.load.audio('siegel_attack_sfx', 'assets/sounds/sfx/Sword Impact Hit 1.wav');
        this.load.audio('siegel_skill_sfx', 'assets/sounds/sfx/Sword Impact Hit 3.wav');
        this.load.audio('aiko_attack_sfx', 'assets/sounds/sfx/Firebuff 1.wav');
        this.load.audio('aiko_skill_sfx', 'assets/sounds/sfx/Fireball 3.wav');
        this.load.audio('matthew_attack_sfx', 'assets/sounds/sfx/Guitar riff sound effect.mp3');
        this.load.audio('archibald_attack_sfx', 'assets/sounds/sfx/Sword Attack 2.wav');
        this.load.audio('archibald_skill_sfx', 'assets/sounds/sfx/Sword Parry 2.wav');

        this.load.audio('goblin_attack_sfx', 'assets/sounds/sfx/08_Bite_04.wav');
        this.load.audio('skeleton_attack_sfx', 'assets/sounds/sfx/22_Slash_04.wav');



        //Texturas UI
        this.load.image('selector', 'assets/ui/selector.png');
        this.load.image('battle_bg', 'assets/backgrounds/battle_bg.png');

        //Texturas base inimigos
        this.load.image('goblin', 'assets/enemies/goblin/Idle.gif');
        this.load.image('skeleton', 'assets/enemies/skeleton/skeleton_atk_spritesheet.gif');


        // Texturas base dos personagens (idle ou estática)
        this.load.image('siegel', 'assets/Party/Siegel/Siegel_atk.gif');
        this.load.image('aiko', 'assets/Party/Aiko/Aiko_atk1.gif');
        this.load.image('matthew', 'assets/Party/Matthew/Matthew_atk.gif');
        this.load.image('archibald', 'assets/Party/Archibald/Archibald_atk1.gif');

        // Spritesheets de ataque (para animação)
        this.load.spritesheet('siegel_attack', 'assets/Party/Siegel/siegel_atk_spritesheet.png', {
            frameWidth: 288,
            frameHeight: 258
        });
        this.load.spritesheet('aiko_attack', 'assets/Party/Aiko/aiko_atk_spritesheet.png', {
            frameWidth: 518,
            frameHeight: 518
        });
        this.load.spritesheet('matthew_attack', 'assets/Party/Matthew/matthew_atk_spritesheet.png', {
            frameWidth: 352,
            frameHeight: 352
        });
        this.load.spritesheet('archibald_attack', 'assets/Party/Archibald/archibald_atk_spritesheet.png', {
            frameWidth: 384,
            frameHeight: 390
        });
        this.load.spritesheet('goblin_attack', 'assets/enemies/goblin/goblin_atk_spritesheet.png', {
            frameWidth: 600,
            frameHeight: 600
        });
        this.load.spritesheet('skeleton_attack', 'assets/enemies/skeleton/skeleton_atk_spritesheet.png', {
            frameWidth: 547,
            frameHeight: 240
        });

    }

    create() {
        this.cameras.main.setBounds(0, 0, this.sys.game.config.width, this.sys.game.config.height);
        this.cameras.main.centerOn(this.sys.game.config.width / 2, this.sys.game.config.height / 2);

        createAnimations(this);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); // Adiciona tecla ESPAÇO
        this.shiftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT); // Adiciona tecla SHIFT

        this.sfx = {
            siegel_attack_sfx: this.sound.add('siegel_attack_sfx'),
            siegel_skill_sfx: this.sound.add('siegel_skill_sfx'),
            aiko_attack_sfx: this.sound.add('aiko_attack_sfx'),
            aiko_skill_sfx: this.sound.add('aiko_skill_sfx'),
            matthew_attack_sfx: this.sound.add('matthew_attack_sfx'),
            archibald_attack_sfx: this.sound.add('archibald_attack_sfx'),
            archibald_skill_sfx: this.sound.add('archibald_skill_sfx'),

            goblin_skill_sfx: this.sound.add('goblin_attack_sfx'),
            skeleton_skill_sfx: this.sound.add('skeleton_attack_sfx')
        };

        this.bgm = this.sound.add('battle_1_bgm', {
            loop: true,
            volume: 0.25
        });

        this.bgm.play();


        const bg = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'battle_bg')
            .setOrigin(0.5)
            .setDepth(-1)
            .setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);


        bg.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

        const width = this.sys.game.config.width;
        const height = this.sys.game.config.height;


        this.selector = this.add.image(0, 0, 'selector')
            .setScale(0.06)
            .setVisible(false);
            this.selector.setDepth(1000);

        this.playerCharacters = [
            new Character(this, party[0], 340, 320, party[0].name.toLowerCase()),
            new Character(this, party[1], 180, 350, party[1].name.toLowerCase()),
            new Character(this, party[3], 335, 490, party[3].name.toLowerCase()),
            new Character(this, party[2], 180, 570, party[2].name.toLowerCase())
        ];

        // === HUD superior (lista de personagens vivos) ===
        this.topHudTexts = [];

        const spacingX = 180;
        const startX = 50;
        const startY = 10;

        this.playerCharacters.forEach((char, index) => {
            const nameText = this.add.text(startX + index * spacingX, startY, `${char.unit.name}`, {
                fontSize: '18px',
                fill: '#ffff00',
                stroke: '#000',
                strokeThickness: 3
            });

            const hpText = this.add.text(startX + index * spacingX, startY + 20, `HP: ${char.unit.hp}/${char.unit.maxHp}`, {
                fontSize: '16px',
                fill: '#ffffff'
            });

            this.topHudTexts.push({ character: char, nameText, hpText });
        });


        // === HUD inferior esquerdo (personagem atual) ===
        this.turnInfoText = this.add.text(20, this.sys.game.config.height - 60, '', {
            fontSize: '20px',
            fill: '#ffffff',
            stroke: '#000',
            strokeThickness: 3
        });


        const enemyTypes = [
            {
                name: 'skeleton',
                hp: 100,
                maxHp: 100,
                mana: 0,
                maxMana: 0,
                attack: 20,
                defense: 3,
                speed: 1,
                sfxKey: 'skeleton_attack_sfx',
                isPlayer: false,
                abilities: []
            },
            {
                name: 'goblin',
                hp: 70,
                maxHp: 70,
                mana: 0,
                maxMana: 0,
                attack: 15,
                defense: 2,
                speed: 2,
                sfxKey: 'goblin_attack_sfx',
                isPlayer: false,
                abilities: []
            }
        ];
        this.enemyCharacters = [];

        const fixedPositions = [
            { x: width * 0.75 - 150, y: height / 2.5 },
            { x: width * 0.75 + 30, y: (height / 5) * 2 },
            { x: width * 0.75 - 30, y: (height / 5) * 3 },
            { x: width * 0.75 + 150, y: (height / 5) * 3.25 }
        ];

        const numEnemies = Phaser.Math.Between(1, 4);

        // Embaralha as posições pra pegar aleatoriamente sem repetir
        const shuffledPositions = Phaser.Utils.Array.Shuffle(fixedPositions);

        for (let i = 0; i < numEnemies; i++) {
            const pos = shuffledPositions[i];

            // Sorteia um tipo de inimigo aleatoriamente
            const config = Phaser.Utils.Array.GetRandom(enemyTypes);

            this.enemyCharacters.push(new Character(this, config, pos.x, pos.y, config.name));
        }


        this.turnQueue = [...this.playerCharacters, ...this.enemyCharacters];
        this.turnQueue.sort((a, b) => b.unit.speed - a.unit.speed);

        this.createMenu();

        this.startTurn();
    }

    createMenu() {
        const { width, height } = this.sys.game.config;
        this.createHUD();

        this.menuBg = this.add.graphics();
        this.menuBg.fillStyle(0x616a72, 0.6); // Cor preta com transparência
        this.menuBg.fillRoundedRect(0, 0, 500, 150, 10); // largura, altura e raio

        this.menuBg.setScrollFactor(0); // Fixa na tela
        this.menuBg.setDepth(20);

        this.menuContainer = this.add.container(width / 2 - 250, height - 160);
        this.menuContainer.add(this.menuBg); // Adiciona o fundo no container
        this.menuOptions = [];

        ['Atacar', 'Usar Habilidade', 'Passar Turno'].forEach((option, index) => {
            const txt = this.add.text(250, 30 + index * 40, option, {
                fontFamily: 'Arial',
                fontSize: '20px',
                color: '#ffffff',
                align: 'center',
                padding: { x: 10, y: 5 }
            })
                .setOrigin(0.5)
                .setInteractive()
                .on('pointerdown', () => this.onMenuSelect(option));

            this.menuContainer.add(txt);
            this.menuOptions.push(txt);
        });

        this.menuContainer.setVisible(false);
        this.isChoosingTarget = false;
        this.currentAbility = null;
    }



    highlightAbility(index) {
        this.abilityOptions.forEach((txt, i) => {
            txt.setStyle({ backgroundColor: i === index ? '#5555ff' : null });
        });
    }



    startTurn() {
        // Filtra personagens vivos
        this.playerCharacters = this.playerCharacters.filter(p => p.unit.isAlive());
        this.enemyCharacters = this.enemyCharacters.filter(e => e.unit.isAlive());
        this.turnQueue = this.turnQueue.filter(c => c.unit.isAlive());

        // Verifica fim de batalha
        const playersAlive = this.playerCharacters.length > 0;
        const enemiesAlive = this.enemyCharacters.length > 0;

        if (!playersAlive) {
            console.log('Todos os jogadores morreram! Você perdeu!');
            this.endBattle(false);
            return;
        }
        if (!enemiesAlive) {
            console.log('Todos os inimigos foram derrotados! Você venceu!');
            this.endBattle(true);
            return;
        }

        if (this.turnQueue.length === 0) {
            console.log('Fila vazia - batalha finalizada');
            return;
        }

        this.currentCharacter = this.turnQueue[0];
        this.updateHUD();

        if (!this.currentCharacter.isAlive) {
            this.nextTurn();
            return;
        }

        console.log(`Turno de ${this.currentCharacter.unit.name}`);

        if (this.currentCharacter.unit.isPlayer) {
            this.showMenu();
        } else {
            this.enemyTurn();
        }
    }


    async enemyTurn() {
        const alivePlayers = this.playerCharacters.filter(p => p.isAlive);
        if (alivePlayers.length > 0) {
            const target = Phaser.Utils.Array.GetRandom(alivePlayers);
            await this.currentCharacter.attackTarget(target);
        }

        this.nextTurn();
    }


    showMenu() {
        this.menuContainer.setVisible(true);
        this.selectedOption = 0;
        this.highlightOption(this.selectedOption);

        this.input.keyboard.off('keydown-UP');
        this.input.keyboard.off('keydown-DOWN');
        this.input.keyboard.on('keydown-UP', () => {
            if (!this.menuContainer.visible) return;
            this.selectedOption = (this.selectedOption + this.menuOptions.length - 1) % this.menuOptions.length;
            this.highlightOption(this.selectedOption);
        });

        this.input.keyboard.on('keydown-DOWN', () => {
            if (!this.menuContainer.visible) return;
            this.selectedOption = (this.selectedOption + 1) % this.menuOptions.length;
            this.highlightOption(this.selectedOption);
        });

        this.enterKey.removeAllListeners();
        this.enterKey.once('down', () => {
            const option = this.menuOptions[this.selectedOption].text;
            this.onMenuSelect(option);
        });
    }


    highlightOption(index) {
        this.menuOptions.forEach((opt, i) => {
            opt.setStyle({ backgroundColor: i === index ? '#5555ff' : '#000' });
        });
    }

    onMenuSelect(option) {
        if (!this.currentCharacter || !this.currentCharacter.unit.isAlive()) return;

        if (option === 'Atacar') {
            this.menuContainer.setVisible(false);
            this.isChoosingTarget = true;
            this.awaitTargetSelection('attack');
        } else if (option === 'Usar Habilidade') {
            this.menuContainer.setVisible(false);
            this.createAbilitiesMenu();
        } else if (option === 'Passar Turno') {
            this.menuContainer.setVisible(false);
            this.nextTurn();
        }
    }

    selectAbility(index) {
        if (index < 0 || index >= this.abilityOptions.length) return;

        const selectedAbility = this.currentCharacter.unit.abilities[index];

        if (this.currentCharacter.unit.mana < selectedAbility.manaCost) {
            const warningText = this.add.text(
                this.sys.game.config.width / 2,
                this.sys.game.config.height / 2,
                'Mana Insuficiente!',
                { fontSize: '24px', color: '#ff0000', stroke: '#000', strokeThickness: 3 }
            ).setOrigin(0.5);

            this.time.delayedCall(2000, () => warningText.destroy());
            return;
        }

        this.currentAbility = selectedAbility;
        this.abilitiesContainer.setVisible(false);
        this.abilitiesContainer.destroy(true);

        if (selectedAbility.target === 'all_allies') {
            const aliveAllies = this.playerCharacters.filter(p => p.isAlive);
            this.currentCharacter.useHealingAbility(selectedAbility, aliveAllies).then(() => {
                this.isChoosingTarget = false;
                this.clearTargetSelection();
                this.nextTurn();
            });
        } else {
            this.isChoosingTarget = true;

            const targetType = (selectedAbility.target === 'single_ally') ? 'player' : 'enemy';

            this.awaitTargetSelection('ability', selectedAbility.target === 'single_ally' ? 'ally' : 'enemy');

        }
    }

    awaitTargetSelection(action, targetType = 'enemy') {
        this.targetAction = action;
        this.targetType = targetType;
        this.isChoosingTarget = true;

        let targets = [];
        if (this.targetType === 'enemy') {
            targets = this.enemyCharacters;
        } else if (this.targetType === 'ally') {
            targets = this.playerCharacters;
        } else {
            console.warn(`TargetType inválido: ${this.targetType}`);
            this.isChoosingTarget = false;
            this.showMenu();
            return;
        }

        this.selectedTargetIndex = 0;
        while (!targets[this.selectedTargetIndex]?.isAlive && this.selectedTargetIndex < targets.length) {
            this.selectedTargetIndex++;
        }

        this.updateTargetSelector();

        this.input.keyboard.off('keydown-RIGHT');
        this.input.keyboard.off('keydown-LEFT');
        this.input.keyboard.off('keydown-SHIFT');
        this.enterKey.removeAllListeners();
        this.shiftKey.removeAllListeners();

        this.input.keyboard.on('keydown-RIGHT', () => {
            if (!this.isChoosingTarget) return;
            let attempts = 0;
            do {
                this.selectedTargetIndex = (this.selectedTargetIndex + 1) % targets.length;
                attempts++;
            } while (!targets[this.selectedTargetIndex].isAlive && attempts < targets.length);
            this.updateTargetSelector();
        });

        this.input.keyboard.on('keydown-LEFT', () => {
            if (!this.isChoosingTarget) return;
            let attempts = 0;
            do {
                this.selectedTargetIndex = (this.selectedTargetIndex - 1 + targets.length) % targets.length;
                attempts++;
            } while (!targets[this.selectedTargetIndex].isAlive && attempts < targets.length);
            this.updateTargetSelector();
        });

        this.enterKey.once('down', () => {
            const target = targets[this.selectedTargetIndex];
            if (target?.isAlive) {
                this.onTargetSelected(target);
            }
        });

        this.shiftKey.once('down', () => {
            this.isChoosingTarget = false;
            this.clearTargetSelection();
            this.showMenu();
        });
    }


    async onTargetSelected(targetCharacter) {
        if (this.targetAction === 'attack') {
            await this.currentCharacter.attackTarget(targetCharacter);
        } else if (this.targetAction === 'ability' && this.currentAbility) {
            if (this.currentAbility.target === 'single_ally') {
                // Garante que o alvo é aliado (playerCharacters)
                if (this.playerCharacters.includes(targetCharacter)) {
                    await this.currentCharacter.useHealingAbility(this.currentAbility, targetCharacter);
                } else {
                    // Tentou curar inimigo, cancela e volta para menu
                    console.warn('Tentativa de curar inimigo bloqueada');
                    this.showMenu();
                    return;
                }
            } else if (this.currentAbility.target === 'all_allies') {
                const aliveAllies = this.playerCharacters.filter(p => p.isAlive);
                await this.currentCharacter.useHealingAbility(this.currentAbility, aliveAllies);
            } else {
                await this.currentCharacter.useAbility(this.currentAbility, targetCharacter);
            }
        }

        this.isChoosingTarget = false;
        this.clearTargetSelection();
        this.nextTurn();
    }


    clearTargetSelection() {
        this.selector.setVisible(false);
        const targets = this.targetType === 'enemy' ? this.enemyCharacters : this.playerCharacters;
        targets.forEach(target => {
            if (target.sprite && target.sprite.active && target.sprite.removeAllListeners && target.sprite.disableInteractive) {
                target.sprite.removeAllListeners();
                target.sprite.disableInteractive();
            }
        });
    }

    updateTargetSelector() {
        let targets = [];
        if (this.targetType === 'enemy') {
            targets = this.enemyCharacters;
        } else if (this.targetType === 'ally') {
            targets = this.playerCharacters;
        } else {
            console.warn(`TargetType inválido: ${this.targetType}`);
            this.selector.setVisible(false);
            return;
        }

        let target = targets[this.selectedTargetIndex];

        let attempts = 0;
        while (target && !target.isAlive && attempts < targets.length) {
            this.selectedTargetIndex = (this.selectedTargetIndex + 1) % targets.length;
            target = targets[this.selectedTargetIndex];
            attempts++;
        }

        if (target?.isAlive) {
            this.selector.setPosition(target.sprite.x, target.sprite.y - 50);
            this.selector.setVisible(true);
        } else {
            this.selector.setVisible(false);
            this.endBattle(this.targetType === 'enemy');
        }
    }



    nextTurn() {
        const currentCharacter = this.turnQueue[0];

        // Atualiza os debuffs do personagem atual, se ele tiver esse método
        if (currentCharacter.updateDebuffs) {
            currentCharacter.updateDebuffs();
        }

        this.turnQueue.push(this.turnQueue.shift());

        this.time.delayedCall(1000, () => {
            this.startTurn();
        });

        this.updateHUD();
    }

endBattle(playerWon) {
    this.menuContainer.setVisible(false);
    if (playerWon) {
        this.add.text(500, 300, 'Vitória!', { fontSize: '48px', fill: '#0f0' });
        this.ganharXP();
        this.time.delayedCall(1500, () => {
            this.scene.start(this.previousScene); // Volta para a cena anterior
        });
    } else {
        this.add.text(250, 300, 'Derrota...', { fontSize: '48px', fill: '#f00' });
        this.time.delayedCall(1500, () => {
            this.scene.start(this.previousScene); // Volta para a cena anterior
        });
    }
}

    updateHUD() {
        if (!this.currentCharacter || !this.currentCharacter.unit) return;

        this.hudNameText.setText(`Nome: ${this.currentCharacter.unit.name}`);
        this.hudHpText.setText(`HP: ${this.currentCharacter.unit.hp}/${this.currentCharacter.unit.maxHp}`);

        // Só mostra mana se o personagem tiver mana (aliado)
        if (this.currentCharacter.unit.maxMana && this.currentCharacter.unit.maxMana > 0) {
            this.hudManaText.setText(`Mana: ${this.currentCharacter.unit.mana}/${this.currentCharacter.unit.maxMana}`);
            this.hudManaText.setVisible(true);
        } else {
            this.hudManaText.setVisible(false);
        }

        this.hudContainer.setVisible(true);
        this.updateTopHud();
    }


    createHUD() {
        const { width, height } = this.sys.game.config;

        this.hudContainer = this.add.container(width - 260, height - 100);

        const hudBg = this.add.graphics();
        hudBg.fillStyle(0x000000, 0.6);
        hudBg.fillRoundedRect(0, 0, 250, 110, 10); // aumentei altura para caber mana

        this.hudNameText = this.add.text(20, 10, '', {
            fontSize: '18px',
            fill: '#ffffff',
            fontStyle: 'bold'
        });

        this.hudHpText = this.add.text(20, 40, '', {
            fontSize: '16px',
            fill: '#ff4444'
        });

        this.hudManaText = this.add.text(20, 70, '', {  // novo texto para mana
            fontSize: '16px',
            fill: '#4444ff'
        });

        this.hudContainer.add([hudBg, this.hudNameText, this.hudHpText, this.hudManaText]);

        this.hudContainer.setVisible(false);
    }

    updateTopHud() {
        this.topHudTexts.forEach(hud => {
            const { character, hpText } = hud;
            hpText.setText(`HP: ${character.unit.hp}/${character.unit.maxHp}`);
        });
    }

    createAbilitiesMenu() {
        const { width, height } = this.sys.game.config;

        if (this.abilitiesContainer) {
            this.abilitiesContainer.destroy(true);
        }

        this.abilitiesContainer = this.add.container(width / 2 - 150, height - 160);
        this.abilitiesContainer.setDepth(30);

        const bg = this.add.graphics();
        bg.fillStyle(0x333366, 0.8);
        bg.fillRoundedRect(0, 0, 300, 150, 10);
        this.abilitiesContainer.add(bg);

        this.abilityOptions = [];
        const abilities = this.currentCharacter.unit.abilities || [];

        if (abilities.length === 0) {
            const noAbilityText = this.add.text(150, 75, 'Sem habilidades', {
                fontSize: '20px',
                color: '#ffffff'
            }).setOrigin(0.5);
            this.abilitiesContainer.add(noAbilityText);
            this.selectedAbilityIndex = -1;
            this.abilitiesContainer.setVisible(true);

            // Adicionar tecla SHIFT para voltar ao menu principal
            this.input.keyboard.off('keydown-SHIFT');
            this.input.keyboard.once('keydown-SHIFT', () => {
                this.abilitiesContainer.setVisible(false);
                this.abilitiesContainer.destroy(true);
                this.showMenu();
            });

            return;
        }

        abilities.forEach((ability, index) => {
            const txt = this.add.text(150, 30 + index * 40, `${ability.name} (Mana: ${ability.manaCost})`, {
                fontSize: '18px',
                color: '#ffffff',
                align: 'center'
            }).setOrigin(0.5).setInteractive();

            txt.on('pointerdown', () => {
                this.selectAbility(index);
            });

            this.abilitiesContainer.add(txt);
            this.abilityOptions.push(txt);
        });

        this.selectedAbilityIndex = 0;
        this.highlightAbility(this.selectedAbilityIndex);
        this.abilitiesContainer.setVisible(true);

        this.input.keyboard.off('keydown-UP');
        this.input.keyboard.off('keydown-DOWN');
        this.input.keyboard.off('keydown-ESC');

        this.input.keyboard.on('keydown-UP', () => {
            if (!this.abilitiesContainer.visible) return;
            this.selectedAbilityIndex = (this.selectedAbilityIndex + this.abilityOptions.length - 1) % this.abilityOptions.length;
            this.highlightAbility(this.selectedAbilityIndex);
        });

        this.input.keyboard.on('keydown-DOWN', () => {
            if (!this.abilitiesContainer.visible) return;
            this.selectedAbilityIndex = (this.selectedAbilityIndex + 1) % this.abilityOptions.length;
            this.highlightAbility(this.selectedAbilityIndex);
        });

        this.enterKey.removeAllListeners();
        this.enterKey.once('down', () => {
            this.selectAbility(this.selectedAbilityIndex);
        });

        // Adicionar tecla ESC para voltar ao menu principal
        this.input.keyboard.once('keydown-SHIFT', () => {
            this.abilitiesContainer.setVisible(false);
            this.abilitiesContainer.destroy(true);
            this.currentAbility = null;
            this.showMenu();
        });
    }

    highlightAbility(index) {
        this.abilityOptions.forEach((opt, i) => {
            opt.setStyle({ backgroundColor: i === index ? '#5555ff' : '#000000' });
        });
    }

}