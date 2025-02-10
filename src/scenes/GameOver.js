class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOverScene");
    }

    init(data){
        this.score = data.score || 0;
        this.highScore = data.highScore || 0;
    }

    create() {
        this.add.text(
            this.sys.game.config.width / 2,
            this.sys.game.config.height / 2 - 150,
            "Game Over",
            {
                fontSize: "32px",
                fill: "#ff0000",
                fontFamily: "Arial",
            }
        ).setOrigin(0.5);

        //displaying score

        this.add.text(
            this.sys.game.config.width / 2,
            this.sys.game.config.height / 2 - 100,
            `Your Score: ${this.score}`,
            {
                fontSize: "24px",
                fill: "#ffffff",
            }
        ).setOrigin(0.5);

        // displaying high score
        this.add.text(
            this.sys.game.config.width / 2,
            this.sys.game.config.height / 2 - 50,
            `High Score: ${this.highScore}`,
            {
                fontSize: "24px",
                fill: "#ffffff",
            }
        ).setOrigin(0.5);

        // Restart Option
        let restartText = this.add.text(
            this.sys.game.config.width / 2,
            this.sys.game.config.height / 2,
            "Press R to Restart",
            {
                fontSize: "24px",
                fill: "#ffffff",
            }
        ).setOrigin(0.5);

        // Main Menu Option
        let menuText = this.add.text(
            this.sys.game.config.width / 2,
            this.sys.game.config.height / 2 + 50,
            "Press M to Return to Menu",
            {
                fontSize: "24px",
                fill: "#ffffff",
            }
        ).setOrigin(0.5);

        //credits
        this.add.text(
            this.sys.game.config.width / 2,
            this.sys.game.config.height / 2 + 100,
            "Press C for Credits",
            {
                fontSize: "24px",
                fill: "#ffcc00",
            }
        ).setOrigin(0.5);


        this.input.keyboard.on("keydown-R", () => {
            this.scene.start("playScene"); // Restart the game
        });

        this.input.keyboard.on("keydown-M", () => {
            this.scene.start("menuScene"); // Go back to the main menu
        });
        this.input.keyboard.on("keydown-C", () => {
            this.scene.start("creditsScene"); // Go to Credits scene
        });
    }
}