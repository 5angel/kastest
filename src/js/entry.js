import './../less/styles.less';

import BootState    from './states/boot';
import PreloadState from './states/preload';
import MenuState    from './states/menu';
import MainState    from './states/main';

class GameController {
    constructor() {
        this.game = new Phaser.Game(256, 224, Phaser.AUTO, '');

        this.game.state.add('boot',    BootState);
        this.game.state.add('preload', PreloadState);
        this.game.state.add('menu',    MenuState);
        this.game.state.add('main',    MainState);

        this.game.state.start('boot');
    }
}

let app = new GameController();
