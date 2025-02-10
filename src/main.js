

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    physics:{
        default: "arcade",
        arcade: {
            deubg: false
        }
    },
    scene: [Menu, Play, GameOver, Credits]
}


let game = new Phaser.Game(config)
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3


