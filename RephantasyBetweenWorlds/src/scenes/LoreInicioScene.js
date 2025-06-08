
export default class LoreInicioScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LoreInicioScene' });
    }

    create() {
        this.cenas_music = this.sound.add('cenas_music', { loop: true, volume: 0.5 });
         this.cenas_music.play();

        this.cameras.main.setBackgroundColor('#000000');

        // Música de fundo
        // this.musica = this.sound.add('musicaIntro', { loop: true, volume: 0.5 });
        // this.musica.play();

        // Diálogos: [{nome, fala}]
        this.dialogos = [
            { fala: 'Em um estranho mundo.' },
            { fala: 'Onde a magia encanta os ares.' },
            { fala: 'Havia um jovem guerrilheiro, seu nome era Siegel. Residente de Almandia, na vila de Lara' },
            { fala: 'Siegel, melhorando de seu trauma de ter perdido seu braco na guerra de Almandia e Auror a 7 anos, vivia com seu pai Gerwald ao qual os dois passavam por um luto. A perda da mae de Siegel, Videl.' },
            { fala: 'Em um dia aparentemente como qualquer outro… algo aconteceu…' }
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
            this.scene.start("QuartoScene");
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