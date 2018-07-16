var bricksField = []
var bricksColumns = 6
var bricksRows = 3

var playerPaddleWidth = 120
var playerPaddleHeight = 15


const randomColors = [
    '#0ACC16', '#FF0DCC', '#A1843F', '#42B4FF', '#000'
]


var Game = {
    canvas: '',
    context: '',
    setup: function(tag) {
        this.canvas = document.getElementById(tag)
        this.context = this.canvas.getContext('2d')
    },
    setupBackground: function(color) {
        this.context.fillStyle = color
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
    },
    clearScreen: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
}

var Brick = function(color) {
    this.posX       = 0
    this.posY       = 0
    this.width      = 75
    this.height     = 20

    this.status     = true
    this.color      = color

    this.offsetLeft     = 60
    this.offsetTop      = 40
    this.paddingRight   = 5

    this.draw = function() {
        Game.context.fillStyle = this.color
        Game.context.fillRect(this.posX, this.posY, this.width, this.height)
    }

    this.render = function() {
        this.draw()
    }
}

var Ball = function(x, y, color) {
    this.posX   = x
    this.posY   = y
    this.radius = 10

    this.dx     = 3
    this.dy     = 3

    this.color  = color

    this.draw   = function() {
        Game.context.beginPath()
        Game.context.fillStyle = this.color
        Game.context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false)
        Game.context.fill()
    }

    this.render = function() {
        this.draw()

        if (this.posX+this.radius > Game.canvas.width || this.posX-this.radius < 0)
            this.dx = -this.dx

        if (this.posY-this.radius < 0)
            this.dy = -this.dy
        else if (this.posY+this.radius > Game.canvas.height) {
            alert('Juego terminado!')
            document.location.reload()
        }

        this.posX += this.dx
        this.posY += this.dy
    }
}

var Player = function(x, y, width, height) {
    this.posX   = x
    this.posY   = y
    this.width  = width
    this.height = height

    this.dx     = 5
    this.left   = false
    this.right  = false

    this.score  = 0

    this.move   = function(evt, keyevent) {
        var keydown = evt.keyCode

        if (keydown == 37) {
            if (keyevent == 'down')
                this.left = true
            else if (keyevent == 'up')
                this.left = false
        }

        if (keydown == 39) {
            if (keyevent == 'down')
                this.right = true
            else if (keyevent == 'up')
                this.right = false
        }
    }

    this.drawScore = function() {
        Game.context.font = '14px Arial'
        Game.context.fillStyle = '#0095DD'
        Game.context.fillText("Puntuacion: "+this.score, 8, 20)
    }

    this.draw = function() {
        Game.context.fillStyle = 'black'
        Game.context.fillRect(this.posX, this.posY, this.width, this.height)
    }

    this.render = function() {
        this.draw()
        this.drawScore()

        //console.log('left side: '+this.posX+'  right side: '+(this.posX+this.width))
        if ( this.posX + this.width <= Game.canvas.width + 30 && this.posX >= -30 ) {
            if (this.right)
                this.posX += this.dx

            if (this.left)
                this.posX -= this.dx
        }

        if (this.posX < -30)
            this.posX += 5

        if (this.posX+this.width > Game.canvas.width + 30)
            this.posX -= 5

    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function init() {
    console.log('Game started!')

    Game.setup('game_area')

    Player = new Player((Game.canvas.width - playerPaddleWidth) / 2,
                        Game.canvas.height - playerPaddleHeight,
                        playerPaddleWidth, playerPaddleHeight)

    Ball = new Ball(Game.canvas.width/2, Game.canvas.height/2, '#07870E')

    for (var i = 0; i < bricksColumns; i++) {
        bricksField[i] = []
        for (var j = 0; j < bricksRows; j++) {
            var br = new Brick( randomColors[getRandomInt(0, 4)] )
            bricksField[i][j] = br
        }
    }

    document.addEventListener('keydown', (evt) => Player.move(evt, 'down'), false)
    document.addEventListener('keyup', (evt) => Player.move(evt, 'up'), false)

    render()
}


function render() {
    Game.clearScreen()
    Game.setupBackground('#DBE0DE')

    Player.render()

    for (var i = 0; i < bricksColumns; i++) {
        for (var j = 0; j < bricksRows; j++) {
            var brick = bricksField[i][j]
            if (brick.status) {
                var brickX = (i * (brick.width + brick.paddingRight)) + brick.offsetLeft
                var brickY = (j * (brick.height + brick.paddingRight)) + brick.offsetTop
                brick.posX = brickX
                brick.posY = brickY
                brick.render()
            }
        }
    }

    Ball.render()

    for (var i = 0; i < bricksColumns; i++) {
        for (var j = 0; j < bricksRows; j++) {
            var b = bricksField[i][j]
            if (b.status && Ball.posX > b.posX && Ball.posX < b.posX+b.width &&
                Ball.posY > b.posY && Ball.posY < b.posY+b.height) {

                Ball.dy = -Ball.dy
                Ball.dx = -Ball.dx
                b.status = false
                Player.score++
            }

            if (Player.score == bricksRows * bricksColumns) {
                alert('Has ganado!')
                document.location.reload()
            }

        }
    }

    if ( (Ball.posX > Player.posX && Ball.posX < Player.posX+Player.width) &&
         (Ball.posY > Player.posY && Ball.posY < Player.posY+Player.height) ) {

        Ball.dy = -Ball.dy
    }

    requestAnimationFrame(render)
}
