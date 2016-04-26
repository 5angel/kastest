import ActionsCtrl from './../controllers/actions';
import PlayerCtrl  from './../controllers/player';

export default class MainState {
    constructor() {
        this.actions = new ActionsCtrl();
        this.player  = null;

        this.actions.loadConfig({
            up:    [87, 38],
            right: [68, 39],
            down:  [83, 40],
            left:  [65, 37]
        });
    }

    create() {
        this.map = this.game.add.tilemap('test');

        this.map.addTilesetImage('test', 'tileset');

        this.layers = {
            background: this.map.createLayer('background'),
            collisions: this.map.createLayer('collisions')
        };

        this.map.setCollisionBetween(1, 2000, true, 'collisions');

        this.layers.background.resizeWorld();

        this.input.keyboard.onDownCallback = this.actions.onKeyDown.bind(this.actions);
        this.input.keyboard.onUpCallback   = this.actions.onKeyUp.bind(this.actions);

        this.addPlayer();

        this.player.moveDown();
    }

    update() {
        this.player.update();

        this.game.physics.arcade.collide(this.player.sprite, this.layers.collisions);
    }

    addPlayer() {
        this.player = new PlayerCtrl(this.game);

        this.player.add(this.findByType('player', 'objects')[0]);
    }

    findByType(type, layer) {
        return this.map.objects[layer].filter((el) => el.type === type);
    }
}

MainState.Defaults = {
    SPEED_PLAYER: 2
};
