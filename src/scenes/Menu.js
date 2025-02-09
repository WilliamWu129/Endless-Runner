class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.image("background", "./assets/background.png");
    }

    create() {
        // Add background
        this.add.tileSprite(0, 0, this.sys.game.config.width, this.sys.game.config.height, "background").setOrigin(0, 0);

        let menuConfig = {
            fontFamily: "Courier",
            fontSize: "28px",
            backgroundColor: "#F3B141",
            color: "#843605",
            align: "center",
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0,
        };

        this.add.text(
            this.sys.game.config.width / 2,
            this.sys.game.config.height / 2 - 50,
            "Jetpack Airplane",
            menuConfig
        ).setOrigin(0.5);
        
        this.add.text(
            this.sys.game.config.width / 2,
            this.sys.game.config.height / 2,
            "Press ENTER to Start",
            menuConfig
        ).setOrigin(0.5);

        //  Enter key
        this.input.keyboard.on("keydown-ENTER", () => {
            this.scene.start("playScene"); // load Play scene
        });
    }
}

