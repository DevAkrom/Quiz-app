const input = document.querySelector('.input')
const form = document.querySelector('form')
const saveBtn = document.querySelector('.btn')
const finalScore = document.querySelector('.title')
const mostRecentScore = localStorage.getItem('mostRecentScore')

finalScore.innerText = mostRecentScore

const highScores = JSON.parse(localStorage.getItem('highScores'))|| []
console.log(highScores)


form.addEventListener('submit', function(e){
    e.preventDefault()
    let score = {
        score:mostRecentScore,
        name:input.value
    }

    highScores.push(score)
    highScores.sort((a,b)=> b.score - a.score)
    console.log(highScores)
    highScores.splice(5)

    localStorage.setItem('highScores',JSON.stringify(highScores))
    window.location.assign('./quiz.html')
    console.log(localStorage)
})

input.addEventListener('keyup', function(){
    saveBtn.disabled = !input.value
})
