class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.image("background", "./assets/background.png")
        this.load.audio("bgm", "./assets/BGM.mp3")
    }

    create() {
        // Add background
        this.background = this.add.image(0, 0, "background")
        .setOrigin(0, 0)
        .setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

        let titleConfig = {
            fontFamily: "Courier",
            fontSize: "40px", 
            backgroundColor: "#F3B141",
            color: "#843605",
            align: "center",
            padding: {
                top: 10,
                bottom: 10,
            },
            fixedWidth: 0,
        };



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
            "Escape Through The Skies",
            titleConfig
        ).setOrigin(0.5);
        



        this.add.text(
            this.sys.game.config.width / 2,
            this.sys.game.config.height / 2,
            "Arrow keys to move up and Down",
            
            menuConfig
        ).setOrigin(0.5);



        this.add.text(
            this.sys.game.config.width / 2,
            this.sys.game.config.height / 2 + 50,
            "Dodge the incoming rockets",
            
            menuConfig
        ).setOrigin(0.5);

        this.add.text(
            this.sys.game.config.width / 2,
            this.sys.game.config.height / 2+ 100,
            "Press ENTER to Start",
            menuConfig
        ).setOrigin(0.5);


        if (!this.sound.get("bgm")) {
            this.bgm = this.sound.add("bgm", { loop: true, volume: 0.1 }) // Loop the music
            this.bgm.play()
        }



        //  Enter key
        this.input.keyboard.on("keydown-ENTER", () => {
            this.scene.start("playScene"); // load Play scene
        });
    }
}

