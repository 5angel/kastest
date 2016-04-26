export default class PlayerCtrl {
    constructor(game) {
        this.game   = game;
        this.sprite = null;

        this.direction = PlayerCtrl.Direction.DOWN;
        this.isMoving  = false;
    }

    add(config) {
        this.sprite = this.game.add.sprite(config.x, config.y, 'player');

        this.game.physics.arcade.enable(this.sprite);
        this.game.camera.follow(this.sprite);
    }

    moveDown() {
        this.direction = PlayerCtrl.Direction.DOWN;

        if (!this.isMoving) {
            this.isMoving = true;
        }
    }

    update() {
        if (this.isMoving) {
            switch (this.direction) {
                case PlayerCtrl.Direction.DOWN:
                    this.sprite.body.y++;
                    break;
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
