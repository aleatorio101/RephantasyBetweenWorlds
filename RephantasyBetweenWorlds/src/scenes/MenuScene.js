export class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    create() {
        this.menuMusic = this.sound.add('menu_music', { loop: true, volume: 0.5 });
        this.menuMusic.play();
        this.add.image(0, 0, 'menu_bg').setOrigin(0).setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

        const centerX = this.sys.game.config.width / 2 + 130;
        let startY = this.sys.game.config.height - 210;
        const spacing = 70;

        this.menuOptions = [
            { text: 'Iniciar Jogo', callback: () => this.scene.start('LoreInicioScene') },
            { text: 'Créditos', callback: () => this.scene.start('CreditsScene') },
            { text: 'Fichario', callback: () => this.scene.start('FicharioScene') }
        ];

        this.selectedIndex = 0;
        this.menuButtons = [];

        this.menuOptions.forEach((option, i) => {
            const y = startY + i * spacing;
            const button = this.add.sprite(centerX, y, 'button_pixel');
            button.setScale(0.35, 0.13);
            const label = this.add.text(centerX, y, option.text, {
                fontFamily: 'monospace',
                fontSize: '22px',
                color: '#fff',
                align: 'center',
                stroke: '#000',
                strokeThickness: 4,
                shadow: { offsetX: 2, offsetY: 2, color: '#222', blur: 2, fill: true }
            }).setOrigin(0.5);
            this.menuButtons.push({ button, label });
        });

        this.selector = this.add.sprite(centerX - 170, startY, 'seta_menu').setOrigin(0.5);
        this.selector.setScale(0.1); 

        this.cursors = this.input.keyboard.createCursorKeys();
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.input.keyboard.on('keydown-UP', () => this.moveSelector(-1));
        this.input.keyboard.on('keydown-DOWN', () => this.moveSelector(1));
        this.input.keyboard.on('keydown-SPACE', () => this.selectOption());

        
        this.input.mouse.disableContextMenu();
        this.input.on('pointerdown', () => {}); 

        this.updateSelector();
    }

    moveSelector(dir) {
        this.selectedIndex = Phaser.Math.Wrap(this.selectedIndex + dir, 0, this.menuOptions.length);
        this.updateSelector();
    }

    updateSelector() {
        const { button } = this.menuButtons[this.selectedIndex];
        this.selector.y = button.y;
    }

    selectOption() {
        const option = this.menuOptions[this.selectedIndex];
        if (option && typeof option.callback === 'function') {
            option.callback();
        }
    }

    shutdown() {
        if (this.menuMusic && this.menuMusic.isPlaying) {
            this.menuMusic.stop();
            this.menuMusic.destroy();
        }
    }
    init() {
        this.events.on('shutdown', this.shutdown, this);
    }
}