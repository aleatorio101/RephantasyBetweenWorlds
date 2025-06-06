let partyRef = null;
export function setPartyReference(ref) {
    partyRef = ref;
}

export function levelUpParty() {
    if (partyRef) {
        partyRef.forEach(unit => unit.levelUp());
    }
}

export default class Unit {
    constructor(config) {
        this.name = config.name;
        this.hp = config.hp;
        this.maxHp = config.maxHp;
        this.mana = config.mana ?? 0;
        this.maxMana = config.maxMana ?? 0;
        this.attack = config.attack;
        this.defense = config.defense;
        this.speed = config.speed;
        this.isPlayer = config.isPlayer;
        this.abilities = config.abilities ?? [];
        this.xp = config.xp || 0;
        this.level = 1;         

    }

    isAlive() {
        return this.hp > 0;
    }

    takeDamage(amount) { //amount é a quantidade de dano que o ataque irá causar
        const reduced = Math.max(0, amount - this.defense); //precisa ser no minimo 0, caso contrário bug sinistro
        this.hp = Math.max(0, this.hp - reduced); // dano maior que a vida maxima causa bug bizarro, isso aqui corrige
        return reduced;
    }

    useMana(amount) {
        this.mana = Math.max(0, this.mana - amount);
    }


    canCast(ability) {
        return this.mana >= ability.manaCost;
    }

    calcularDodge(){
        if(this.speed <= 0) return 0;
        const dodge = Math.log2(this.speed) * 0.08
        return Math.min(dodge, 0.6); // limita a 60% de chance máxima
    }

    ganharXP(amount){
        this.xp += amount;
        if (this.xp >= 15 && !this._partyLeveledUp) {
            this.xp -= 15;
            levelUpParty();
            if (partyRef) {
                partyRef.forEach(unit => unit._partyLeveledUp = true);
            }
        }
        setTimeout(() => {
            if (partyRef) {
                partyRef.forEach(unit => unit._partyLeveledUp = false);
            }
        }, 0);
    }

    levelUp(){
        this.level += 1;    
        this.hp += 1;
        this.maxHp += 1;
        this.mana += 1;
        this.maxMana += 1;
        this.attack += 1;
        this.defense += 1;
        this.speed += 1;
    }

}