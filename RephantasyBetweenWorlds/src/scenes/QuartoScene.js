export class QuartoScene extends Phaser.Scene {
    constructor() {
        super('QuartoScene');
    }

    create() {
        const map = this.make.tilemap({ key: 'Quarto' });

        const tilesets = [
            map.addTilesetImage('6_floors', 'floor'),
            map.addTilesetImage('tileset_16x16_interior', 'interior'),
            map.addTilesetImage('wooden_stairs-ns_1', 'escada'),
        ];

        const layers = [
            map.createLayer('roof (s.o.s)', tilesets),
            map.createLayer('Camada de Blocos 1', tilesets),
            map.createLayer('Camada de Blocos 2', tilesets),
            map.createLayer('Camada de Blocos 3', tilesets),
            map.createLayer('Camada de Blocos 4', tilesets),
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

        this.player = this.physics.add.sprite(770, 400, 'Siegel_down');
        this.player.setCollideWorldBounds(true);

        const salaZone = map.getObjectLayer('sala').objects[0];

        this.salaZone = this.physics.add.staticSprite(
        salaZone.x + salaZone.width / 2,
        salaZone.y + salaZone.height / 2,
        null
        ).setSize(salaZone.width, salaZone.height).setVisible(false);

        this.physics.add.overlap(this.player, this.salaZone, () => {
        this.scene.start('SalaScene');
        });

        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('hero', { start: 0, end: 3 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'walk_down',
            frames: this.anims.generateFrameNumbers('Siegel_down_walk', { start: 0, end: 1 }),
            frameRate: 3,
            repeat: -1
        });

        this.anims.create({
            key: 'walk_up',
            frames: this.anims.generateFrameNumbers('Siegel_up_walk', { start: 0, end: 1 }),
            frameRate: 3,
            repeat: -1
        });

        this.anims.create({
            key: 'walk_left',
            frames: this.anims.generateFrameNumbers('Siegel_esquerda_walk', { start: 0, end: 1 }),
            frameRate: 3,
            repeat: -1
        });

        this.anims.create({
            key: 'walk_right',
            frames: this.anims.generateFrameNumbers('Siegel_direita_walk', { start: 0, end: 1 }),
            frameRate: 3,
            repeat: -1
        });


        this.cursors = this.input.keyboard.createCursorKeys();


        this.physics.add.collider(this.player, this.walls);


        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player);


        this.keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.pauseOverlay = this.add.rectangle(640, 360, 1280, 720, 0x000000, 0.5).setVisible(false);
        this.pauseText = this.add.text(480, 300, 'PAUSE', { fontSize: '64px', fill: '#fff' }).setVisible(false);
        this.menuButton = this.add.text(520, 400, 'Voltar ao Menu', { fontSize: '32px', fill: '#0f0' })
            .setInteractive()
            .setVisible(false)
            .on('pointerdown', () => this.scene.start('MenuScene'));
        this.isPaused = false;
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.keyESC)) {
            this.isPaused = !this.isPaused;
            this.pauseOverlay.setVisible(this.isPaused);
            this.pauseText.setVisible(this.isPaused);
            this.menuButton.setVisible(this.isPaused);
        }

        if (this.isPaused) return;

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