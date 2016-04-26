import { isArray } from './../misc/helpers';

export default class ActionsCtrl {
    constructor() {
        this._config = {};
        this._queue  = [];
    }

    loadConfig(config) {
        for (let key in config) {
            if (config.hasOwnProperty(key)) {
                let value = config[key];

                if (isArray(value)) {
                    value.forEach((v) => this._config[v] = key);
                } else {
                    this._config[value] = key;
                }
            }
        }
    }

    getFirst() {
        return this._queue[0];
    }

    onKeyDown(e) {
        let action = this._config[e.keyCode] || '',
            index  = this._queue.indexOf(action);

        if (index !== -1) {
            this._queue.unshift(action);
        }
    }

    onKeyUp(e) {
        let action = this._config[e.keyCode] || '',
            index  = this._queue.indexOf(action);

        if (index !== -1) {
            this._queue.splice(index, 1);
        }
    }
}
