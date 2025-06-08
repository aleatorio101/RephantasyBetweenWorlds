export class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    create() {
        this.menuMusic = this.sound.add('menu_music', { loop: true, volume: 0.5 });
         this.menuMusic.play();
        this.add.image(0, 0, 'menu_bg').setOrigin(0).setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

        const startButton = this.add.text(540, 250, 'Iniciar Jogo', { fontSize: '24px', fill: '#0f0' })
            .setInteractive()
            .on('pointerdown', () => this.scene.start('LoreInicioScene'));

        const creditsButton = this.add.text(540, 300, 'Créditos', { fontSize: '24px', fill: '#0ff' })
            .setInteractive()
            .on('pointerdown', () => this.scene.start('CreditsScene'));

        const ficharioButton = this.add.text(540, 350, 'Fichario', { fontSize: '24px', fill: '#0ff' })
            .setInteractive()
            .on('pointerdown', () => this.scene.start('FicharioScene'));
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