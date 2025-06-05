export class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    create() {
        this.add.image(0, 0, 'menu_bg').setOrigin(0).setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

        const startButton = this.add.text(540, 250, 'Iniciar Jogo', { fontSize: '24px', fill: '#0f0' })
            .setInteractive()
            .on('pointerdown', () => this.scene.start('QuartoScene'));

        const creditsButton = this.add.text(540, 300, 'Créditos', { fontSize: '24px', fill: '#0ff' })
            .setInteractive()
            .on('pointerdown', () => this.scene.start('CreditsScene'));
    }
}