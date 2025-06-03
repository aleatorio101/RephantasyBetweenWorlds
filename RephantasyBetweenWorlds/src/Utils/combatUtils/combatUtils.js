export function attack(attacker, target, rawDamage) {
    const dodgeChance = target.calcularDodge();

    if (Math.random() < dodgeChance) {
        console.log(`${target.name} esquivou do ataque!`);
        return 0;
    }

    const realDamage = target.takeDamage(rawDamage);
    console.log(`${target.name} sofreu ${realDamage} de dano!`);
    return realDamage;
}
