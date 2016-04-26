export default class MenuState {
    create() {
        this.add.sprite(0, 0, 'test');
    }

    update() {
        if (this.input.activePointer.justPressed()) {
            this.state.start('main');
        }
    }
}
