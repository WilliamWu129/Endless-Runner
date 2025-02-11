class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        
        this.load.spritesheet("airplane", "./assets/airplane.png", {
            frameWidth: 40,
            frameHeight: 40  
        });

        this.load.image("rocket", "./assets/rocket.png")
        this.load.image("shield", "./assets/shield.png")
        this.load.image("background", "./assets/background.png")

        this.load.audio("death", "./assets/death.wav")
        this.load.audio("explosion", "./assets/explosion.wav")
        this.load.audio("rocketSpawn", "./assets/rocketSpawn.wav")
        this.load.audio("xtraLife", "./assets/xtraLife.wav")

    }

    create() {
        this.background = this.add.tileSprite(
            0,
            0,
            this.sys.game.config.width,
            this.sys.game.config.height,
            "background"
        ).setOrigin(0, 0);
    

        // Load sounds
        this.deathSound = this.sound.add("death")
        this.explosionSound = this.sound.add("explosion")
        this.rocketSpawnSound = this.sound.add("rocketSpawn")
        this.xtraLifeSound = this.sound.add("xtraLife")






        if (!this.anims.exists("fly-straight")) {
            this.anims.create({
                key: "fly-straight",
                frames: this.anims.generateFrameNumbers("airplane", { start: 0, end: 2 }),
                frameRate: 10,
                repeat: -1
            });
        }
    
        if (!this.anims.exists("fly-up")) {
            this.anims.create({
                key: "fly-up",
                frames: [{ key: "airplane", frame: 3 }],
                frameRate: 10,
                repeat: -1
            });
        }
    
        if (!this.anims.exists("fly-down")) {
            this.anims.create({
                key: "fly-down",
                frames: [{ key: "airplane", frame: 4 }],
                frameRate: 10,
                repeat: -1
            });
        }


        this.airplane = new Airplane(this, 50, this.sys.game.config.height / 2)

        this.rockets = []

        this.spawnWave()

        this.time.addEvent({
            delay: 100, // Small delay before first wave
            callback: this.spawnWave,
            callbackScope: this,
        });
        
        this.time.addEvent({
            delay: 2500, 
            callback: this.spawnWave,
            callbackScope: this,
            loop: true, 
        });

        this.shields = []; // Array to store shields

        this.time.addEvent({
            delay: 10000, // Spawn shield every 10 seconds
            callback: this.spawnShield,
            callbackScope: this,
            loop: true,
        });

        this.shieldText = this.add.text(20, 20, "Shield: NONE", {
            fontSize: "24px",
            fill: "#ffffff",
        });


        for (let i = 0; i < 3; i++) {
            let newRocket = new Rocket(this, "rocket")
            newRocket.y = this.getNonOverlappingY()
            this.rockets.push(newRocket)
        }



        this.physics.world.enable([this.airplane, ...this.rockets]);

        // Check for collision
        this.rockets.forEach((rocket) => {
            this.physics.add.overlap(this.airplane, rocket, this.handleCollision, null, this);
        });




        //scoring
        this.score = 0;
        this.highScore = localStorage.getItem("highScore") || 0;

        this.scoreText = this.add.text(
            this.sys.game.config.width - 20,
            20,
            `Score: 0`,
            {
                fontSize: "24px",
                fill: "#ffffff",
                align: "right",
            }
        ).setOrigin(1, 0);
    
        // Timer to increment score every second
        this.time.addEvent({
            delay: 1000, // 1 second
            callback: this.updateScore,
            callbackScope: this,
            loop: true,
        });

    }

    update() {
        this.background.tilePositionX += 2 //scrolling background
        
        if (this.airplane) {
            this.airplane.update();
        }

        this.rockets.forEach((rocket) => {
            rocket.update()
        })

        this.rockets = this.rockets.filter(rocket => rocket.x > -50)
    }


    handleCollision(airplane, rocket) {
        rocket.destroy(); // Remove rocket
        this.rockets = this.rockets.filter(r => r !== rocket)
        
        if (airplane.hasShield) {
            airplane.hasShield = false; // Remove shield
            console.log("Shield absorbed the hit!")
            this.shieldText.setText("Shield: NONE")
            this.explosionSound.play()
        } else {
            this.deathSound.play()
            if (this.score > this.highScore) {
                this.highScore = this.score
                localStorage.setItem("highScore", this.highScore) // Save to local storage
            }
            this.scene.start("gameOverScene", { score: this.score, highScore: this.highScore })
        }
    }

    spawnWave() {
        console.log("Spawning new wave...");
        this.rocketSpawnSound.play()

        this.rockets.forEach((rocket) => rocket.destroy());
        this.rockets = [];

        for (let i = 0; i < 5; i++) {
            let newRocket = new Rocket(this, "rocket")
            newRocket.y = this.getNonOverlappingY()
            
            this.physics.add.existing(newRocket)
            this.rockets.push(newRocket)

            // Collision detection
            this.physics.add.overlap(this.airplane, newRocket, this.handleCollision, null, this)
        }
    }

    getNonOverlappingY() {
        let newY;
        let maxAttempts = 10;
        let attempts = 0;

        do {
            newY = Phaser.Math.Between(50, this.sys.game.config.height - 50);
            attempts++;
        } while (this.rockets.some((r) => Math.abs(r.y - newY) < 50) && attempts < maxAttempts);

        return newY;
    }

    spawnShield() {
        let newShield = new Shield(this, "shield")
        this.shields.push(newShield)
    
        // Enable physics and add collision
        this.physics.add.existing(newShield)
        this.physics.add.overlap(this.airplane, newShield, this.collectShield, null, this)
    }

    collectShield(airplane, shield) {
        airplane.collectShield() // Activate shield
        shield.destroy() // Remove collected shield
        this.xtraLifeSound.play()

        this.shieldText.setText("Shield: ACTIVE")
    }


    updateScore() {
        this.score++ // Increment score
        this.scoreText.setText(`Score: ${this.score}`)
    }
}

