class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image("airplane", "./assets/airplane.png")
        this.load.image("rocket", "./assets/rocket.png")
        this.load.image("shield", "./assets/shield.png")
        this.load.image("background", "./assets/background.png")

    }

    create() {
        this.add.tileSprite(0, 0, this.sys.game.config.width, this.sys.game.config.height, "background").setOrigin(0, 0);

        // Create airplane 
        this.airplane = new Airplane(
            this,
            50, 
            this.sys.game.config.height / 2, 
            "airplane"
        );

        this.rockets = []

        this.spawnWave()

        this.time.addEvent({
            delay: 100, // Small delay before first wave
            callback: this.spawnWave,
            callbackScope: this,
        });
        
        this.time.addEvent({
            delay: 5000, 
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

    }

    update() {
        this.airplane.update(); 

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
        } else {
            console.log("Player hit! Restarting game...");
            this.scene.restart(); // Restart game on hit
        }
    }

    spawnWave() {
        console.log("Spawning new wave...");

        this.rockets.forEach((rocket) => rocket.destroy());
        this.rockets = [];

        for (let i = 0; i < 3; i++) {
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

        this.shieldText.setText("Shield: ACTIVE")
    }
}

