const enemyTypes = [
    {name: 'Dog', hp: 10, atk: 4, speed: 5, defence: 3},
    {name: 'Bear', hp: 20, atk: 8, speed: 3, defence: 8},
    {name: 'Tiger', hp: 15, atk: 6, speed: 8, defence: 5}
];

const enemyCount = Phaser.Math.Between(1, 4);
for(let i=0; i < enemyCount; i++){
    const type = Phaser.Utils.Array.GetRandom(enemyTypes);
    const enemy = new Unit(type.name, type.hp, type.atk, type.speed, type.defense, false);
    enemies.push(enemy);
}