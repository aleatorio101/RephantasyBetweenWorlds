import PauseOverlay from '../ui/PauseOverlay.js';

export class SalaScene extends Phaser.Scene {
    constructor() {
        super('SalaScene');
    }

    create() {
        const map = this.make.tilemap({ key: 'Sala' });

        const tilesets = [
            map.addTilesetImage('6_floors', 'floor'),
            map.addTilesetImage('tileset_16x16_interior', 'interior'),
            map.addTilesetImage('wooden_stairs-ns_1', 'escada'),
        ];

        const layers = [
            map.createLayer('roof', tilesets),
            map.createLayer('Camada de Blocos 1', tilesets),
            map.createLayer('Camada de Blocos 2', tilesets),
            map.createLayer('Camada de Blocos 3', tilesets),
            map.createLayer('Camada de Blocos 4', tilesets),
            map.createLayer('Camada de Blocos 5', tilesets),
        ];

        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);


         //Configura colisÃ£o
        const collisionLayer = map.getObjectLayer('colisao');
        this.walls = this.physics.add.staticGroup();
        
        collisionLayer.objects.forEach(obj => {
            this.walls.create(
                obj.x + obj.width / 2,
                obj.y + obj.height / 2,
                null
            )
                .setSize(obj.width, obj.height)
                .setOrigin(0.5, 0.5)
                .setVisible(false);
        });

        this.player = this.physics.add.sprite(850, 620, 'Siegel_down');
        this.player.setCollideWorldBounds(true);

        const LaraZone = map.getObjectLayer('lara').objects[0];

        this.LaraZone = this.physics.add.staticSprite(
        LaraZone.x + LaraZone.width / 2,
        LaraZone.y + LaraZone.height / 2,
        null
        ).setSize(LaraZone.width, LaraZone.height).setVisible(false);

        this.physics.add.overlap(this.player, this.LaraZone, () => {
        this.scene.start('GameScene');
        });

        this.cursors = this.input.keyboard.createCursorKeys();


        this.physics.add.collider(this.player, this.walls);


        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player);


        this.pauseOverlay = new PauseOverlay(this);
        this.keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.keyESC)) {
            this.pauseOverlay.toggle();
        }
        if (this.pauseOverlay.isPaused) return;

        const speed = 100;
        this.player.setVelocity(0);

        const directions = [
            { key: 'left',  isDown: this.cursors.left.isDown,  setVelocity: () => this.player.setVelocityX(-speed), anim: 'walk_left', texture: 'Siegel_esquerda' },
            { key: 'right', isDown: this.cursors.right.isDown, setVelocity: () => this.player.setVelocityX(speed),  anim: 'walk_right', texture: 'Siegel_direita' },
            { key: 'up',    isDown: this.cursors.up.isDown,    setVelocity: () => this.player.setVelocityY(-speed), anim: 'walk_up',    texture: 'Siegel_up' },
            { key: 'down',  isDown: this.cursors.down.isDown,  setVelocity: () => this.player.setVelocityY(speed),  anim: 'walk_down',  texture: 'Siegel_down' }
        ];

        let moved = false;

        for (const dir of directions) {
            if (dir.isDown) {
                dir.setVelocity();
                this.player.anims.play(dir.anim, true);
                this.lastDirection = dir.key;
                moved = true;
                break;
            }
        }

        if (!moved) {
            this.player.anims.stop();
            const lastDir = directions.find(d => d.key === this.lastDirection);
            if (lastDir) {
                this.player.setTexture(lastDir.texture);
            }
        }
    }
}