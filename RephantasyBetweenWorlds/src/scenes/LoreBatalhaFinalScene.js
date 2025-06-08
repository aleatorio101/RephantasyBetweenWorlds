export default class LoreBatalhaFinalScene extends Phaser.Scene {
    constructor() {
        super('LoreBatalhaFinalScene');
    }

    preload() {
        this.load.image('cena_sala', 'assets/backgrounds/cena_sala.png');
        this.load.image('sepultura', 'assets/backgrounds/sepultura.png');
        this.load.image('cerco', 'assets/backgrounds/cerco.png');
        this.load.image('diario', 'assets/backgrounds/diario.png');
        this.load.image('porao', 'assets/backgrounds/porao.png');
        this.load.image('porao_2', 'assets/backgrounds/porao_2.png');
        this.load.image('perseguicao', 'assets/backgrounds/perseguicao.png');
        this.load.image('capeta', 'assets/backgrounds/capeta.png');
    }

    create() {
        this.cena_boss = this.sound.add('cena_boss', { loop: true, volume: 0.5 });
        this.cena_boss.play();
        this.fundoAtual = this.add.image(0, 0, 'sepultura').setOrigin(0, 0).setDepth(-1);

        this.dialogos = [
            { nome: 'Siegel', fala: 'Eu sabia.' },
            { nome: '', fala: 'Siegel então toma a frente e vai até o túmulo sozinho.' },
            { nome: 'Aiko', fala: 'Siegel, espera, não vá sozinho!' },
            { nome: '', fala: 'O grupo então segue Siegel. O túmulo está exatamente embaixo do portal.' },
            { nome: 'Siegel', fala: '…' },
            { nome: 'Archibald', fala: 'Siegel... Você sabe de quem é esse túmulo, não sabe?' },
            { nome: 'Siegel', fala: 'É… é o túmulo da minha mãe, Videl.' },
            { nome: 'Matthew', fala: 'Mas por que o portal está aqui?' },
            { nome: '', fala: 'Então, sem tempo para o grupo processar o que está acontecendo, 3 criaturas enormes e brancas aparecem.' },
            { nome: 'Aiko', fala: 'Droga, esses parecem ser muito fortes.' },
            { nome: 'Siegel', fala: 'Rápido, para cima deles! Depois pensamos em como lidar com o portal.' },
            { nome: '', fala: 'O grupo então enfrenta as criaturas, mas elas são muito fortes, as mais fortes que eles já enfrentaram.' },
            { nome: 'Matthew', fala: '*Ofegante* Droga... eles não estão sofrendo dano nenhum.' },
            { nome: 'Archibald', fala: 'Vamos recuar.' },
            { nome: 'Siegel', fala: 'NÃO!' },
            { nome: 'Archibald', fala: 'O quê? COMO ASSIM NÃO? Você não vê que não podemos contra eles?' },
            { nome: 'Siegel', fala: 'Chegamos tão longe... Não podemos simplesmente voltar, precisamos fechar o portal.' },
            { nome: 'Aiko', fala: 'Siegel, nós não podemos, somos fracos demais. Vamos recuar apenas por enquanto.' },
            { nome: 'Siegel', fala: 'Tsk... DROGA!' },
            { nome: '', fala: 'O grupo então recua e foge das criaturas, e voltam imediatamente para Lara.' },
            { nome: 'Siegel', fala: 'Tsk... MAS QUE MERDA! Por que... por que naquele lugar…' },
            { nome: 'Aiko', fala: 'Se acalme, vamos para sua casa descansar. Podemos discutir melhor o que está acontecendo.' },
            { nome: 'Archibald', fala: 'Isso, melhor assim. O resto de nós vamos ficar aqui fora cuidando para prevenir caso eles tenham nos seguido.' },
            { nome: 'Siegel', fala: 'Tá… Tá legal.' },
            { nome: 'Gerwald', fala: 'Sig! Você voltou!' },
            { nome: 'Siegel', fala: '…' },
            { nome: 'Gerwald', fala: 'Ó céus, sente-se, você deve estar cansado.' },
            { nome: '', fala: 'Siegel senta na mesa de jantar.' },
            { nome: 'Gerwald', fala: 'O-o que houve? Você está com uma expressão muito séria.' },
            { nome: 'Siegel', fala: 'Pai... eu cheguei até o portal e…' },
            { nome: 'Siegel', fala: 'E... por algum motivo ele está em cima do túmulo da mãe…' },
            { nome: '', fala: 'Siegel então observa que Gerwald força suas mãos como se estivesse escondendo algo.' },
            { nome: 'Gerwald', fala: '*Suando de nervoso*' },
            { nome: 'Siegel', fala: 'Pai?' },
            { nome: 'Gerwald', fala: '*Susto* Ah, não, não se preocupe comigo. Escute, vou no seu quarto pegar algumas roupas para você, já que estás todo sujo.' },
            { nome: '', fala: 'Gerwald então sobe as escadas até o quarto de Siegel. Siegel percebe na mesa um diário que nunca tinha visto antes, e o pega.' },
            { nome: 'Siegel', fala: '*Olha para mesa e percebe um livro*' },
            { nome: 'Siegel', fala: '…? Nunca vi esse livro antes.' },
            { nome: 'Siegel', fala: '*Abre a primeira página e percebe que é um diário.*' },
            { nome: 'Siegel', fala: 'Um diário? Do pai?' },
            { nome: '', fala: 'Siegel então começa a ler o diário e tem uma revelação aterrorizante.' },
            { nome: 'Diário', fala: 'Eu não posso aceitar isso, ela não merecia, era muito jovem para morrer assim, eu não vou deixar. Vou trazê-la de volta custe o que custar, vou reunir minha família novamente.' },
            { nome: 'Diário', fala: 'Hoje comecei a planejar como irei construir o orbe da anima. Temo que não possuo o espaço adequado no meu porão, irei retirar alguns móveis para ter mais espaço.' },
            { nome: 'Diário', fala: 'Hoje fiz uma descoberta que não estava nos planos: preciso tomar a alma dela para o orbe poder trazê-la. Não sou bom com magia necromante, mas aprenderei... aprenderei custe o que custar.' },
            { nome: 'Diário', fala: 'EU CONSEGUI! Hoje eu consegui armazenar a alma dela, o brilho do orbe é belo, assim como ela... Aguente mais um pouco... só mais um pouco...' },
            { nome: 'Diário', fala: 'NÃO FUNCIONA! Não entendo por que não funciona, era para... ERA PARA ELA ESTAR AQUI... onde foi que eu errei?' },
            { nome: 'Diário', fala: 'Hoje um portal se abriu no céu, pela posição... me parece muito ser o túmulo dela... mas como isso é possível? Era para ela estar de volta... por que o orbe trouxe essas coisas para cá?' },
            { nome: '', fala: 'Após ler, Siegel arregala os olhos como nunca tinha feito antes e se questiona se o que leu era verídico.' },
            { nome: 'Siegel', fala: 'N-não pode ser, i-isso não é verdade, é um absurdo!' },
            { nome: '', fala: 'Siegel se levanta e olha para o porão.' },
            { nome: 'Siegel', fala: 'Não pode ser...' },
            { nome: '', fala: 'Então, tomado pela dúvida, Siegel desce as escadas do porão. Percebe ao chegar na porta que ela não estava trancada como de costume, é como se seu pai tivesse saído dele pouco tempo antes da chegada de Siegel à sua casa. Siegel então entra no porão e se depara com um orbe exatamente como descrito no diário, cercado de outras tecnologias que aparentemente servem para o funcionamento da mesma.' },
            { nome: 'Siegel', fala: 'Não, não, não, não.' },
            { nome: 'Siegel', fala: 'É verdade mesmo... Como você pode fazer isso, pai?' },
            { nome: '', fala: 'Gerwald então aparece em silêncio e apenas encara Siegel com um olhar cabisbaixo. Siegel furiosamente questiona seu pai:' },
            { nome: 'Siegel', fala: 'Pai... VOCÊ PODE ME EXPLICAR QUE MERDA É ESSA??' },
            { nome: 'Gerwald', fala: '…' },
            { nome: 'Siegel', fala: 'VO-VOCÊ TEM NOÇÃO DO QUE ESTÁ FAZENDO?' },
            { nome: 'Siegel', fala: 'PESSOAS ESTÃO MORRENDO, VOCÊ ENTENDE? PESSOAS.' },
            { nome: 'Siegel', fala: 'Eu QUASE MORRI TENTANDO DESCOBRIR O QUE ESTAVA ACONTECENDO.' },
            { nome: 'Siegel', fala: 'SÓ PARA NO FINAL SER UM SURTO SEU DE UM LUTO QUE VOCÊ NÃO CONSEGUE SEGUIR EM FRENTE??' },
            { nome: 'Gerwald', fala: 'Eu…' },
            { nome: 'Siegel', fala: 'NEM TENTE SE JUSTIFICAR, EU VOU DESTRUIR ISSO.' },
            { nome: 'Gerwald', fala: 'NÃO, POR FAVOR, SIG, ME ESCUTE!' },
            { nome: 'Siegel', fala: 'ESCUTAR? UM LOUCO? HAHAHA! VOCÊ ESTÁ PARECENDO UMA CRIANÇA FAZENDO ISSO, SEU DOENTE!' },
            { nome: 'Gerwald', fala: 'EU ESTOU FAZENDO ISSO POR NÓS, EU VOU CONSEGUIR TRAZER ELA DE VOLTA.' },
            { nome: 'Gerwald', fala: 'APENAS PRECISO AJUSTAR ALGUMAS COISAS E TUDO VAI FUNCIONAR PERFEITAMENTE.' },
            { nome: 'Siegel', fala: 'CALE A BOCA!' },
            { nome: '', fala: 'Siegel entra em uma luta corporal com seu pai pela orbe, mas como Siegel estava exausto, com uma simples magia seu pai consegue jogá-lo para longe e então Gerwald, com o orbe, sobe as escadas do porão.' },
            { nome: 'Siegel', fala: 'PAI, NÃO FAÇA ISSO, PARE COM ESSA COISA!!' },
            { nome: '', fala: 'Siegel então sobe as escadas do porão e vê a porta da sala aberta, lá estavam seus amigos confusos com o que estava acontecendo.' },
            { nome: 'Siegel', fala: 'PAREM ELE!!' },
            { nome: 'Aiko', fala: 'Siegel, o que houve?' },
            { nome: 'Siegel', fala: 'ELE... A ORBE QUE ELE ESTÁ NA MÃO CRIOU ESSE PORTAL! PAREM ELE!!' },
            { nome: '', fala: 'Então, o grupo cerca Gerwald no meio da vila.' },
            { nome: 'Gerwald', fala: 'Vocês... VOCÊS NÃO ENTENDEM! EU ESTAVA QUASE LÁ! ISSO FOI... UM IMPREVISTO, APENAS ISSO. EU VOU CONSERTAR.' },
            { nome: 'Archibald', fala: 'Mas o que você está falando? O que diabos está acontecendo?' },
            { nome: 'Siegel', fala: 'NÃO ESCUTEM ELE!! ELE ENLOUQUECEU E NÃO VÊ QUE ESTÁ MATANDO PESSOAS COM ISSO.' },
            { nome: '', fala: 'Então Siegel vai na frente em direção a Gerwald para tentar tomar o orbe, o grupo segue logo atrás, mas…' },
            { nome: 'Gerwald', fala: 'NÃO! EU VOU TRAZÊ-LA DE VOLTA E VOCÊS NÃO VÃO ME IMPEDIR!!' },
            { nome: '', fala: 'Gerwald concentra toda sua energia no orbe e ele fica vermelho. Uma forte chama ardente joga Siegel e todo o grupo para trás.' },
            { nome: '', fala: 'Gerwald aos poucos se transforma numa gigante vermelha, uma besta em frenesi aparentemente sem mais humanidade em seu ser, apenas os sentimentos mais bestiais.' },
            { nome: '', fala: 'O monstro que Gerwald se tornou começa a destruir a vila.' },
            { nome: 'Siegel', fala: 'PAAAI!' },
            { nome: 'Matthew', fala: 'Cuidado pessoal, se afastem!' },
            { nome: 'Archibald', fala: 'Se juntem! Precisamos derrotá-lo ou o pior vai acontecer.' }
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

        if (this.indexDialogo === 23) {
            this.trocarFundoParasala();
        }

        if (this.indexDialogo === 35) {
            this.trocarFundoParaDiario();
        }

        if (this.indexDialogo === 51) {
            this.trocarFundoParaporao_um();
        }

        if (this.indexDialogo === 54) {
            this.trocarFundoParaporao_dois();
        }

        if (this.indexDialogo === 68) {
            this.trocarFundoParaescada();
        }

        if (this.indexDialogo === 73) {
            this.trocarFundoParaCerco();
        }

        if (this.indexDialogo === 79) {
            this.trocarFundoParaCapeta();
        }
    }

    trocarFundoParasala() {
        const novoFundo1 = this.add.image(0, 0, 'cena_sala').setOrigin(0).setAlpha(0).setDepth(-1);

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

    trocarFundoParaDiario() {
        const novoFundo2 = this.add.image(0, 0, 'diario').setOrigin(0).setAlpha(0).setDepth(-1);

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

    trocarFundoParaporao_um() {
        const novoFundo3 = this.add.image(0, 0, 'porao').setOrigin(0).setAlpha(0).setDepth(-1);

        this.tweens.add({
            targets: novoFundo3,
            alpha: 1,
            duration: 1000,
            onComplete: () => {
                if (this.fundoAtual) this.fundoAtual.destroy();
                this.fundoAtual = novoFundo3;
            }
        });
    }

    trocarFundoParaporao_dois() {
        const novoFundo4 = this.add.image(0, 0, 'porao_2').setOrigin(0).setAlpha(0).setDepth(-1);

        this.tweens.add({
            targets: novoFundo4,
            alpha: 1,
            duration: 1000,
            onComplete: () => {
                if (this.fundoAtual) this.fundoAtual.destroy();
                this.fundoAtual = novoFundo4;
            }
        });
    }

    trocarFundoParaescada() {
        const novoFundo5 = this.add.image(0, 0, 'perseguicao').setOrigin(0).setAlpha(0).setDepth(-1);

        this.tweens.add({
            targets: novoFundo5,
            alpha: 1,
            duration: 1000,
            onComplete: () => {
                if (this.fundoAtual) this.fundoAtual.destroy();
                this.fundoAtual = novoFundo5;
            }
        });
    }

    trocarFundoParaCerco() {
        const novoFundo6 = this.add.image(0, 0, 'cerco').setOrigin(0).setAlpha(0).setDepth(-1);

        this.tweens.add({
            targets: novoFundo6,
            alpha: 1,
            duration: 1000,
            onComplete: () => {
                if (this.fundoAtual) this.fundoAtual.destroy();
                this.fundoAtual = novoFundo6;
            }
        });
    }

    trocarFundoParaCapeta() {
        const novoFundo7 = this.add.image(0, 0, 'capeta').setOrigin(0).setAlpha(0).setDepth(-1);

        this.tweens.add({
            targets: novoFundo7,
            alpha: 1,
            duration: 1000,
            onComplete: () => {
                if (this.fundoAtual) this.fundoAtual.destroy();
                this.fundoAtual = novoFundo7;
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
            this.scene.start("BattleScene_FinalBoss");
        });
    }
    shutdown() {
        if (this.cena_boss && this.cena_boss.isPlaying) {
            this.cena_boss.stop();
            this.cena_boss.destroy();
        }
    }
    init() {
        this.events.on('shutdown', this.shutdown, this);
    }
}