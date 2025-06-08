export default class PosFinalBossScene extends Phaser.Scene {
    constructor() {
        super('PosFinalBossScene');
    }

    preload() {
        this.load.image('fim_batalha', 'assets/backgrounds/fim_batalha.png');
    }

    create() {
        this.cenas_music = this.sound.add('cenas_music', { loop: true, volume: 0.5 });
        this.cenas_music.play();
        this.fundoAtual = this.add.image(0, 0, 'fim_batalha').setOrigin(0, 0).setDepth(-1);

        this.canChooseEnding = false;

        this.dialogos = [
            { fala: 'O grupo consegue, com muito suor, derrotar Gerwald. Mas ele não resiste ao esforço que fez para se transformar naquele monstro, e acaba morrendo ali mesmo.' },
            { nome: 'Siegel', fala: '*Choro* Por quê…' },
            { fala: 'O grupo então tenta consolar Siegel. Após alguns minutos conversando com ele e esclarecendo tudo que havia ocorrido, eles notam o orbe mudar de cor para uma radiante luz branca.' },
            { fala: 'Aiko segura o orbe e diz:' },
            { nome: 'Aiko', fala: 'Então… foi isso que causou tudo?' },
            { nome: 'Siegel', fala: 'Sim…' },
            { nome: 'Matthew', fala: 'Então… vamos destruí-lo agora?' },
            { fala: 'Eis que então, Siegel, desolado, desiste completamente de tudo e fala:' },
            { nome: 'Siegel', fala: 'Honestamente, eu… eu não me importo mais com o que vai acontecer daqui em diante… façam o que quiserem.' },
            { nome: 'Aiko', fala: '…' },
            { nome: 'Archibald', fala: 'Aiko, espere… olha, não é querendo ser maluco, mas… devemos realmente destruí-lo?' },
            { nome: 'Matthew', fala: 'Como assim? Você está maluco!' },
            { nome: 'Archibald', fala: 'Espera, me escuta. A minha vida normal… ela não está nada boa… eu perdi minha família para uma doença, e meu reino está numa guerra infernal… e eu… eu não aguento mais aquela vida. Aqui eu tenho mais força que o normal, o mundo aqui é mais vibrante. Eu sinto que… aqui posso começar uma vida nova…' },
            { nome: 'Matthew', fala: 'Pensando assim… realmente, aqui é bem mais interessante do que… sabe… o mundo normal…' },
            { fala: 'Aiko então escuta uma voz estranha dentro de sua cabeça.' },
            { nome: 'Aiko', fala: 'Vocês escutaram isso?' },
            { nome: 'Archibald', fala: 'Isso o quê?' },
            { nome: 'Aiko', fala: 'Uma voz… parece que vem do orbe… é estranho, mas eu não estou conseguindo entender o que está falando…' },
            { fala: 'Aiko continua ouvindo a voz em sua cabeça. Mesmo sem entender o que ela diz, sente algo… como se fosse um conselho.' },
            { nome: 'Aiko', fala: 'E-eu….' }
        ];

        this.indexDialogo = 0;
        this.canChooseEnding = false;

        // Criar textos para nome e fala
        this.nomefala = this.add.text(50, 450, '', { fontSize: '18px', fill: '#ffaa55', fontFamily: 'serif' });
        this.falafala = this.add.text(50, 480, '', { fontSize: '22px', fill: '#ffffff', fontFamily: 'serif', wordWrap: { width: 700 } });

        // Mostrar o primeiro dialogo
        this.mostrarDialogo(this.dialogos[this.indexDialogo]);

        // Captura do teclado
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Listener para avançar dialogo ou confirmar escolha
        this.input.keyboard.on('keydown-SPACE', () => {
            if (this.canChooseEnding) {
                this.selecionarFinal();
            } else {
                // Avança diálogo
                this.indexDialogo++;
                if (this.indexDialogo >= this.dialogos.length) {
                    this.mostrarOpcoesFinais();
                } else {
                    this.mostrarDialogo(this.dialogos[this.indexDialogo]);
                }
            }
        });
    }

    mostrarDialogo(dialogo) {
        this.nomefala.setText(dialogo.nome);
        this.falafala.setText(dialogo.fala);
    }

    mostrarOpcoesFinais() {
        // Oculta os textos de diálogo
        this.nomefala.setVisible(false);
        this.falafala.setVisible(false);

        this.finalOptions = ['Destruir o orbe', 'Não destruir o orbe'];
        this.selectedOption = 0;
        this.optionTexts = [];

        // Mostrar opções na tela
        this.finalOptions.forEach((option, index) => {
            const text = this.add.text(400, 300 + index * 40, option, {
                fontSize: '20px',
                fill: '#888888'
            }).setOrigin(0.5);
            this.optionTexts.push(text);
        });

        this.updateOptionHighlight();
        this.canChooseEnding = true;
    }

    updateOptionHighlight() {
        this.optionTexts.forEach((text, index) => {
            text.setStyle({
                fill: index === this.selectedOption ? '#ffffff' : '#888888',
                backgroundColor: index === this.selectedOption ? '#444444' : null,
            });
        });
    }

    selecionarFinal() {
        if (this.selectedOption === 0) {
            this.scene.start('Final1Scene');
        } else {
            this.scene.start('Final2Scene');
        }
    }

    update() {
        if (!this.canChooseEnding) return;

        if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
            this.selectedOption = (this.selectedOption - 1 + this.finalOptions.length) % this.finalOptions.length;
            this.updateOptionHighlight();
        }
        else if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
            this.selectedOption = (this.selectedOption + 1) % this.finalOptions.length;
            this.updateOptionHighlight();
        }
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