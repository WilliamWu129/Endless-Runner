/*
William Wu
Through the Skies
17 hours
Creative Tilt
I kinda like my art for the Aircraft that I made, never really drew before 
so it looked pretty good for that, music I just searched online for free songs and came
across something that fit a intense escape format 
For something interesting I thought of endless runner games and came across jetpack Joyride and took 
inspiration from it, used couple of in class assignments as a basis
reinforced my learning from that.  
*/

let config = {
    type: Phaser.AUTO,
    width: 720,
    height: 560,
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


