export class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    create() {
        const map = this.make.tilemap({ key: 'floresta' });

        
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

        // Configura colisão
        const collisionLayer = map.getObjectLayer('colisao');
        this.walls = this.physics.add.staticGroup();
        
        collisionLayer.objects.forEach(obj => {
            this.walls.create(
                obj.x + obj.width/2,
                obj.y + obj.height/2,
                null
            )
            .setSize(obj.width, obj.height)
            .setOrigin(0.5, 0.5)
            .setVisible(false);
        });

        this.player = this.physics.add.sprite(200, 250, 'hero');
        this.player.setCollideWorldBounds(true);

        
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('hero', { start: 0, end: 3 }),
            frameRate: 8,
            repeat: -1
        });

        this.cursors = this.input.keyboard.createCursorKeys();
        
        
        this.physics.add.collider(this.player, this.walls);

    
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

       
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

        const speed = 200;
        this.player.setVelocity(0);

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-speed);
            this.player.anims.play('walk', true);
            this.player.setFlipX(true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(speed);
            this.player.anims.play('walk', true);
            this.player.setFlipX(false);
        }

        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-speed);
            this.player.anims.play('walk', true);
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(speed);
            this.player.anims.play('walk', true);
        }

        if (this.player.body.velocity.x === 0 && this.player.body.velocity.y === 0) {
            this.player.anims.stop();
        }
    }
}