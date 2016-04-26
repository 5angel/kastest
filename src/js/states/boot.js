export default class BootState {
    create() {
        Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);

        this.game.renderer.renderSession.roundPixels = true;
        this.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;

        this.scale.setUserScale(2, 2);

        this.physics.startSystem(Phaser.Physics.ARCADE);

        this.state.start('preload');
    }
}
