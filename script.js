const select = document.getElementById('select');
const startNext = document.getElementById('start');
const word = document.getElementById('word');
const question1 = document.getElementById('question1');
const question2 = document.getElementById('question2');
const question3 = document.getElementById('question3');
const question4 = document.getElementById('question4');
const img = document.getElementById('img');
const score = document.getElementById('num_score');
let dict;
let lang = 'EnCn';
let randomized;
let shuffled;
let num = 0;
//Check game language
select.addEventListener('change', (e) => {
  lang = e.target.value;
});
//Identify answers and questions
const distrubute = () => {
  randomized = randomItems(dict);
  shuffuled = shuffleItems(randomized);
  word.innerText = randomized[0].source;
  locate(randomized, shuffuled);
};
//Request selected language from server
const getDict = (callback) => {
  fetch(`http://127.0.0.1:5000/Dict/${lang}`)
    .then((res) => res.json())
    .then((data) => {
      dict = data;
      resetBorders();
      disableClick([startNext]);
      enableClick([question1, question2, question3, question4]);

      callback();
    });
};
// Events
startNext.addEventListener('click', () => getDict(distrubute));
question1.addEventListener('click', () =>
  answer(question1, question1, question2, question3, question4, randomized)
);
question2.addEventListener('click', () =>
  answer(question2, question1, question2, question3, question4, randomized)
);
question3.addEventListener('click', () =>
  answer(question3, question1, question2, question3, question4, randomized)
);
question4.addEventListener('click', () =>
  answer(question4, question1, question2, question3, question4, randomized)
);
//Function to run when answered
const answer = (
  question,
  question1,
  question2,
  question3,
  question4,
  randomized
) => {
  disableClick([question1, question2, question3, question4]);
  enableClick([startNext]);

  const quests = [question1, question2, question3, question4];

  if (randomized[0].target == question.innerText) {
    question.style.borderColor = 'green';
    score.innerText = +score.innerText + 1;
  } else {
    num++;
    img.setAttribute('src', `./images/${num}.png`);
    question.style.borderColor = 'red';
    const result = quests.filter(
      (quest) => quest.innerText == randomized[0].target
    );
    result[0].style.borderColor = 'green';
    if (+score.innerText > 0) {
      score.innerText = +score.innerText - 1;
    }
    console.log(num);
    if (num > 6) {
      num = 0;
      score.innerText = +score.innerText - 5;
    }
  }
};
// Get random 4 words
const randomItems = (data) => {
  let word = [];
  for (let i = 0; word.length < 4; i++) {
    let r = Math.floor(Math.random() * data.length) + 1;
    if (word.indexOf(r) === -1) word.push(data[r]);
  }
  return word;
};
// Shuffle words
const shuffleItems = (array) =>
  array
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);

const locate = (randomized, shuffled) => {
  word.innerText = randomized[0].source;
  question1.innerText = shuffled[0].target;
  question2.innerText = shuffled[1].target;
  question3.innerText = shuffled[2].target;
  question4.innerText = shuffled[3].target;
};
const resetBorders = () => {
  question1.style.borderColor = 'black';
  question2.style.borderColor = 'black';
  question3.style.borderColor = 'black';
  question4.style.borderColor = 'black';
};
const disableClick = (divId) => {
  divId.forEach((element) => (element.style.pointerEvents = 'none'));
};
const enableClick = (divId) => {
  divId.forEach((element) => (element.style.pointerEvents = 'auto'));
};
