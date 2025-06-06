export default class PauseOverlay {
    constructor(scene) {
        this.scene = scene;
        this.isPaused = false;

        this.overlay = scene.add.rectangle(640, 360, 1280, 720, 0x000000, 0.5)
            .setScrollFactor(0)
            .setDepth(1000)
            .setVisible(false);

        this.text = scene.add.text(700, 340, 'PAUSE', { fontSize: '64px', fill: '#fff' })
            .setOrigin(0.5, 0.5) 
            .setScrollFactor(0)
            .setDepth(1001)
            .setVisible(false);

       
        this.menuButton = scene.add.text(700, 400, 'Voltar ao Menu', { fontSize: '32px', fill: '#0f0' })
            .setOrigin(0.5, 0.5) 
            .setInteractive()
            .setScrollFactor(0)
            .setDepth(1001)
            .setVisible(false)
            .on('pointerdown', () => scene.scene.start('MenuScene'));
    }

    toggle() {
        this.isPaused = !this.isPaused;
        this.overlay.setVisible(this.isPaused);
        this.text.setVisible(this.isPaused);
        this.menuButton.setVisible(this.isPaused);
    }

    hide() {
        this.isPaused = false;
        this.overlay.setVisible(false);
        this.text.setVisible(false);
        this.menuButton.setVisible(false);
    }
}