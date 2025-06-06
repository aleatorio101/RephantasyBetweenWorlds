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

        addEntry('Siegel', 'Ex-guerrilheiro do país de Almandia, Siegel enfrenta o luto da perda da sua mae junto com seu pai e os traumas causados pela guerra entre Almandia e Auror.');
        addEntry('Aiko', 'Uma das companheiras vinda de outro mundo, em seu mundo Aiko é uma estudante do interior de um país chamado japao, é uma garota simples que vive em contato com a natureza e é amante de livros de fantasia, sendo seus personagens favoritos sempre os magos.');
        addEntry('Archibald', 'Archibald é um cavalheiro vindo de outro mundo, em seus mundo ele é o que chamam de saxônico. Archibald é um cavalheiro de seu reino e esta enfrentando o luto de ter perdido sua familia (esposa e dois filhos) por uma doenca que se espalha pela regiao onde vive, e o stress das constantes guerras em que seu reino participa.');
        addEntry('Matthew', 'Matthew é um jovem musico vindo de outro mundo, em seu mundo mora em um país chamado inglaterra. Com seu instrumento ao qual chamam de "guitarra" matthew junto com seus amigos de seu mundo frustadamente nunca conseguiu formar a tao sonhada banda que sempre idealizava.');
        addEntry('Gerwald', 'Pai de Siegel, era um alquimista mestre que ajudou na guerra com seu arsenal de armas quimicas, atualmente vive em Lara com seu filho Siegel onde Gerwald está enfrentando uma profunda depressao após a perda de sua esposa Videl a 3 anos devido a um cancer.');
        addEntry('Videl', 'Falecida mae de Siegel e esposa de Gerwald, era simpatica, jovem, com seus longos cabelos loiros era o colirio aos olhos de Gerwald, faleceu a 3 anos devido a um cancer e deixou todos da familia Abbrachio abalados.');
        addEntry('Almandia', 'Almandia é um país formado a partir da separacao da comunidade rebelde da parte oeste do reino de Auror a 52 anos, Siegel é descedente da familia Abracchio que tem o histórico de serem guerrilheiros de Almandia contra o império de Auror.');
        addEntry('Auror', 'Auror é um império com uma história centenaria, os habitantes da parte leste do reino se consideravam uma raca superior aos habitantes da parte oeste, e des de que o imperio passou a ser comandado mais pela parte leste do imperio houve aumento de impostos e intolerancia com a populacao do oeste, resultando na grande guerra que separou a regiao formando Almandia.');
        addEntry('Lara', 'Lara é uma pacifica vila de Almandia, no passado, refugiados da guerra entre Almandia e Auror acabaram se concentrando na regiao formando a atual vila.');
        addEntry('Goblin', 'Criaturas comuns na regiao de Almandia, sao conhecidos por serem violentos e saqueadores.');
        addEntry('Esqueletos', 'Criaturas que habitam as minas de Almandia, ninguem sabe ao certo suas origens, existem inúmeras lendas sobre serem mineradores que morreram dentro das minas e acabaram tendo suas almas presas no local.');
        addEntry('Minotauro', 'Criatura mítica de Almandia, era visto andando pela floresta a noite até seu misterioso desaparecimento, lendas dizem que a criatura está habitando dentro de uma mina proxima a vila de Lara.');
        addEntry('Urso', 'É uma das criaturas vindas do outro mundo, um estranho e forte gigante quadrupede peludo que veio misteriosamente de outro mundo, suas enormes garras e presas mostram sua imponencia algo que nunca antes foi visto na regiao de Almandia.');
        addEntry('Lobo', 'É uma das criaturas vindas do outro mundo, uma criatura de porte médio mas que nao o rebaixa quanto a periculosidade, sao ageis e andam em bando o que os tornam mais ameacadores para os habitantes de Lara.');

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
