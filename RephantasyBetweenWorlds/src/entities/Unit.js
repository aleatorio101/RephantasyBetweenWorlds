class Unit {
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
        this.XP = 0;
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
        if(speed <= 0) return 0;
        const dodge = Math.log2(speed) * 0.08
        return Math.min(dodge, 0.6); // limita a 60% de chance máxima
    }

    ganharXP(amount){
        this.XP += amount;
        if(this.XP >= 15){
            this.levelUP();
        }
    }

    levelUP(){
        this.level += 1;
        this.XP = 0;
    }

}