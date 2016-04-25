export default class PreloadState {
    constructor(game) {
        this.game = game;
    }

    preload() {
        this.game.load.image('test', '/assets/test.png');
    }

    create() {
        this.game.state.start('menu');
    }
}
