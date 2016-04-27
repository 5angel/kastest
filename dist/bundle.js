/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);

	var _boot = __webpack_require__(5);

	var _boot2 = _interopRequireDefault(_boot);

	var _preload = __webpack_require__(6);

	var _preload2 = _interopRequireDefault(_preload);

	var _menu = __webpack_require__(7);

	var _menu2 = _interopRequireDefault(_menu);

	var _main = __webpack_require__(8);

	var _main2 = _interopRequireDefault(_main);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GameController = function GameController() {
	    _classCallCheck(this, GameController);

	    this.game = new Phaser.Game(256, 224, Phaser.AUTO, '');

	    this.game.state.add('boot', _boot2.default);
	    this.game.state.add('preload', _preload2.default);
	    this.game.state.add('menu', _menu2.default);
	    this.game.state.add('main', _main2.default);

	    this.game.state.start('boot');
	};

	var app = new GameController();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/less-loader/index.js!./styles.less", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/less-loader/index.js!./styles.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "", ""]);

	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function () {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for (var i = 0; i < this.length; i++) {
				var item = this[i];
				if (item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function (modules, mediaQuery) {
			if (typeof modules === "string") modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for (var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if (typeof id === "number") alreadyImportedModules[id] = true;
			}
			for (i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if (mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if (mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	        value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var BootState = function () {
	        function BootState() {
	                _classCallCheck(this, BootState);
	        }

	        _createClass(BootState, [{
	                key: 'create',
	                value: function create() {
	                        Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);

	                        this.game.renderer.renderSession.roundPixels = true;
	                        this.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;

	                        this.scale.setUserScale(2, 2);

	                        this.physics.startSystem(Phaser.Physics.ARCADE);

	                        this.state.start('preload');
	                }
	        }]);

	        return BootState;
	}();

	exports.default = BootState;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var PreloadState = function () {
	    function PreloadState() {
	        _classCallCheck(this, PreloadState);
	    }

	    _createClass(PreloadState, [{
	        key: 'preload',
	        value: function preload() {
	            this.load.image('test', './assets/images/test.png');

	            this.load.image('tileset', './assets/images/tileset.png');

	            this.load.tilemap('test', './assets/json/test.json', null, Phaser.Tilemap.TILED_JSON);
	        }
	    }, {
	        key: 'create',
	        value: function create() {
	            this.state.start('menu');
	        }
	    }]);

	    return PreloadState;
	}();

	exports.default = PreloadState;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var MenuState = function () {
	    function MenuState() {
	        _classCallCheck(this, MenuState);
	    }

	    _createClass(MenuState, [{
	        key: 'create',
	        value: function create() {
	            this.add.sprite(0, 0, 'test');
	        }
	    }, {
	        key: 'update',
	        value: function update() {
	            if (this.input.activePointer.justPressed()) {
	                this.state.start('main');
	            }
	        }
	    }]);

	    return MenuState;
	}();

	exports.default = MenuState;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _player = __webpack_require__(9);

	var _player2 = _interopRequireDefault(_player);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var MainState = function () {
	    function MainState() {
	        _classCallCheck(this, MainState);

	        this.player = null;
	    }

	    _createClass(MainState, [{
	        key: 'create',
	        value: function create() {
	            this.map = this.game.add.tilemap('test');

	            this.map.addTilesetImage('test', 'tileset');

	            this.layers = {
	                background: this.map.createLayer('background'),
	                collisions: this.map.createLayer('collisions')
	            };

	            this.map.setCollisionBetween(1, 2000, true, 'collisions');

	            this.layers.background.resizeWorld();

	            this.addPlayer();
	        }
	    }, {
	        key: 'update',
	        value: function update() {
	            this.player.update();

	            this.game.physics.arcade.collide(this.player.sprite, this.layers.collisions);
	        }
	    }, {
	        key: 'addPlayer',
	        value: function addPlayer() {
	            this.player = new _player2.default(this.game);

	            this.player.setKeyActions({
	                up: [87, 38],
	                right: [68, 39],
	                down: [83, 40],
	                left: [65, 37]
	            });

	            this.player.addToStage(this.findByType('player', 'objects')[0]);
	        }
	    }, {
	        key: 'findByType',
	        value: function findByType(type, layer) {
	            return this.map.objects[layer].filter(function (el) {
	                return el.type === type;
	            });
	        }
	    }]);

	    return MainState;
	}();

	exports.default = MainState;


	MainState.Defaults = {
	    SPEED_PLAYER: 2
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _helpers = __webpack_require__(10);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var PlayerCtrl = function () {
	    function PlayerCtrl(game) {
	        _classCallCheck(this, PlayerCtrl);

	        this._steps = 0;
	        this._actions = {};
	        this._queue = [];

	        this.game = game;
	        this.sprite = null;

	        this.direction = PlayerCtrl.Direction.DOWN;
	        this.isMoving = false;
	    }

	    _createClass(PlayerCtrl, [{
	        key: 'setKeyActions',
	        value: function setKeyActions(config) {
	            var _this = this;

	            var _loop = function _loop(key) {
	                if (config.hasOwnProperty(key)) {
	                    var value = config[key];

	                    if ((0, _helpers.isArray)(value)) {
	                        value.forEach(function (v) {
	                            return _this._actions[v] = key;
	                        });
	                    } else {
	                        _this._actions[value] = key;
	                    }
	                }
	            };

	            for (var key in config) {
	                _loop(key);
	            }
	        }
	    }, {
	        key: 'onKeyDown',
	        value: function onKeyDown(e) {
	            var action = this._actions[e.keyCode] || '',
	                index = this._queue.indexOf(action);

	            if (index === -1) {
	                this._queue.unshift(action);
	            }
	        }
	    }, {
	        key: 'onKeyUp',
	        value: function onKeyUp(e) {
	            var action = this._actions[e.keyCode] || '',
	                index = this._queue.indexOf(action);

	            if (index !== -1) {
	                this._queue.splice(index, 1);
	            }
	        }
	    }, {
	        key: 'addToStage',
	        value: function addToStage(config) {
	            this.sprite = this.game.add.sprite(config.x, config.y, 'test');

	            this.game.physics.arcade.enable(this.sprite);
	            this.game.camera.follow(this.sprite);

	            this.game.input.keyboard.onDownCallback = this.onKeyDown.bind(this);
	            this.game.input.keyboard.onUpCallback = this.onKeyUp.bind(this);
	        }
	    }, {
	        key: 'update',
	        value: function update() {
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
	                var action = this._queue[0] || '',
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
	    }]);

	    return PlayerCtrl;
	}();

	exports.default = PlayerCtrl;


	PlayerCtrl.Direction = {
	    UP: 0,
	    RIGHT: 1,
	    DOWN: 2,
	    LEFT: 3
	};

	PlayerCtrl.STEP = 16;
	PlayerCtrl.SPEED = 40;

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.isArray = isArray;
	function isArray(obj) {
	    return !Array.isArray ? toString.call(obj) === '[object Array]' : Array.isArray(obj);
	}

/***/ }
/******/ ]);