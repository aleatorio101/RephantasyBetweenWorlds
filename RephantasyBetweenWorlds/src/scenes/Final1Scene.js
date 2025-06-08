
export default class Final1Scene extends Phaser.Scene {
    constructor() {
        super({ key: 'Final1Scene' });
    }

    init(data) {
        // Aqui você pode passar dados se quiser futuramente
    }

    preload() {
        this.load.image('Final_2_aiko', 'assets/backgrounds/Final_2_aiko.png');
        this.load.image('Final_2_archibald', 'assets/backgrounds/Final_2_archibald.png');
        this.load.image('final_2_mathhew', 'assets/backgrounds/final_2_mathhew.png');
        this.load.image('fim_batalha', 'assets/backgrounds/fim_batalha.png');
        // Pré-carregue sua música aqui se quiser
        // this.load.audio('musicaIntro', 'caminho/para/musica.mp3');
    }


    create() {
        this.guudending = this.sound.add('guudending', { loop: true, volume: 0.5 });
        this.guudending.play();
        this.fundoAtual = this.add.image(0, 0, 'fim_batalha').setOrigin(0, 0).setDepth(-1);

        // Música de fundo
        // this.musica = this.sound.add('musicaIntro', { loop: true, volume: 0.5 });
        // this.musica.play();

        // Diálogos: [{nome, fala}]
        this.dialogos = [
            { nome: 'Aiko', fala: 'E-eu… acho que deveriamos destruir o orbe.' },
            { nome: 'Aiko', fala: 'Sim nossas vidas sao mais chatas do que pode ser aqui.. porem é injusto com esse mundo sofrer deste mal por egoísmo nosso.' },
            { nome: 'Aiko', fala: 'Nao pertencemos a este lugar, devemos aprender a conviver com as armaguras da vida e seguir em frente.' },
            { nome: 'Matthew', fala: '…' },
            { nome: 'Archibald', fala: 'V-voce… voce está certa, me desculpe Aiko por ter pensado nisso.' },
            { nome: 'Matthew', fala: 'É, desculpa Aiko por ter concordado.' },
            { nome: '', fala: 'O grupo entao junta suas forças e juntos destroem o orbe. O portal no ceu desaparece.' },
            { nome: 'Archibald', fala: 'HAHA CONSEGUIMOS!!!' },
            { nome: 'Siegel', fala: 'Acabou.. finalmente..' },
            { nome: 'Aiko', fala: 'Forca Siegel, voce também precisa seguir em frente.' },
            { nome: '', fala: 'Os 3 habitantes do outro mundo notam que estao desaparecendo aos poucos, suas maos e pés se tornam transparentes aos poucos e assim acontece com seus corpos por inteiro, até que todos sumiram sobrando apenas Siegel.' },
            { nome: '', fala: 'Por serem de eras diferentes, trabalhar com questoes de tempo é confuso, mas Archibald, ao voltar para seu mundo, retorna ao campo de batalha da ultima vez, vê vários corpos mortos mas.' },
            { nome: '', fala: 'Ao inves de se entregar para o desespero, ele ergue a cabeca e tenta superar seus traumas, e sua vida seguiu assim, conseguiu formar outra familia nos proximos anos, e tempos de paz vieram para o reino.' },
            { nome: '', fala: 'Matthew, volta para seu quarto, que era onde estava quando vou teletransportado. Ele se belisca para averiguar se tudo aquilo era real, e ao confirmar que era, ficou com as licoes que aprendeu na aventura do outro mundo em sua cabeca, e aprendeu que sucesso na vida nao se baseia em grandes ideais, mas sim nas pequenas conquistas.' },
            { nome: '', fala: 'E Aiko… voltou para sua casa da mesma maneira que os outros. Nos proximos dias, o que havia lhe ocorrido nao saia de sua cabeca, e ficou pensando nisso o tempo todo. Um dia, quando foi dormir ela teve um sonho, seu sonho foi uma visao.' },
            { nome: '', fala: 'Essa visao, foi os seus ultimos momentos no outro mundo, estava tudo acontecendo como tinha ocorrido, mas algo diferente aconteceu, a voz que ela tinha ouvido da orbe, agora ela conseguia compreender o que havia dizido.' },
            { nome: '???', fala: '*risada calma* Eu sabia que vocês iriam conseguir.' },
            { nome: '???', fala: 'Afinal, eu não escolhi qualquer um, vocês eram os melhores.' },
            { nome: '???', fala: 'Ó querido.. eu sempre estive torcendo para que você conseguisse continuar sem mim… Você escolheu o caminho da corrupção, por desespero e egoísmo, colocou todos em perigo.' },
            { nome: '???', fala: 'Mas agora está tudo bem, poderemos ficar juntos novamente..' },
            { nome: '???', fala: 'Meu caro Sig, por favor, nao siga os passos de seu pai. Eu sei que voce consegue seguir em frente, voce é forte e resistente.' },
            { nome: '???', fala: 'Peço desculpas por ter necessitado de voces para resolver está terrivel calamidade.' },
            { nome: '???', fala: 'Agora vao, voltem para seus mundos, aproveitem suas vidas. E me libertem desta terrivel prisao da qual me foi colocada.' },
            { nome: '???', fala: 'E obrigado *risada calma* meus herois!, e obrigado.. sig..' },
            { nome: '', fala: 'Fim.' }

        ];
        this.indexDialogo = 0;

        this.nomeTexto = this.add.text(50, 450, '', {
            fontSize: '18px',
            fill: '#ffaa55',
            fontFamily: 'serif'
        });
        this.falaTexto = this.add.text(50, 480, '', {
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
        this.nomeTexto.setText(dialogo.nome);
        this.falaTexto.setText(dialogo.fala);

        if (this.indexDialogo === 11) {
            this.trocarFundoParaarchibald();
        }

        if (this.indexDialogo === 13) {
            this.trocarFundoParamatthew();
        }

        if (this.indexDialogo === 14) {
            this.trocarFundoParaAiko();
        }
    }

    trocarFundoParaarchibald() {
        const novoFundo1 = this.add.image(0, 0, 'Final_2_archibald').setOrigin(0).setAlpha(0).setDepth(-1);

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

    trocarFundoParamatthew() {
        const novoFundo2 = this.add.image(0, 0, 'final_2_mathhew').setOrigin(0).setAlpha(0).setDepth(-1);

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

    trocarFundoParaAiko() {
        const novoFundo3 = this.add.image(0, 0, 'Final_2_aiko').setOrigin(0).setAlpha(0).setDepth(-1);

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
        // this.musica.stop(); // Para a música se estiver tocando
        this.cameras.main.fadeOut(1000, 0, 0, 0);
        this.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.start("CreditsScene");
        });
    }
    shutdown() {
        if (this.guudending && this.guudending.isPlaying) {
            this.guudending.stop();
            this.guudending.destroy();
        }
    }
    init() {
        this.events.on('shutdown', this.shutdown, this);
    }
}