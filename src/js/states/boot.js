export default class BootState {
    constructor(game) {
        this.game = game;
    }

    create() {
        Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);

        this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
        this.game.renderer.renderSession.roundPixels = true;

        this.game.scale.setUserScale(2, 2);

        this.game.state.start('preload');
    }
}
