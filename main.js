

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
}
