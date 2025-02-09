class Shield extends Phaser.GameObjects.Sprite {
    constructor(scene, texture) {
        let randomY = Phaser.Math.Between(50, scene.sys.game.config.height - 50);
        let startX = scene.sys.game.config.width + 50; // Start from right

        super(scene, startX, randomY, texture);
        scene.add.existing(this);

        this.moveSpeed = 3; // Speed
        this.setScale(0.1);
        this.setSize(this.width * 0.01, this.height * 0.01);

        scene.physics.add.existing(this)
        this.body.setVelocityX(-200)
    }

    update() {
        if (this.x < -50) {
            this.destroy(); // Remove off-screen
        }
    }
}
