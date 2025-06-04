export class BattleScene extends Phaser.Scene {
    constructor() {
        super({key: 'BattleScene'});
    }

    preload(){
        this.load.image('battle_bg', 'assets/backgrounds/battle_bg.png');
    }

    create(){
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'battle_bg').setOrigin(0.5)
        .setDisplaySize(this.cameras.main.width, this.cameras.main.height);



        // this.input.keyboard.once('keydown-ESC', () => {
        //     this.scene.stop('BattleScene');
        //     this.scene.resume('GameScene')
        // })
    }
}