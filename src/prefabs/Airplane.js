class Airplane extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this); // Add airplane to the scene

        this.moveSpeed = 3; // Speed of movement

        // Assign keyboard inputs
        this.cursors = scene.input.keyboard.createCursorKeys();


        //size
        this.setScale(0.2)
        this.setSize(this.width * 0.01, this.height * 0.01)
        
    }

    update() {
        // Move up
        if (this.cursors.up.isDown && this.y >= this.height / 2) {
            this.y -= this.moveSpeed;
        }
        // Move down
        else if (this.cursors.down.isDown && this.y <= this.scene.sys.game.config.height - this.height / 2) {
            this.y += this.moveSpeed;
        }
    }

    reset() {
        this.y = this.scene.sys.game.config.height / 2;
    }
}
