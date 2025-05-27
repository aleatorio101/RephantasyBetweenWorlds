export class CreditsScene extends Phaser.Scene {
    constructor() {
        super('CreditsScene');
    }

    create() {
        this.add.text(480, 100, 'Créditos', { fontSize: '28px', fill: '#fff' });
        this.add.text(300, 160, 'Gabriel Delefrati, Gabriel Gnoatto, Guilherme Chiquito,', { fontSize: '18px', fill: '#ccc' });
        this.add.text(300, 190, 'João Ricardo, Lucas Domingues, Vanessa Beltrame', { fontSize: '18px', fill: '#ccc' });

        const backButton = this.add.text(1050, 680, 'Voltar ao menu', { fontSize: '18px', fill: '#0f0' })
            .setInteractive()
            .on('pointerdown', () => this.scene.start('MenuScene'));
    }
}