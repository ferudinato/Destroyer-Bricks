

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

        if (this.posY+this.radius > Game.canvas.height || this.posY-this.radius < 0)
            this.dy = -this.dy

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

    this.draw = function() {
        Game.context.fillStyle = 'black'
        Game.context.fillRect(this.posX, this.posY, this.width, this.height)
    }

    this.render = function() {
        this.draw()

        //console.log('left side: '+this.posX+'  right side: '+(this.posX+this.width))
        if ( this.posX + this.width <= Game.canvas.width + 30 && this.posX >= -30 ) {
            if (this.right)
                this.posX += this.dx

            if (this.left)
                this.posX -= this.dx
        }

        if (this.posX < -30)
            this.posX = this.posX + 5

        if (this.posX+this.width > Game.canvas.width + 30)
            this.posX = this.posX - 5

    }
}


function init() {
    console.log('Game started!')

    Game.setup('game_area')

    Player = new Player(10, Game.canvas.height - 30, 120, 15)
    Ball = new Ball(10, 10, '#07870E')

    document.addEventListener('keydown', (evt) => Player.move(evt, 'down'), false)
    document.addEventListener('keyup', (evt) => Player.move(evt, 'up'), false)

    render()
}


function render() {
    
}
