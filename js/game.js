const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

let acertos = 0;
let loop;

const characters = [
  'faringe', 'narina', 'pulmao', 'traqueia', 'laringe',
  'diafragma', 'bronquio', 'alveolo', 'caixa',
];

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
};

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');
  if (disabledCards.length === 18) {
    var i = 15
    loop = setInterval(() => {
      i--;
      if (i == 0) {
        clearInterval(loop);
        const div = document.createElement('div');
        div.innerHTML = `PARABÉNS, ${spanPlayer.innerHTML}! Seu tempo foi de: ${200 - timer.innerHTML}s e você acertou ${acertos}/20`;
        div.className = 'div-centralizada';
        document.body.appendChild(div);
      }
    }, 1000); 
  }
};

const questions = [{
  question: "A traqueia apresenta um comprimento de:",
  options: ["10 a 20 centímetros", "20 a 25 centímetros", "12 a 20 centímetros", "9 a 13 centímetros"],
  correctAnswer: 3,
},
{
  question: "Qual é a função principal da traqueia no sistema respiratório?",
  options: ["Filtrar o ar inalado", "Conduzir o ar para os pulmões", "Produzir oxigênio", "Armazenar dióxido de carbono"],
  correctAnswer: 1,
},
{
  question: "Como ocorre a passagem do ar pela traqueia até os pulmões?",
  options: ["Por meio de pinocitose", "Por difusão através das membranas traqueais", " Por condução direta através dos alvéolos", "Por meio de um processo de ventilação pulmonar"],
  correctAnswer: 3,
},
{
  question: "As entradas da cavidade nasal são (1) e a saída (2). Que alternativa substitui os números corretamente?",
  options: ["(1) as Narinas e (2) as Conchas nasais", "(1) o Nariz e (2) o Septo Nasal", "(1) as Conchas Nasais e (2) os Seios Paranasais", "(1) as Narinas e (2) as Coanas"],
  correctAnswer: 3,
},
{
  question: "Onde localiza-se o epitélio olfatório?",
  options: ["Na parede da faringe", "No teto das cavidades nasais", "Nos anéis dos brônquios ", "Na parede da epiglote "],
  correctAnswer: 1,
},
{
  question: "No homem, o controle dos movimentos respiratórios é exercido: ",
  options: ["Pelo cérebro", "Pelo cerebelo", "Pelo bulbo", "Pela medula"],
  correctAnswer: 2,
},
{
  question: "Qual é a membrana que reveste internamente a caixa torácica e externamente os pulmões?",
  options: ["Arpericárdio", "Hilo", "Cápsula pulmonar", "Pleura"],
  correctAnswer: 3,
},
{
  question: "Sobre os pulmões, marque a alternativa INCORRETA:",
  options: ["Nos pulmões, ocorre o processo de hematose", "O pulmão é revestido por uma dupla membrana denominada de pleura", "O pulmão esquerdo é menor que o pulmão direito", "A pleura parietal e a visceral estão intimamente unidas"],
  correctAnswer: 3,
},
{
  question: "Os brônquios estão localizados na região inferior:",
  options: ["Do esôfago", "Da laringe", "Da faringe", "Da traqueia"],
  correctAnswer: 3,
},
{
  question: "Qual das seguintes alternativas NÃO representa uma função dos brônquios?",
  options: ["Condução do ar", "Aquecimento do ar", "Troca gasosa", "Umidificação do ar"],
  correctAnswer: 2,
},
{
  question: "A troca gasosa de oxigênio e gás carbônico nos alvéolos se faz:",
  options: ["Através de pinocitose", "Por diferença de tensão desses gases", "Através da associação desses gases com uma amenoproteina", "Pela ação de enzimas"],
  correctAnswer: 1,
},
{
  question: "As trocas gasosas ocorrem nos alvéolos pulmonares e são chamadas de:",
  options: ["Fagocitose.", "Hemólise.", "Hematose.", "Plasmólise."],
  correctAnswer: 2,
},
{
  question: "Durante a respiração, quando o diafragma se contrai e desce, o volume da caixa torácica aumenta, por conseguinte a pressão intrapulmonar: ",
  options: ["Diminui e facilita a entrada de ar", " Aumenta e facilita a entrada de ar", "Diminui e dificulta a entrada de ar", "Aumenta e dificulta a entrada de ar"],
  correctAnswer: 0,
},
{
  question: "A presença do diafragma muscular é característica:",
  options: ["Apenas dos mamíferos", "Dos répteis e dos mamíferos.", "Dos anfíbios e dos mamíferos.", "Nenhuma das anteriores"],
  correctAnswer: 0,
},
{
  question: "Quantas costelas compõe a caixa torácica?",
  options: ["12 pares", "13 pares", "10 pares", "9 pares"],
  correctAnswer: 0,
},
{
  question: "Qual dos órgãos a seguir não é protegido pela caixa torácica?",
  options: ["Pulmão", "Fígado", "Esôfago", "Coração"],
  correctAnswer: 1,
},
{
  question: "Na laringe, observam-se faixas elásticas de músculo que vibram ao passar o ar. Essa estrutura é denominada: ",
  options: ["Epiglote", "Glote", "Cartilagem crinoide", "Pregas vocais"],
  correctAnswer: 3,
},
{
  question: "A laringe é um importante órgão que conecta a faringe à traquéia e desempenha as funções respiratória e:",
  options: ["Digestória", "Fonatório", "Circulatório", "Nervosa"],
  correctAnswer: 1,
},
{
  question: "A faringe é um órgão que se abre: ",
  options: ["Apenas na laringe", "Apenas no esôfago", "A laringe e no esôfago", "Na traqueia e no estômago"],
  correctAnswer: 3,
},
{
  question: "Na faringe, percebe-se a presença de tecido linfoide subjacente ao epitélio, formando a (as):",
  options: ["Papilas gustativas", "Epiglote", "Glote", "Tonsilas"],
  correctAnswer: 3,
},
];

const checkCards = () => {
  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');

  if (firstCharacter === secondCharacter) {
    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');

    switch (firstCharacter) {
      case 'faringe':
        handleQuestion(questions[18]);
        handleQuestion(questions[19]);
        break;
      case 'narina':
        handleQuestion(questions[3]);
        handleQuestion(questions[4]);
        break;
      case 'laringe':
        handleQuestion(questions[16]);
        handleQuestion(questions[17]);
        break;
      case 'pulmao':
        handleQuestion(questions[5]);
        handleQuestion(questions[6]);
        handleQuestion(questions[7]);
        break;
      case 'bronquio':
        handleQuestion(questions[8]);
        handleQuestion(questions[9]);
        break;
      case 'caixa':
        handleQuestion(questions[14]);
        handleQuestion(questions[15]);
        break;
      case 'alveolo':
        handleQuestion(questions[10]);
        handleQuestion(questions[11]);
        break;
      case 'diafragma':
        handleQuestion(questions[12]);
        handleQuestion(questions[13]);
        break;
      case 'traqueia':
        handleQuestion(questions[0]);
        handleQuestion(questions[1]);
        handleQuestion(questions[2]);
        break;
    };
    firstCard = '';
    secondCard = '';

    checkEndGame();
  } else {
    setTimeout(() => {
      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');
      firstCard = '';
      secondCard = '';
    }, 500);
  }
};

const revealCard = ({ target }) => {
  if (target.parentNode.className.includes('reveal-card')) {
    return;
  }

  if (firstCard === '') {
    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;
  } else if (secondCard === '') {
    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;
    checkCards();
  }
};

let currentQuestionIndex = 0;

const loadNextQuestion = () => {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    const nextQuestion = questions[currentQuestionIndex];
    handleQuestion(nextQuestion);
  } else {
    console.log('Jogo concluído!');
  }
};

const handleQuestion = (question) => {
  const div = document.createElement('div');
  div.className = 'question-container';

  const title = document.createElement('p');
  title.className = 'question-title';
  title.innerHTML = question.question;
  div.appendChild(title);

  question.options.forEach(function (opcao, indice) {
    const option = document.createElement('p');
    option.className = 'question-option';
    option.innerHTML = opcao;
    option.addEventListener('click', function () {
      document.body.removeChild(div);

      if (indice == question.correctAnswer) {
        acertos++;
      
        // Define a cor de fundo como verde para a resposta correta
        option.style.backgroundColor = 'green';
        option.style.color = 'white';  // Pode ajustar a cor do texto conforme necessário
      
        let i = 1;
        const loop = setInterval(() => {
          i--;
          if (i == 0) {
            clearInterval(loop);
          }
        }, 1000);
      } else {
        // Lida com resposta incorreta, se necessário
      }
    });
    div.appendChild(option);
  });

  document.body.appendChild(div);
};

const createCard = (character) => {
  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');
  front.style.backgroundImage = `url('../images/${character}.png')`;
  card.appendChild(front);
  card.appendChild(back);
  card.addEventListener('click', revealCard);
  card.setAttribute('data-character', character);
  return card;
};

const loadGame = () => {
  const duplicateCharacters = [...characters, ...characters];
  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);
  shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });
};

const startTimer = () => {
  clearInterval(loop);
  timer.innerHTML = 200;

  loop = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime - 1;
    if (currentTime == 0) {
      clearInterval(loop);
      alert('O tempo acabou');
      timer.innerHTML = 0;
    }
  }, 1000);
};

window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem('player');
  startTimer();
  loadGame();
};

function resetTimer() {
  if (loop) {
    clearInterval(loop);
    alert('Temporizador resetado!');
  }
}

const toggleDivVisibility = ({ target }) => {
  const minhaDiv = document.getElementById('disabled');
  if (target.value.length > 3) {
    minhaDiv.style.display = 'block';
    return;
  }
  minhaDiv.style.display = 'none';
};

const resetGame = () => {
  clearInterval(loop);
  acertos = 0;
  currentQuestionIndex = 0;
  firstCard = '';
  secondCard = '';
  grid.innerHTML = '';
  loadGame();
  startTimer();

};