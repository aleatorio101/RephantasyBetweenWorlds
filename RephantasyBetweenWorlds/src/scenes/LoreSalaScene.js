export default class LoreSalaScene extends Phaser.Scene {
    constructor() {
        super('LoreSalaScene');
    }

    preload() {
        this.load.image('cena_sala', 'assets/backgrounds/cena_sala.png');
    }

    create() {
        this.cenas_music = this.sound.add('cenas_music', { loop: true, volume: 0.5 });
        this.cenas_music.play();
        this.add.image(0, 0, 'cena_sala').setOrigin(0, 0).setDepth(-1);

        this.dialogos = [
            { nome: 'Gerwald', fala: 'Olha só, então ele não estava morto. Confesso que fiquei um pouco preocupado.' },
            { nome: 'Siegel', fala: 'Bom dia para você também.' },
            { nome: 'Siegel', fala: 'Acordou comediante hoje.' },
            { nome: 'Gerwald', fala: 'O que um bom café não faz.' },
            { fala: 'Silêncio momentâneo...' },
            { nome: 'Gerwald', fala: '...' },
            { nome: 'Gerwald', fala: 'Hoje fazem exatos 3 anos…' },
            { nome: 'Siegel', fala: '...' },
            { nome: 'Siegel', fala: 'Vai visitá-la hoje?' },
            { nome: 'Gerwald', fala: 'Talvez, ainda quero continuar produzindo meus projetos, então não sei…' },
            { nome: 'Siegel', fala: 'Até quando vai ficar enfurnado dentro daquele porão?' },
            { nome: 'Siegel', fala: 'Você precisa viver, vai acabar ficando ainda pior se continuar assim.' },
            { nome: 'Gerwald', fala: '*Risada cansada* Não se preocupe, logo as coisas vão melhorar…' },
            { nome: 'Siegel', fala: '…' },
            { fala: '“GRITOS” “RUGIDOS”' },
            { nome: 'Siegel', fala: 'O que foi isso?' },
            { nome: 'Gerwald', fala: 'Eu não faço ideia, mas foi bem aqui do lado.' }
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
        this.cameras.main.fadeOut(1000, 0, 0, 0);
        this.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.start("SalaScene");
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