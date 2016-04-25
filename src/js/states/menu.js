export default class MenuState {
    create() {
        this.game.add.sprite(0, 0, 'test');
    }

    update() {
        if (this.game.input.activePointer.justPressed()) {
            this.game.state.start('main');
        }
    }
}
