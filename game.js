import { SNAKE_SPEED, update as updateSnake, draw as drawSnake, getSnakeHead, snakeIntersection } from './snake.js'
import { update as updateFood, draw as drawFood } from './food.js'
import { outsideGrid } from './grid.js'

let lastRenderTime = 0
let gameOver = false
const gameBoard = document.getElementById('main-board')

function main(currentTime) {
    if (gameOver) {
        // const gameOver = document.querySelector('#gameover-text')
        // const playAgain = document.querySelector('#playAgain')
        // gameOver.style.display = "block"
        // playAgain.style.display = "block"

        if (confirm('GAME OVER! 🥶\nTry again by pressing OK.')) {
            window.location = 'https://matint-sa.github.io/Snake-Game-Pure-JS/'
        }
        return
    }


    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return

    lastRenderTime = currentTime

    update()
    draw()
}

window.requestAnimationFrame(main)

function update() {
    updateSnake()
    updateFood()
    checkDeath()
}

function draw() {
    gameBoard.innerHTML = ''
    drawSnake(gameBoard)
    drawFood(gameBoard)
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}
