class Airplane extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this); // Add airplane to the scene

        scene.physics.add.existing(this)
        

        this.moveSpeed = 3; // Speed of movement
        this.hasShield = false;


        this.play('fly-straight');


        // Assign keyboard inputs
        this.cursors = scene.input.keyboard.createCursorKeys();


        //size
        this.setScale(2)
        this.setSize(this.width * 0.5, this.height * 0.5)
        
    }



    update() {
        // Move up
        if (this.cursors.up.isDown && this.y >= this.height / 2) {
            this.y -= this.moveSpeed;
            this.play('fly-up', true)
        }
        // Move down
        else if (this.cursors.down.isDown && this.y <= this.scene.sys.game.config.height - this.height / 2) {
            this.y += this.moveSpeed;
            this.play('fly-down', true)
        }
        else{
            this.play('fly-straight', true);
        }
    }

    collectShield() {
        this.hasShield = true; // Activate shield
        console.log("Shield collected!");
    }

    takeDamage() {
        if (this.hasShield) {
            this.hasShield = false; // Remove shield instead of dying
            console.log("Shield destroyed!");
        } else {
            console.log("Player hit! Game Over!");
            this.scene.scene.restart(); // Restart the scene on death
        }
    }

    reset() {
        this.y = this.scene.sys.game.config.height / 2;
    }
}
