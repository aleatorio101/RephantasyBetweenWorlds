import PauseOverlay from '../ui/PauseOverlay.js';

export class CavernaScene extends Phaser.Scene {
    constructor() {
        super('CavernaScene');
    }

    init(data) {
        this.spawnOverride = false;
        if (data && data.playerX !== undefined && data.playerY !== undefined) {
            this.spawnOverride = true;
            this.spawnX = data.playerX;
            this.spawnY = data.playerY;
        }
        this.events.on('shutdown', this.shutdown, this);
    }

    create() {
        this.map_dung_Music = this.sound.add('map_dung_music', { loop: true, volume: 0.5 });
        this.map_dung_Music.play();
        const map = this.make.tilemap({ key: 'Caverna' });

        const tilesets = [
            map.addTilesetImage('Dungeon_Autotiles', 'dungAuto'),
            map.addTilesetImage('Dungeon_WaterAnimation', 'dungWater'),
            map.addTilesetImage('DungeonDecorations', 'dungDec'),
        ];

        const layers = [
            map.createLayer('nao sei 2', tilesets),
            map.createLayer('floor', tilesets),
            map.createLayer('pedra na gua', tilesets),
            map.createLayer('path', tilesets),
            map.createLayer('deco', tilesets),
            map.createLayer('doors', tilesets),
            map.createLayer('boss deco', tilesets),
            map.createLayer('muro em ruina', tilesets),
            map.createLayer('me ajuda', tilesets),
        ];

        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);


        //Configura colisão
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

        this.player = this.physics.add.sprite(
            this.spawnOverride ? this.spawnX : 50,
            this.spawnOverride ? this.spawnY : 550,
            'Siegel_direita'
        );
        this.player.setCollideWorldBounds(true);

        const LaraZone = map.getObjectLayer('lara').objects[0];

        this.LaraZone = this.physics.add.staticSprite(
            LaraZone.x + LaraZone.width / 2,
            LaraZone.y + LaraZone.height / 2,
            null
        ).setSize(LaraZone.width, LaraZone.height).setVisible(false);

        this.physics.add.overlap(this.player, this.LaraZone, () => {
            this.registry.set('spawnOverride', true);
            this.registry.set('spawnX', 160);
            this.registry.set('spawnY', 630);
            this.scene.start('GameScene');
        });


        this.cursors = this.input.keyboard.createCursorKeys();
        this.physics.add.collider(this.player, this.walls);


        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player);


        this.pauseOverlay = new PauseOverlay(this);
        this.keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);


        this.bossZone = this.physics.add.staticSprite(100 + 220, 800 + 50, null)
            .setSize(100, 100)
            .setVisible(false);

        this.bossTriggered = false;

        this.physics.add.overlap(this.player, this.bossZone, () => {
            if (!this.bossTriggered) {
                this.bossTriggered = true;
                this.scene.start('BattleScene_dg_boss', {
                    previousScene: this.scene.key,
                    playerX: this.player.x,
                    playerY: this.player.y
                });
            }
        }, null, this);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.keyESC)) {
            this.pauseOverlay.toggle();
        }
        if (this.pauseOverlay.isPaused) return;

        const speed = 100;
        this.player.setVelocity(0);

        const directions = [
            { key: 'left', isDown: this.cursors.left.isDown, setVelocity: () => this.player.setVelocityX(-speed), anim: 'walk_left', texture: 'Siegel_esquerda' },
            { key: 'right', isDown: this.cursors.right.isDown, setVelocity: () => this.player.setVelocityX(speed), anim: 'walk_right', texture: 'Siegel_direita' },
            { key: 'up', isDown: this.cursors.up.isDown, setVelocity: () => this.player.setVelocityY(-speed), anim: 'walk_up', texture: 'Siegel_up' },
            { key: 'down', isDown: this.cursors.down.isDown, setVelocity: () => this.player.setVelocityY(speed), anim: 'walk_down', texture: 'Siegel_down' }
        ];

        let moved = false;

        for (const dir of directions) {
            if (dir.isDown) {
                dir.setVelocity();
                this.player.anims.play(dir.anim, true);
                this.lastDirection = dir.key;
                moved = true;
                if (Phaser.Math.Between(1, 700) <= 1) {
                    this.scene.start('BattleScene_dg', {
                        previousScene: this.scene.key,
                        playerX: this.player.x,
                        playerY: this.player.y
                    });
                }
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
    shutdown() {
        if (this.map_dung_Music && this.map_dung_Music.isPlaying) {
            this.map_dung_Music.stop();
            this.map_dung_Music.destroy();
        }
    }
}