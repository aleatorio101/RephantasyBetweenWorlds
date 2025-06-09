# Rephantasy: Between Worlds

Rephantasy: Between Worlds é um jogo de RPG 2D em pixel art, construído com o framework [Phaser](https://phaser.io/). Explore florestas mágicas, cavernas misteriosas, salas escondidas e vilas encantadas enquanto controla seu herói por entre dois mundos em colisão.

## 🎮 Funcionalidades

- ✅ Múltiplos mapas com colisões (floresta, vila, cavernas, sala, quarto)
- ✅ Personagem controlável com animações
- ✅ Sistema de pausa com menu
- ✅ Navegação entre cenas (menu, jogo, créditos)
- ✅ Tilemaps criados no [Tiled](https://mapeditor.org)
- ✅ Telas responsivas e integração com câmera

## 🎮 Como jogar
- Movimentação pelo mapa usando as setad do teclado
- No menu de combate, use as setas superior e inferior para movimentar pelo menu, espaço para selecionar, shift para voltar pelo menu de combate, setas laterais para mudar de alvo.
- No menu principal, use as setas superior e inferior para movimentar pelo menu e espaço para selecionar.
- Precione ESC no mapa para pausar.

## 📁 Estrutura do Projeto

- **assets/**: Imagens, spritesheets, tilesets, áudios e outros recursos do jogo.
- **src/entities/**: Definição dos personagens, party e lógica de atributos.
- **src/mov/**: Utilitários de animação (ex: criação de animações do personagem).
- **src/scenes/**: Todas as cenas do jogo (menu, mapas, batalha, etc).
- **src/ui/**: Componentes de interface, como overlays de pausa.
- **index.html**: Arquivo principal HTML.
- **main.js**: Inicialização do Phaser e configuração do jogo.
- **README.md**: Documentação do projeto.
