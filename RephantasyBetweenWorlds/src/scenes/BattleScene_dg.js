import Character from '../classes/Character.js';
import { party } from '../entities/Party.js';
import { enemyTypes } from '../entities/Enemy.js';
import createAnimations from '../entities/animations.js';

export default class BattleScene_dg extends Phaser.Scene {
    constructor() {
        super('BattleScene');
    }

    preload() {
        this.load.image('enemy', 'assets/enemies/Idle.gif');
        this.load.image('selector', 'assets/ui/selector.png');
        this.load.image('battle_bg', 'assets/backgrounds/battle_bg.png');

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
        this.load.spritesheet('enemy_attack', 'assets/enemies/goblin_atk_spritesheet.png', {
            frameWidth: 600,
            frameHeight: 600
        });


    }

    create() {
        createAnimations(this);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


        this.add.image(400, 300, 'battle_bg').setDepth(-10);
        const bg = this.add.image(0, 0, 'battle_bg')
            .setOrigin(0)  // canto superior esquerdo
            .setDepth(-1); // envia para trás dos personagens

        bg.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

        const width = this.sys.game.config.width;
        const height = this.sys.game.config.height;


        this.selector = this.add.image(0, 0, 'selector')
            .setScale(0.06)
            .setVisible(false);

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


        const enemyConfig = {
            name: 'Enemy',
            hp: 5,
            maxHp: 100,
            mana: 0,
            maxMana: 0,
            attack: 20,
            defense: 3,
            speed: 1,
            isPlayer: false,
            abilities: []
        };

        this.enemyCharacters = [];

        const fixedPositions = [
            { x: width * 0.75 - 150, y: height / 2.5 },
            { x: width * 0.75 + 30, y: (height / 5) * 2 },
            { x: width * 0.75 - 30, y: (height / 5) * 3 },
            { x: width * 0.75 + 150, y: (height / 5) * 3.25 }
        ];

        const numEnemies = Phaser.Math.Between(2, 2);

        // Embaralha as posições pra pegar aleatoriamente sem repetir
        const shuffledPositions = Phaser.Utils.Array.Shuffle(fixedPositions);

        for (let i = 0; i < numEnemies; i++) {
            const pos = shuffledPositions[i];
            this.enemyCharacters.push(new Character(this, enemyConfig, pos.x, pos.y, 'enemy'));
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
        if (!this.currentCharacter || !this.currentCharacter.isAlive) return;

        if (option === 'Atacar') {
            this.menuContainer.setVisible(false);
            this.isChoosingTarget = true;
            this.awaitTargetSelection('attack');
        } else if (option === 'Usar Habilidade') {
            this.menuContainer.setVisible(false);
            console.log('Menu de habilidades ainda não implementado.');
            this.nextTurn();
        } else if (option === 'Passar Turno') {
            this.menuContainer.setVisible(false);
            this.nextTurn();
        }
    }

    awaitTargetSelection(action) {
        this.targetAction = action;
        this.isChoosingTarget = true;
        this.selectedEnemyIndex = 0;
        this.updateEnemySelector();

        // Remover listeners para não duplicar (opcional, mas recomendável)
        this.input.keyboard.removeAllListeners('keydown-RIGHT');
        this.input.keyboard.removeAllListeners('keydown-LEFT');

        this.input.keyboard.on('keydown-RIGHT', () => {
            if (!this.isChoosingTarget) return;
            this.selectedEnemyIndex = (this.selectedEnemyIndex + this.enemyCharacters.length - 1) % this.enemyCharacters.length;
            this.updateEnemySelector();
        });

        this.input.keyboard.on('keydown-LEFT', () => {
            if (!this.isChoosingTarget) return;
            this.selectedEnemyIndex = (this.selectedEnemyIndex + 1) % this.enemyCharacters.length;
            this.updateEnemySelector();
        });

        this.enterKey.once('down', () => {
            const target = this.enemyCharacters[this.selectedEnemyIndex];
            this.onTargetSelected(target);
        });
    }




    async onTargetSelected(targetCharacter) {
        if (this.targetAction === 'attack') {
            await this.currentCharacter.attackTarget(targetCharacter);
        } else if (this.targetAction === 'ability' && this.currentAbility) {
            console.log('Uso de habilidade ainda não implementado.');
        }

        this.isChoosingTarget = false;
        this.clearTargetSelection();
        this.nextTurn();

        this.input.keyboard.removeAllListeners();

    }


    clearTargetSelection() {
        this.selector.setVisible(false);
        this.enemyCharacters.forEach(enemy => {
            if (enemy.sprite && enemy.sprite.active && enemy.sprite.removeAllListeners && enemy.sprite.disableInteractive) {
                enemy.sprite.removeAllListeners();
                enemy.sprite.disableInteractive();
            }
        });
    }


    updateEnemySelector() {
        const target = this.enemyCharacters[this.selectedEnemyIndex];
        if (target?.isAlive) {
            this.selector.setPosition(target.sprite.x, target.sprite.y - 50);
            this.selector.setVisible(true);
        } else {
            this.selector.setVisible(false);
        }
    }


    nextTurn() {
        this.turnQueue.push(this.turnQueue.shift());
        this.time.delayedCall(1000, () => {
            this.startTurn();
        });
        this.currentCharacter = this.turnQueue[0];
        this.updateHUD();

        ;

    }

    endBattle(playerWon) {
        this.menuContainer.setVisible(false);
        // Aqui você pode adicionar tela de vitória/derrota ou retornar para menu principal
        if (playerWon) {
            this.add.text(500, 300, 'Vitória!', { fontSize: '48px', fill: '#0f0' });
        } else {
            this.add.text(500 / 2, 300, 'Derrota...', { fontSize: '48px', fill: '#f00' });
        }
    }

    updateHUD() {
        if (!this.currentCharacter || !this.currentCharacter.unit) return;

        this.hudNameText.setText(`Nome: ${this.currentCharacter.unit.name}`);
        this.hudHpText.setText(`HP: ${this.currentCharacter.unit.hp}/${this.currentCharacter.unit.maxHp}`);
        this.hudContainer.setVisible(true);
    }


    createHUD() {
        const { width, height } = this.sys.game.config;

        // Container do HUD
        this.hudContainer = this.add.container(width - 260, height - 100); // posição canto inferior direito

        // Fundo do HUD
        const hudBg = this.add.graphics();
        hudBg.fillStyle(0x000000, 0.6);
        hudBg.fillRoundedRect(0, 0, 250, 80, 10); // largura: 250, altura: 80

        // Texto de nome e HP
        this.hudNameText = this.add.text(20, 10, '', {
            fontSize: '18px',
            fill: '#ffffff',
            fontStyle: 'bold'
        });

        this.hudHpText = this.add.text(20, 40, '', {
            fontSize: '16px',
            fill: '#ff4444'
        });

        // Adiciona tudo no container
        this.hudContainer.add([hudBg, this.hudNameText, this.hudHpText]);

        // Inicialmente invisível (será exibido no turno do jogador ou inimigo)
        this.hudContainer.setVisible(false);
    }

}