"use strict";
var GStats;
(function (GStats) {
    var BaseHooks = /** @class */ (function () {
        function BaseHooks() {
            this._drawCalls = -1;
            this._maxDeltaDrawCalls = -1;
        }
        BaseHooks.prototype.attach = function (gl) {
            this.glhook = new GStats.GLHook(gl);
            this.texturehook = new GStats.TextureHook(gl);
        };
        Object.defineProperty(BaseHooks.prototype, "drawCalls", {
            get: function () {
                if (this.glhook && this.glhook.isInit) {
                    return this.glhook.drawPasses;
                }
                return -1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseHooks.prototype, "maxDeltaDrawCalls", {
            get: function () {
                return this._maxDeltaDrawCalls;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseHooks.prototype, "deltaDrawCalls", {
            get: function () {
                if (this._drawCalls == -1) {
                    this._drawCalls = this.drawCalls;
                    return 0;
                }
                var dc = this.drawCalls;
                var delta = dc - this._drawCalls;
                this._drawCalls = dc;
                this._maxDeltaDrawCalls = Math.max(this._maxDeltaDrawCalls, delta);
                return delta;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseHooks.prototype, "maxTextureCount", {
            get: function () {
                if (this.texturehook && this.texturehook.isInit)
                    return this.texturehook.maxTexturesCount;
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseHooks.prototype, "texturesCount", {
            get: function () {
                if (this.texturehook && this.texturehook.isInit)
                    return this.texturehook.currentTextureCount;
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        BaseHooks.prototype.reset = function () {
            this._maxDeltaDrawCalls = -1;
            this._drawCalls = -1;
            if (this.glhook)
                this.glhook.reset();
            if (this.texturehook)
                this.texturehook.reset();
        };
        BaseHooks.prototype.release = function () {
            if (this.glhook)
                this.glhook.release();
            if (this.texturehook)
                this.texturehook.release();
        };
        return BaseHooks;
    }());
    GStats.BaseHooks = BaseHooks;
})(GStats || (GStats = {}));
var GStats;
(function (GStats) {
    var GLHook = /** @class */ (function () {
        function GLHook(_gl) {
            this.drawPasses = 0;
            this.isInit = false;
            this.realGLDrawElements = function () { };
            if (_gl) {
                if (_gl.__proto__.drawElements) {
                    this.gl = _gl;
                    this.realGLDrawElements = _gl.__proto__.drawElements;
                    //replace to new function
                    _gl.__proto__.drawElements = this.fakeGLdrawElements.bind(this);
                    this.isInit = true;
                    console.log("[GLHook] GL was Hooked!");
                }
            }
            else {
                console.error("[GLHook] GL can't be NULL");
            }
        }
        GLHook.prototype.fakeGLdrawElements = function (mode, count, type, offset) {
            this.drawPasses++;
            this.realGLDrawElements.call(this.gl, mode, count, type, offset);
        };
        GLHook.prototype.reset = function () {
            this.drawPasses = 0;
        };
        GLHook.prototype.release = function () {
            if (this.isInit) {
                this.gl.__proto__.drawElements = this.realGLDrawElements;
                console.log("[GLHook] Hook was removed!");
            }
            this.isInit = false;
        };
        return GLHook;
    }());
    GStats.GLHook = GLHook;
})(GStats || (GStats = {}));
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GStats;
(function (GStats) {
    var PhaserHooks = /** @class */ (function (_super) {
        __extends(PhaserHooks, _super);
        function PhaserHooks(game) {
            var _this = _super.call(this) || this;
            if (!game) {
                console.error("[Phaser Hooks]Phaser Game can't passed or NULL");
                return _this;
            }
            var _w = window;
            if (_w.Phaser) {
                var version = _w.Phaser.VERSION;
                if (version.startsWith("3")) {
                    if (game.renderer.gl && game.renderer.gl instanceof WebGLRenderingContext) {
                        _this.attach(game.renderer.gl);
                    }
                    else {
                        console.error("[Phaser 3 Hooks]Canvas renderer is not allowed");
                    }
                }
                else {
                    if (game.renderer instanceof PIXI.WebGLRenderer) {
                        _this.attach(game.renderer.gl);
                    }
                    else {
                        console.error("[Phaser 2 Hooks]Canvas renderer is not allowed");
                    }
                }
            }
            else {
                console.error("[Phaser Hooks] THIS HOOK ONLY FOR PHASER 2CE or PHASER 3!!!!");
            }
            return _this;
        }
        return PhaserHooks;
    }(GStats.BaseHooks));
    GStats.PhaserHooks = PhaserHooks;
})(GStats || (GStats = {}));
var GStats;
(function (GStats) {
    var PIXIHooks = /** @class */ (function (_super) {
        __extends(PIXIHooks, _super);
        function PIXIHooks(app) {
            var _this = _super.call(this) || this;
            if (!app) {
                console.error("PIXI Application can't passed or NULL");
                return _this;
            }
            if (app.renderer instanceof PIXI.WebGLRenderer) {
                _this.attach(app.renderer.gl);
                var start_textures = app.renderer.textureManager._managedTextures;
                if (start_textures && _this.texturehook) {
                    console.log("[PIXI Hooks] Collect used textures:", start_textures.length);
                    for (var i = 0; i < start_textures.length; ++i) {
                        var txr = start_textures[i];
                        var gltextures = txr._glTextures;
                        for (var j = 0; j < gltextures.length; ++j) {
                            if (gltextures[j].gl === app.renderer.gl) {
                                _this.texturehook.registerTexture(gltextures[j].texture);
                            }
                        }
                    }
                }
            }
            else {
                console.error("[PIXI Hook]Canvas renderer is not allowed");
            }
            return _this;
        }
        return PIXIHooks;
    }(GStats.BaseHooks));
    GStats.PIXIHooks = PIXIHooks;
})(GStats || (GStats = {}));
var GStats;
(function (GStats) {
    var StatsJSAdapter = /** @class */ (function () {
        function StatsJSAdapter(_hook, _stats) {
            this.hook = _hook;
            if (_stats) {
                this.stats = _stats;
            }
            else {
                this.stats = null;
                if (window.Stats) {
                    this.stats = new (window.Stats)();
                }
            }
            if (this.stats) {
                this.dcPanel = this.stats.addPanel(new window.Stats.Panel("DC:", "#330570", "#A69700"));
                this.tcPanel = this.stats.addPanel(new window.Stats.Panel("TC:", "#A62500", "#00B454"));
                this.stats.showPanel(0);
            }
            else {
                console.error("Stats can't found in window, pass instance of Stats.js as second param");
            }
        }
        StatsJSAdapter.prototype.update = function () {
            if (this.stats) {
                if (this.hook) {
                    this.dcPanel.update(this.hook.deltaDrawCalls, Math.max(50, this.hook.maxDeltaDrawCalls));
                    this.tcPanel.update(this.hook.texturesCount, Math.max(20, this.hook.maxTextureCount));
                }
                this.stats.update();
            }
        };
        StatsJSAdapter.prototype.reset = function () {
            if (this.hook)
                this.hook.reset();
        };
        return StatsJSAdapter;
    }());
    GStats.StatsJSAdapter = StatsJSAdapter;
})(GStats || (GStats = {}));
var GStats;
(function (GStats) {
    var TextureHook = /** @class */ (function () {
        function TextureHook(_gl) {
            this.createdTextures = new Array();
            this.maxTexturesCount = 0;
            this.isInit = false;
            this.realGLCreateTexture = function () { };
            this.realGLDeleteTexture = function () { };
            if (_gl) {
                if (_gl.__proto__.createTexture) {
                    this.gl = _gl;
                    this.realGLCreateTexture = _gl.__proto__.createTexture;
                    this.realGLDeleteTexture = _gl.__proto__.deleteTexture;
                    //replace to new function
                    _gl.__proto__.createTexture = this.fakeGLCreateTexture.bind(this);
                    _gl.__proto__.deleteTexture = this.fakeGLDeleteTexture.bind(this);
                    this.isInit = true;
                    console.log("[TextureHook] GL was Hooked!");
                }
            }
            else {
                console.error("[TextureHook] GL can't be NULL");
            }
        }
        Object.defineProperty(TextureHook.prototype, "currentTextureCount", {
            get: function () {
                return this.createdTextures.length;
            },
            enumerable: true,
            configurable: true
        });
        TextureHook.prototype.registerTexture = function (texture) {
            this.createdTextures.push(texture); // ++;
            this.maxTexturesCount = Math.max(this.createdTextures.length, this.maxTexturesCount);
        };
        TextureHook.prototype.fakeGLCreateTexture = function () {
            var texture = this.realGLCreateTexture.call(this.gl);
            this.registerTexture(texture);
            return texture;
        };
        TextureHook.prototype.fakeGLDeleteTexture = function (texture) {
            var index = this.createdTextures.indexOf(texture);
            if (index > -1) {
                this.createdTextures.splice(index, 1);
            }
            this.realGLDeleteTexture.call(this.gl, texture);
        };
        TextureHook.prototype.reset = function () {
            this.createdTextures = new Array();
            this.maxTexturesCount = 0;
        };
        TextureHook.prototype.release = function () {
            if (this.isInit) {
                this.gl.__proto__.createTexture = this.realGLCreateTexture;
                this.gl.__proto__.deleteTexture = this.realGLDeleteTexture;
                console.log("[TextureHook] Hook was removed!");
            }
            this.isInit = false;
        };
        return TextureHook;
    }());
    GStats.TextureHook = TextureHook;
})(GStats || (GStats = {}));
//# sourceMappingURL=gstats.js.map