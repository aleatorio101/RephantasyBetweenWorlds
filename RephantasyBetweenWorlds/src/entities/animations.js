let animationsCreated = false;

export default function createAnimations(scene) {
    if (animationsCreated) return;

    console.log('✅ Criando animações globais');

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

    // Goblin
    const goblinframes = scene.anims.generateFrameNumbers('goblin_attack', { start: 0, end: 6 });
    if (goblinframesframes.length === 0) {
        console.warn('⚠️ Spritesheet goblin_attack ainda não está pronto ao tentar criar animação!');
    }
    scene.anims.create({
        key: 'goblin_attack',
        frames: goblinframes,
        frameRate: 10,
        repeat: 0
    });

    // Skeleton
    scene.anims.create({
        key: 'skeleton_attack',
        frames: scene.anims.generateFrameNumbers('skeleton_attack', { start: 0, end: 8 }),
        frameRate: 10,
        repeat: 0
    });
    // wolf
    scene.anims.create({
        key: 'wolf_attack',
        frames: scene.anims.generateFrameNumbers('wolf_attack', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: 0
    });
    // bear
    scene.anims.create({
        key: 'bear_attack',
        frames: scene.anims.generateFrameNumbers('bear_attack', { start: 0, end: 7 }),
        frameRate: 10,
        repeat: 0
    });
    // minotaur
    scene.anims.create({
        key: 'minotaur_attack',
        frames: scene.anims.generateFrameNumbers('minotaur_attack', { start: 0, end: 4 }),
        frameRate: 10,
        repeat: 0
    });
    // boss-velho
    scene.anims.create({
        key: 'boss_entrada',
        frames: scene.anims.generateFrameNumbers('boss_entrada', { start: 0, end: 35 }),
        frameRate: 10,
        repeat: 0
    });
    // boss_demonio
    scene.anims.create({
        key: 'boss_attack',
        frames: scene.anims.generateFrameNumbers('boss_attack', { start: 0, end: 14 }),
        frameRate: 10,
        repeat: 0
    });

    animationsCreated = true;
} 