class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, texture) {
        // Random Y spawn 
        let randomY = Phaser.Math.Between(50, scene.sys.game.config.height - 20);
        let startX = scene.sys.game.config.width + 50; // Start on the right

        super(scene, startX, randomY, texture);
        scene.add.existing(this);

        this.moveSpeed = 3; // Speed 
        this.setScale(0.5) // Scale 
        this.setSize(this.width * 0.5, this.height * 0.5) // hitbox
        

        this.setFlipX(true)

        scene.physics.add.existing(this)
        this.body.setVelocityX(-300)

    }

    update() {
        // Move left across the screen

        // Reset if it moves off-screen
        if (this.x < -55) {
            this.destroy();
        }
    }

    reset() {
        if (!this.scene) return
        this.x = this.scene.sys.game.config.width + 50 // Respawn on the right
        this.y = Phaser.Math.Between(50, this.scene.sys.game.config.height - 50) // Random Y-position
        this.scene.rocketSpawnSound.play()
    }
}