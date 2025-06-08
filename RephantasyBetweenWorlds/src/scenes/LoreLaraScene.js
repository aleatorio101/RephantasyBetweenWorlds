export default class LoreLaraScene extends Phaser.Scene {
    constructor() {
        super('LoreLaraScene');
    }

    preload() {
        this.load.image('cena_lara', 'assets/backgrounds/cena_lara.png');
        this.load.image('apresent_pern', 'assets/backgrounds/apresent_pern.png');
        this.load.image('cena_sala', 'assets/backgrounds/cena_sala.png');

    }

    create() {
        this.cenas_music = this.sound.add('cenas_music', { loop: true, volume: 0.5 });
        this.cenas_music.play();
        this.fundoAtual = this.add.image(0, 0, 'cena_lara').setOrigin(0, 0).setDepth(-1);

        this.dialogos = [
            { nome: '', fala: 'Ao sair para verificar a origem do barulho que ouviram, Siegel se depara com criaturas que nunca tinha visto antes.' },
            { nome: 'Siegel', fala: 'Mas o quê?' },
            { nome: 'Siegel', fala: 'Para trás! Saiam de perto dessa coisa!' },
            { nome: '', fala: 'Siegel então luta com as criaturas e acaba vencendo-as, porém mais delas aparecem.' },
            { nome: 'Siegel', fala: 'Droga, mais? De onde vieram essas coisas?' },
            { nome: '', fala: 'Porém, Siegel escuta gritos estranhos vindos do céu. Começam distantes, mas vão aumentando conforme o ser em queda livre se aproxima do solo.' },
            { nome: 'Siegel', fala: 'Mas o que é isso agora?' },
            { nome: '', fala: 'Vultos rapidamente colidem com o chão, mas continuam inteiros e sem aparentes machucados. Siegel vê um homem loiro com armadura semi-completa (sem elmo), um jovem com um aparato estranho nas mãos e uma adolescente de vestido azul e chapéu amarelo.' },
            { nome: 'Homem loiro', fala: '*Voz confusa* Mas o que diabos aconteceu? Onde estou???' },
            { nome: 'Siegel', fala: 'Eu que pergunto isso.' },
            { nome: 'Jovem', fala: '*Susto* Eu caí do céu? Eu morri?' },
            { nome: 'Homem loiro', fala: 'Mas o que estes lobos e ursos estão fazendo aqui?' },
            { nome: 'Siegel', fala: 'Lobos? Espera, você sabe o que são essas coisas?' },
            { nome: 'Homem loiro', fala: 'Como assim se eu sei? Você não vê que são lobos?' },
            { nome: 'Adolescente', fala: '*Acordando* I-isto é… é um sonho?' },
            { nome: 'Siegel', fala: 'Que seja. Você tem uma espada, pode me dar uma mão aqui? Depois conversamos.' },
            { nome: 'Siegel', fala: 'Acho que eram só esses, mas que droga está acontecendo? De onde vieram você e esses lobos?' },
            { nome: 'Homem loiro', fala: 'Como assim de onde eu vim? Onde eu estou?' },
            { nome: 'Siegel', fala: 'Estamos em uma vila chamada Lara.' },
            { nome: 'Homem loiro', fala: 'Lara?? Nunca ouvi sobre esta vila antes.' },
            { nome: 'Adolescente', fala: 'Lara? Então eu não estou no Japão? Espera, o que está acontecendo…' },
            { nome: 'Siegel', fala: 'O quê? Não conheço esse lugar, você está em Almandia. Se bem que você pode ser um cidadão do céu devido à sua apresentação…' },
            { nome: 'Homem loiro', fala: 'Bem, estou tão confuso quanto você. Eu lembro de estar no campo de batalha, quando na hora que eu ia receber um golpe, acabei imediatamente entrando em queda livre. Eu morri? Aqui é o céu? Oh, não, EU ESTOU NO INFERNO??' },
            { nome: 'Siegel', fala: 'Eu não tenho ideia de nada do que você está falando... e já disse, você está em Lara.' },
            { nome: 'Jovem', fala: 'Mas o que está acontecendo…' },
            { nome: 'Siegel', fala: 'Bem, também quero saber. Então me permita te ajudar, me chamo **Siegel**. E vocês?' },
            { nome: 'Archibald', fala: '**Archibald**.' },
            { nome: 'Matthew', fala: '**Matthew**.' },
            { nome: 'Aiko', fala: '**Aiko**...' },
            { nome: 'Siegel', fala: 'É um prazer.' },
            { nome: '', fala: 'Siegel então olha para além da vila e vê no céu um portal.' },
            { nome: 'Siegel', fala: 'Espera! Olhe aquilo, será que é um…' },
            { nome: 'Archibald', fala: 'Onde?' },
            { nome: 'Archibald', fala: 'Minha nossa, será um portal?' },
            { nome: 'Siegel', fala: 'Aquele lugar... Me é familiar…' },
            { nome: 'Siegel', fala: 'Venham comigo, quero ir até o meu pai para ver se ele está bem.' },
            { nome: 'Archibald', fala: 'Mas e aquele portal?' },
            { nome: 'Siegel', fala: 'Planejo irmos lá para ver o que está acontecendo, mas por favor, vamos até meu pai primeiro.' },
            { nome: 'Archibald', fala: 'Certo.' },
            { nome: '', fala: 'Ao entrarem na casa de Siegel.' },
            { nome: 'Siegel', fala: 'Pai! Você está bem?' },
            { nome: 'Gerwald', fala: 'Eu? Bem, estou bem, eu acho?' },
            { nome: 'Gerwald', fala: 'O que aconteceu? Escutei gritos.' },
            { nome: 'Siegel', fala: 'Criaturas bizarras apareceram e estavam atacando os outros. Fiquei preocupado com o senhor e vim ver se você está bem.' },
            { nome: 'Gerwald', fala: 'Criaturas? Mas o quê?' },
            { nome: 'Siegel', fala: 'Sim, também estou confuso.' },
            { nome: 'Gerwald', fala: '*Olha para o grupo*. São amigos?' },
            { nome: 'Siegel', fala: 'Então, sobre isso... é mais complicado ainda...' },
            { nome: 'Siegel', fala: 'Eles vieram literalmente do céu.' },
            { nome: 'Archibald', fala: 'Prazer, **Archibald**.' },
            { nome: 'Gerwald', fala: '*Aperta a mão de Archibald* **Gerwald**.' },
            { nome: 'Gerwald', fala: 'E olá a todos vocês também.' },
            { nome: 'Aiko, Matthew', fala: 'Olá.' },
            { nome: 'Siegel', fala: 'Pai, vou com eles onde parece ser o portal de onde esses bichos estão vindo.' },
            { nome: '', fala: '*Gerwald olha para o portal com uma expressão assustada, mas estranhamente não parece surpreso.*' },
            { nome: 'Siegel', fala: 'Aaaa... pai? Você está bem?' },
            { nome: 'Gerwald', fala: 'SIM, SIM, estou.' },
            { nome: 'Gerwald', fala: 'Sig... você tem certeza? Acho melhor você ficar aqui. É muito perigoso sair, nem sabe o que são essas coisas que você viu.' },
            { nome: 'Siegel', fala: 'Desculpa, mas não posso. Será melhor se eu for. É o único caminho até aqui mesmo, então conseguirei proteger os aldeões e avançar até o portal.' },
            { nome: 'Siegel', fala: 'De qualquer jeito, sou o único da vila que consegue fazer isso.' },
            { nome: 'Gerwald', fala: '…' },
            { nome: 'Gerwald', fala: 'Tome cuidado.' },
            { nome: 'Siegel', fala: 'Obrigado, pai.' },
            { nome: 'Siegel', fala: 'Prometo que não vou demorar.' },
            { nome: 'Gerwald', fala: 'Certo... Boa sorte, Sig…' },
            { nome: '', fala: '*Siegel se vira para o grupo.*' },
            { nome: 'Siegel', fala: 'Vamos até lá o mais rápido possível.' }
        ];
        this.indexDialogo = 0;

        this.dialogoBox = this.add.graphics();
        this.dialogoBox.fillStyle(0x000000, 0.7); // Cor preta, 70% de opacidade
        this.dialogoBox.fillRect(30, 430, 740, 150); // Posição (x, y) e tamanho (largura, altura)

        this.nomefala = this.add.text(50, 450, '', {
            fontSize: '18px',
            fill: '#ffaa55',
            fontFamily: 'serif'
        });
        this.falafala = this.add.text(50, 480, '', {
            fontSize: '22px',
            fill: '#ffffff',
            fontFamily: 'serif',
            wordWrap: { width: 700 }
        });

        this.cameras.main.fadeIn(1000, 0, 0, 0);

        this.mostrarDialogo(this.dialogos[this.indexDialogo]);

        this.input.keyboard.on('keydown-SPACE', () => {
            this.indexDialogo++;
            if (this.indexDialogo >= this.dialogos.length) {
                this.finalizarCena();
            } else {
                this.mostrarDialogo(this.dialogos[this.indexDialogo]);
            }
        });

        this.criarBotaoPular();
    }

    mostrarDialogo(dialogo) {
        this.nomefala.setText(dialogo.nome);
        this.falafala.setText(dialogo.fala);

        if (this.indexDialogo === 7) {
            this.trocarFundoParaApresentPern();
        }

        if (this.indexDialogo === 38) {
            this.trocarFundoParaSala();
        }
    }

    trocarFundoParaApresentPern() {
        const novoFundo1 = this.add.image(0, 0, 'apresent_pern').setOrigin(0).setAlpha(0).setDepth(-1);

        this.tweens.add({
            targets: novoFundo1,
            alpha: 1,
            duration: 1000,
            onComplete: () => {
                if (this.fundoAtual) this.fundoAtual.destroy();
                this.fundoAtual = novoFundo1;
            }
        });
    }

    trocarFundoParaSala() {
        const novoFundo2 = this.add.image(0, 0, 'cena_sala').setOrigin(0).setAlpha(0).setDepth(-1);

        this.tweens.add({
            targets: novoFundo2,
            alpha: 1,
            duration: 1000,
            onComplete: () => {
                if (this.fundoAtual) this.fundoAtual.destroy();
                this.fundoAtual = novoFundo2;
            }
        });
    }


    criarBotaoPular() {
        const botao = this.add.text(650, 550, '[Pular >>]', {
            fontSize: '16px',
            fill: '#999999',
            fontFamily: 'serif',
            backgroundColor: '#222222',
            padding: { x: 8, y: 4 }
        }).setInteractive();

        botao.on('pointerdown', () => {
            this.finalizarCena();
        });
    }

    finalizarCena() {
        this.cameras.main.fadeOut(1000, 0, 0, 0);
        this.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.start("GameScene");
        });
    }
    shutdown() {
        if (this.cenas_music && this.cenas_music.isPlaying) {
            this.cenas_music.stop();
            this.cenas_music.destroy();
        }
    }
    init() {
        this.events.on('shutdown', this.shutdown, this);
    }
}