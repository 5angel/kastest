export default class PreloadState {
    preload() {
        this.load.image('test', './assets/images/test.png');

        this.load.image('tileset', './assets/images/tileset.png');

        this.load.tilemap('test', './assets/json/test.json', null, Phaser.Tilemap.TILED_JSON);
    }

    create() {
        this.state.start('menu');
    }
}
