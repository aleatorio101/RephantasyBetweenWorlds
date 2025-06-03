export default function createAnimations(scene) {
    // Siegel
    scene.anims.create({
        key: 'siegel_attack',
        frames: scene.anims.generateFrameNumbers('siegel_attack', { start: 0, end: 6 }),
        frameRate: 10,
        repeat: 0
    });

    // Aiko
    scene.anims.create({
        key: 'aiko_attack',
        frames: scene.anims.generateFrameNumbers('aiko_attack', { start: 0, end: 13 }),
        frameRate: 10,
        repeat: 0
    });

    // Matthew
    scene.anims.create({
        key: 'matthew_attack',
        frames: scene.anims.generateFrameNumbers('matthew_attack', { start: 0, end: 8 }),
        frameRate: 10,
        repeat: 0
    });

    // Archibald
    scene.anims.create({
        key: 'archibald_attack',
        frames: scene.anims.generateFrameNumbers('archibald_attack', { start: 0, end: 6 }),
        frameRate: 10,
        repeat: 0
    });

    // Enemy
    scene.anims.create({
        key: 'enemy_attack',
        frames: scene.anims.generateFrameNumbers('enemy_attack', { start: 0, end: 6 }),
        frameRate: 10,
        repeat: 0
    });
} 