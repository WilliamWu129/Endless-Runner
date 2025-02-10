class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }

    create() {
        this.add.text(
            this.sys.game.config.width / 2,
            this.sys.game.config.height / 2 - 100,
            "Credits",
            {
                fontSize: "32px",
                fill: "#ffffff",
                fontFamily: "Arial",
            }
        ).setOrigin(0.5);

        this.add.text(
            this.sys.game.config.width / 2,
            this.sys.game.config.height / 2 - 30,
            "Game Design - William Wu",
            {
                fontSize: "15px",
                fill: "#ffffff",
            }
        ).setOrigin(0.5);

        this.add.text(
            this.sys.game.config.width / 2,
            this.sys.game.config.height / 2 - 10 ,
            "Visual Assets: William Wu",
            {
                fontSize: "15px",
                fill: "#ffffff",
            }
        ).setOrigin(0.5);
        
        
        this.add.text(
            this.sys.game.config.width / 2,
            this.sys.game.config.height / 2 + 10,
            "Audio Assets: Pixbay.com(Spinning Head) and Jsfxr website",
            {
                fontSize: "15px",
                fill: "#ffffff",
            }
        ).setOrigin(0.5);
        

        this.add.text(
            this.sys.game.config.width / 2,
            this.sys.game.config.height / 2 + 50,
            "Press M to return to Menu",
            {
                fontSize: "24px",
                fill: "#ffcc00",
            }
        ).setOrigin(0.5);

        // Return to menu when M is pressed
        this.input.keyboard.on("keydown-M", () => {
            this.scene.start("menuScene"); 
        });
    }
}

