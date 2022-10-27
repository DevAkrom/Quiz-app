const scoreDisplay = document.querySelector('.score-display')
const ul = document.querySelector('.ul')

const highScores = JSON.parse(localStorage.getItem('highScores'))

highScores.map((el)=>{
    const li = document.createElement('li')
    li.classList.add('li')
    li.innerHTML = `${el.name} scored ${el.score}`
    ul.appendChild(li)
})
