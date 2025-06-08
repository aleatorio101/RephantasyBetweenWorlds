
export default class Final2Scene extends Phaser.Scene {
    constructor() {
        super({ key: 'Final2Scene' });
    }

    preload() {
        this.load.image('bad_ending', 'assets/backgrounds/bad_ending.png');
        this.load.image('fim_batalha', 'assets/backgrounds/fim_batalha.png');

    }


    create() {
        this.badending = this.sound.add('badending', { loop: true, volume: 0.5 });
        this.badending.play();
        this.fundoAtual = this.add.image(0, 0, 'fim_batalha').setOrigin(0, 0).setDepth(-1);

        this.dialogos = [
            { nome: 'Aiko', fala: 'E-eu… acho que não deveríamos destruir o orbe… tambem acho esse mundo mais legal…' },
            { nome: 'Matthew', fala: 'Então é isso.. Vamos ficar então..' },
            { nome: 'Archibald', fala: 'Que bom.. eu acho…' },
            { nome: '', fala: 'O grupo então toma a decisão de não destruir a orbe. Meses e Anos se passam, eles vão ficando mais fortes, tão fortes que agora fazem parte do exercito de elite do país de Almandia combatendo as criaturas que continuam saindo do portal, mas a curta paz entre Almandina e Auror se desfaz por causa da calamidade do portal e entao os mais novos guerreiros tambem enfrentam o império.' },
            { nome: '', fala: 'A vila de Lara foi totalmente abandonada, e pessoas tanto de Almandia e Auror estao sendo atacadas e mortas com a cada vez maior infestação das criaturas do outro mundo.. FIM.' }

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

        if (this.indexDialogo === 3) {
            this.trocarFundoParabadending();
        }
    }

    trocarFundoParabadending() {
        const novoFundo1 = this.add.image(0, 0, 'bad_ending').setOrigin(0).setAlpha(0).setDepth(-1);

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
            this.scene.start("CreditsScene");
        });
    }
    shutdown() {
        if (this.badending && this.badending.isPlaying) {
            this.badending.stop();
            this.badending.destroy();
        }
    }
    init() {
        this.events.on('shutdown', this.shutdown, this);
    }
}