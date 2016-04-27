import { isArray } from './../misc/helpers';

export default class PlayerCtrl {
    constructor(game) {
        this._steps   = 0;
        this._actions = {};
        this._queue   = [];

        this.game   = game;
        this.sprite = null;

        this.direction = PlayerCtrl.Direction.DOWN;
        this.isMoving  = false;
    }

    setKeyActions(config) {
        for (let key in config) {
            if (config.hasOwnProperty(key)) {
                let value = config[key];

                if (isArray(value)) {
                    value.forEach((v) => this._actions[v] = key);
                } else {
                    this._actions[value] = key;
                }
            }
        }
    }

    onKeyDown(e) {
        let action = this._actions[e.keyCode] || '',
            index  = this._queue.indexOf(action);

        if (index === -1) {
            this._queue.unshift(action);
        }
    }

    onKeyUp(e) {
        let action = this._actions[e.keyCode] || '',
            index  = this._queue.indexOf(action);

        if (index !== -1) {
            this._queue.splice(index, 1);
        }
    }

    addToStage(config) {
        this.sprite = this.game.add.sprite(config.x, config.y, 'test');

        this.game.physics.arcade.enable(this.sprite);
        this.game.camera.follow(this.sprite);

        this.game.input.keyboard.onDownCallback = this.onKeyDown.bind(this);
        this.game.input.keyboard.onUpCallback   = this.onKeyUp.bind(this);
    }

    update() {
        if (this.isMoving) {
            this._steps++;

            switch (this.direction) {
                case PlayerCtrl.Direction.UP:
                    this.sprite.body.y--;
                    break;
                case PlayerCtrl.Direction.RIGHT:
                    this.sprite.body.x++;
                    break;
                case PlayerCtrl.Direction.DOWN:
                    this.sprite.body.y++;
                    break;
                case PlayerCtrl.Direction.LEFT:
                    this.sprite.body.x--;
                    break;
            }

            if (this._steps >= PlayerCtrl.STEP) {
                this._steps = 0;

                this.isMoving = false;
            }
        } else if (this._queue.length > 0) {
            let action    = this._queue[0] || '',
                direction = PlayerCtrl.Direction[action.toUpperCase()];

            if (direction !== void 0) {
                this.direction = direction;

                if (!this.isMoving) {
                    this.isMoving = true;
                    this.update();
                }
            }
        }
    }
}

PlayerCtrl.Direction = {
    UP:    0,
    RIGHT: 1,
    DOWN:  2,
    LEFT:  3
};

PlayerCtrl.STEP  = 16;
PlayerCtrl.SPEED = 40;
