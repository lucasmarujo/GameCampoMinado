# Campo Minado

Uma implementação moderna do clássico jogo Campo Minado, construído com React, TypeScript e Tailwind CSS.


## Funcionalidades

- 🎮 Três níveis de dificuldade: Fácil, Médio e Difícil
- 🏆 Sistema de pontuação alta com armazenamento local
- ⏱️ Cronômetro para acompanhar seu desempenho
- 🚩 Sistema de bandeira para marcar minas potenciais
- 💣 Proteção no primeiro clique (nunca acerte uma mina no primeiro clique)
- 🎨 UI bonita com animações suaves
- 📱 Design responsivo para todos os tamanhos de tela

## Como Jogar

1. Escolha um nível de dificuldade:
   - Fácil: grade 8x8 com 10 minas
   - Médio: grade 12x12 com 30 minas
   - Difícil: grade 16x16 com 50 minas

2. Controles do Jogo:
   - Clique Esquerdo: Revelar uma célula
   - Clique Direito: Colocar/Remover uma bandeira
   - O número em uma célula indica quantas minas estão nas células adjacentes
   - Marque todas as minas e revele todas as células seguras para vencer!

## Desenvolvimento

### Pré-requisitos

- Node.js 18 ou superior
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/lucasmarujo/campominado-PF.git
cd campominado-PF
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

### Construindo para Produção

Para criar uma build de produção:

```bash
npm run build
```

Os arquivos construídos estarão no diretório \`dist\`.

### Executando a Build de Produção

Para visualizar a build de produção localmente:

```bash
npm run preview
```

## Stack Técnica

- React 18
- TypeScript
- Tailwind CSS
- Vite
- Ícones Lucide

## Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── Board.tsx       # Lógica do tabuleiro do jogo
│   └── DifficultySelect.tsx
├── utils/              # Funções utilitárias
│   └── storage.ts      # Gerenciamento de pontuação alta
├── App.tsx             # Componente principal da aplicação
├── main.tsx            # Ponto de entrada da aplicação
└── index.css           # Estilos globais
```

## Contribuindo

1. Faça um fork do repositório
2. Crie sua branch de funcionalidade (`git checkout -b feature/AmazingFeature`)
3. Faça commit das suas alterações (`git commit -m 'Adicione alguma AmazingFeature'`)
4. Envie para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo LICENSE para detalhes.

## Agradecimentos

- Jogo original Campo Minado da Microsoft
- Ícones por Lucide React
- Inspiração de UI a partir de padrões modernos de design web
