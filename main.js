

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

function init() {
    console.log('Game started!')

    Game.setup('game_area')
}
