export default class FicharioScene extends Phaser.Scene {
    constructor() {
        super('FicharioScene');
    }

    create() {

        const titleStyle = {
            fontFamily: 'Arial',
            fontSize: '32px',
            color: '#ffffff',
            fontStyle: 'bold'
        };

        const loreStyle = {
            fontFamily: 'Arial',
            fontSize: '18px',
            color: '#cccccc',
            wordWrap: { width: 600 }
        };

        const marginLeft = 100;
        const spacingY = 160;

        this.content = this.add.container(0, 0);

        let y = 80;

        const addEntry = (name, text) => {
            this.content.add(this.add.text(marginLeft, y, name, titleStyle));
            y += 40;
            this.content.add(this.add.text(marginLeft + 20, y, text, loreStyle));
            y += spacingY;
        };

        addEntry('Siegel', 'Ex-guerrilheiro do país de Almandia, Siegel enfrenta o luto da perda de sua mãe junto com seu pai e os traumas causados pela guerra entre Almandia e Auror.');
        addEntry('Aiko', 'Uma das companheiras vindas de outro mundo, em seu mundo Aiko é uma estudante do interior de um país chamado Japão. É uma garota simples que vive em contato com a natureza e é amante de livros de fantasia, sendo seus personagens favoritos sempre os magos.');
        addEntry('Archibald', 'Archibald é um cavalheiro vindo de outro mundo. Em seu mundo ele é o que chamam de saxão. Archibald é um cavalheiro de seu reino e está enfrentando o luto de ter perdido sua família (esposa e dois filhos) por uma doença que se espalha pela região onde vive, e o estresse das constantes guerras em que seu reino participa.');
        addEntry('Matthew', 'Matthew é um jovem músico vindo de outro mundo. Em seu mundo, ele mora em um país chamado Inglaterra. Com seu instrumento, ao qual chamam de "guitarra", Matthew, junto com seus amigos de seu mundo, frustradamente nunca conseguiu formar a tão sonhada banda que sempre idealizava.');
        addEntry('Gerwald', 'Pai de Siegel, era um alquimista mestre que ajudou na guerra com seu arsenal de armas químicas. Atualmente vive em Lara com seu filho Siegel, onde Gerwald está enfrentando uma profunda depressão após a perda de sua esposa Videl há 3 anos devido a um câncer.');
        addEntry('Videl', 'Falecida mãe de Siegel e esposa de Gerwald, era simpática, jovem, com seus longos cabelos loiros era o colírio aos olhos de Gerwald. Faleceu há 3 anos devido a um câncer e deixou todos da família Abbrachio abalados.');
        addEntry('Almandia', 'Almandia é um país formado a partir da separação da comunidade rebelde da parte oeste do reino de Auror há 52 anos. Siegel é descendente da família Abracchio que tem o histórico de serem guerrilheiros de Almandia contra o império de Auror.');
        addEntry('Auror', 'Auror é um império com uma história centenária. Os habitantes da parte leste do reino se consideravam uma raça superior aos habitantes da parte oeste, e desde que o império passou a ser comandado mais pela parte leste, houve aumento de impostos e intolerância com a população do oeste, resultando na grande guerra que separou a região, formando Almandia.');
        addEntry('Lara', 'Lara é uma pacífica vila de Almandia. No passado, refugiados da guerra entre Almandia e Auror acabaram se concentrando na região, formando a atual vila.');
        addEntry('Goblin', 'Criaturas comuns na região de Almandia, são conhecidos por serem violentos e saqueadores.');
        addEntry('Esqueletos', 'Criaturas que habitam as minas de Almandia. Ninguém sabe ao certo suas origens; existem inúmeras lendas sobre serem mineradores que morreram dentro das minas e acabaram tendo suas almas presas no local.');
        addEntry('Minotauro', 'Criatura mítica de Almandia, era visto andando pela floresta à noite até seu misterioso desaparecimento. Lendas dizem que a criatura está habitando dentro de uma mina próxima à vila de Lara.');
        addEntry('Urso', 'É uma das criaturas vindas do outro mundo, um estranho e forte gigante quadrúpede peludo que veio misteriosamente de outro mundo. Suas enormes garras e presas mostram sua imponência, algo que nunca antes foi visto na região de Almandia.');
        addEntry('Lobo', 'É uma das criaturas vindas do outro mundo, uma criatura de porte médio mas que não a rebaixa quanto à periculosidade. São ágeis e andam em bando, o que os torna mais ameaçadores para os habitantes de Lara.');

        this.scrollY = 0;

        this.maxScroll = Math.max(0, y - this.game.config.height + 50);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.input.on('wheel', (pointer, gameObjects, deltaX, deltaY) => {
            this.scrollY += deltaY * 0.5;
            this.scrollY = Phaser.Math.Clamp(this.scrollY, 0, this.maxScroll);
            this.content.y = -this.scrollY;
        });


        const backButton = this.add.text(1050, 680, 'Voltar ao menu', { fontSize: '18px', fill: '#0f0' })
            .setInteractive()
            .on('pointerdown', () => this.scene.start('MenuScene'));
    }
}
