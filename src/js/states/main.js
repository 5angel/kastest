import { extend } from './../misc/helpers';

import PlayerCtrl  from './../controllers/player';

export default class MainState {
    constructor() {
        this.player  = null;
        this.objects = null;
        this.layers  = null;
    }

    _addPlayer() {
        this.player = new PlayerCtrl(this.game);

        this.player.setKeyActions({
            up:    [87, 38],
            right: [68, 39],
            down:  [83, 40],
            left:  [65, 37]
        });

        this.player.addToStage(this._findByType('player', 'objects')[0]);
    }

    _createSprite(el, group) {
        extend(group.create(el.x, el.y, el.properties.sprite), el.properties);
    }

    _addInteractive() {
        let list = this._findByType('interactive', 'objects');

        list.forEach((el) => this._createSprite(el, this.objects.interactive));
    }

    _findByType(type, layer) {
        return this.map.objects[layer].filter((el) => el.type === type);
    }

    create() {
        this.map = this.game.add.tilemap('test');

        this.map.addTilesetImage('test', 'tileset');

        this.objects = {
            interactive: this.game.add.group()
        };

        this.objects.interactive.enableBody = true;

        this.layers = {
            background: this.map.createLayer('background'),
            collisions: this.map.createLayer('collisions')
        };

        this.map.setCollisionBetween(1, 2000, true, 'collisions');

        this.layers.background.resizeWorld();

        this._addPlayer();
        this._addInteractive();
    }

    update() {
        this.player.update();

        this.game.physics.arcade.collide(this.player.sprite, this.layers.collisions);
    }
}

MainState.Defaults = {
    SPEED_PLAYER: 2
};
