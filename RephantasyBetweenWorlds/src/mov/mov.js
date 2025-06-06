export default function createAnimations(scene) {
    scene.anims.create({
        key: 'walk_down',
        frames: scene.anims.generateFrameNumbers('Siegel_down_walk', { start: 0, end: 1 }),
        frameRate: 3,
        repeat: -1
    });
    scene.anims.create({
        key: 'walk_up',
        frames: scene.anims.generateFrameNumbers('Siegel_up_walk', { start: 0, end: 1 }),
        frameRate: 3,
        repeat: -1
    });
    scene.anims.create({
        key: 'walk_left',
        frames: scene.anims.generateFrameNumbers('Siegel_esquerda_walk', { start: 0, end: 1 }),
        frameRate: 3,
        repeat: -1
    });
    scene.anims.create({
        key: 'walk_right',
        frames: scene.anims.generateFrameNumbers('Siegel_direita_walk', { start: 0, end: 1 }),
        frameRate: 3,
        repeat: -1
    });
}