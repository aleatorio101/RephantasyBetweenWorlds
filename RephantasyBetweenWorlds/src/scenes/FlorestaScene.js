export class FlorestaScene extends Phaser.Scene {
    constructor() {
        super('FlorestaScene');
    }

    create() {
        const map = this.make.tilemap({ key: 'Floresta' });

        const tilesets = [
            map.addTilesetImage('assets_spritesheet_v2_free', 'tileset2'),
            map.addTilesetImage('tileset_version1.1', 'tileset1'),
            map.addTilesetImage('assets_version1.1', 'tileset3'),
            map.addTilesetImage('terrain_tiles_v2', 'terrain'),
            map.addTilesetImage('graveyard_tileset_32x32', 'graveyard'),
            map.addTilesetImage('GoldMine_Inactive', 'goldmine'),
            map.addTilesetImage('dirtpath_tiles', 'dirtpath'),
            map.addTilesetImage('decorations', 'decorations1'),
            map.addTilesetImage('Decorationspre', 'decorations2'),
            map.addTilesetImage('Aurora Tileset', 'aurora'),
        ];

        const layers = [
            map.createLayer('Camada de Blocos 1', tilesets),
            map.createLayer('Camada de Blocos 2', tilesets),
            map.createLayer('Camada de Blocos 3', tilesets),
            map.createLayer('Camada de Blocos 4', tilesets),
        ];


        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

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

        this.player = this.physics.add.sprite(1870, 580, 'Siegel_esquerda');
        this.player.setCollideWorldBounds(true);

        const LaraZone = map.getObjectLayer('volta_lara').objects[0];

        this.LaraZone = this.physics.add.staticSprite(
            LaraZone.x + LaraZone.width / 2,
            LaraZone.y + LaraZone.height / 2,
            null
        ).setSize(LaraZone.width, LaraZone.height).setVisible(false);

        this.physics.add.overlap(this.player, this.LaraZone, () => {
            this.registry.set('spawnOverride', true);
            this.registry.set('spawnX', 90);
            this.registry.set('spawnY', 650);
            this.scene.start('GameScene');
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

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-speed);
            this.player.anims.play('walk_left', true);
            this.lastDirection = 'left';
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(speed);
            this.player.anims.play('walk_right', true);
            this.lastDirection = 'right';
        } else if (this.cursors.up.isDown) {
            this.player.setVelocityY(-speed);
            this.player.anims.play('walk_up', true);
            this.lastDirection = 'up';
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(speed);
            this.player.anims.play('walk_down', true);
            this.lastDirection = 'down';
        } else {
            this.player.anims.stop();
            switch (this.lastDirection) {
                case 'left':
                    this.player.setTexture('Siegel_esquerda');
                    break;
                case 'right':
                    this.player.setTexture('Siegel_direita');
                    break;
                case 'up':
                    this.player.setTexture('Siegel_up');
                    break;
                case 'down':
                    this.player.setTexture('Siegel_down');
                    break;
            }
        }
    }
}