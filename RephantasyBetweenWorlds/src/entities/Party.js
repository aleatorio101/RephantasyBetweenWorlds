import Unit from './Unit.js';

export const party = [
    new Unit({
        name: 'siegel',
        hp: 100,
        maxHp: 100,
        mana: 50,
        maxMana: 50,
        attack: 15,
        defense: 5,
        speed: 10,
        sfxKey: 'siegel_attack_sfx',
        isPlayer: true,
        abilities: [{
            name: 'Soco Mecânico',
            manaCost: 25,
            type: 'physical',
            power: 60,
            target: 'enemy',
            sfxKey: 'sielgel_skill_sfx'
        }]
    }),
    new Unit({
        name: 'aiko',
        hp: 50,
        maxHp: 50,
        mana: 150,
        maxMana: 150,
        attack: 20,
        defense: 2,
        speed: 5,
        sfxKey: 'aiko_attack_sfx',
        isPlayer: true,
        abilities: [{
            name: 'Bola de Fogo',
            manaCost: 15,
            type: 'magic',
            power: 40,
            target: 'enemy',
            animationKey: 'aiko_attack',
            sfxKey: 'aiko_skill_sfx',
        }]
    }),
    new Unit({
        name: 'matthew',
        hp: 50,
        maxHp: 50,
        mana: 150,
        maxMana: 150,
        attack: 5,
        defense: 2,
        speed: 5,
        sfxKey: 'matthew_attack_sfx',
        isPlayer: true,
        abilities: [{
            name: 'Nota Dó',
            manaCost: 10,
            type: 'debuff',
            attribute: 'defense',
            power: 15,
            duration: 3,
            target: 'enemy',
            sfxKey: 'matthew_attack_sfx'
        }]
    }),
    new Unit({
        name: 'archibald',
        hp: 150,
        maxHp: 150,
        mana: 35,
        maxMana: 35,
        attack: 10,
        defense: 10,
        speed: 5,
        sfxKey: 'archibald_attack_sfx',
        isPlayer: true,
        abilities: [{
            name: 'Golpe de Escudo',
            manaCost: 25,
            type: 'physical',
            power: 50,
            target: 'enemy',
            sfxKey: 'archibald_skill_sfx'
        }]
    }),
];
