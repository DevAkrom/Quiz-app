const question = document.querySelector('.question')
const options = document.querySelectorAll('.textOption')
const questionNumber = document.querySelector('.smaller')
const bonus = document.querySelector('.score-index')
const progressBar  = document.querySelector('.howFull')
const spinner = document.querySelector('.circle')
const main = document.querySelector('main')


const correctBonus = 10
let maxQuestions =0

let currentQuestion = {}
let score  = 0
let questionCounter = 0;
let availableQuestions = []
let questions = []
fetch('https://opentdb.com/api.php?amount=20&category=21&difficulty=easy&type=multiple')
    .then((res)=>{
        return res.json()
    })
    .then((loadedQuestions)=>{
        questions = loadedQuestions.results.map((loadedQuestion)=>{
            const formattedQuestion = {
                question: loadedQuestion.question
            }

            const answerChoices = [...loadedQuestion.incorrect_answers];

            formattedQuestion.answer = Math.floor(Math.random()*3)+1;
            answerChoices.splice(formattedQuestion.answer-1, 0, loadedQuestion.correct_answer)

            answerChoices.forEach((answer, index)=>{
                formattedQuestion['choice'+(index+1)] = answer
            })
            console.log(formattedQuestion)

            return formattedQuestion
        })
        start()
    })
    .catch((er)=>{
        console.log(er)
    })



function start(){
    score  = 0
    questionCounter = 0
    availableQuestions = [...questions]
    maxQuestions = availableQuestions.length
    GetNewQuestion()
    spinner.classList.add('hidden')
    main.classList.remove('hidden')
}



function GetNewQuestion(){
    if(availableQuestions.length === 0 || questionCounter>=maxQuestions){
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('./end.html')
    }
    questionCounter++
    questionNumber.innerText = ` Question: ${questionCounter}/${maxQuestions}`
    progressBar.style.width = `${(questionCounter/maxQuestions *100)}%`
    let questionIndex = Math.floor(Math.random()*availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex]
    question.innerText = currentQuestion.question

    options.forEach(option =>{
        const dataNb = option.dataset['number']
        option.innerText = currentQuestion['choice'+ dataNb]
    })

    availableQuestions.splice(questionIndex,1)
}

options.forEach(option=>{
    
    option.addEventListener('click', function(e){
        let selectedL = e.target
        const parent = selectedL.parentElement.parentElement
        const childrem = parent.children
        selectedL = selectedL.dataset['number']
        let classToApply = selectedL == currentQuestion.answer ? 'correct': 'incorrect'
        if(classToApply === 'correct'){
            increment(correctBonus)
        }
        option.classList.add(classToApply)
        
        setTimeout(() => {6
            option.classList.remove(classToApply)
            GetNewQuestion()
        }, 1000);
        
    })
})

function increment(num){
    score += num
    bonus.innerText = score
}

