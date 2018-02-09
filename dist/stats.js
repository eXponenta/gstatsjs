"use strict";
var GStats;
(function (GStats) {
    var BaseHooks = /** @class */ (function () {
        function BaseHooks() {
            this._maxBTCount = 0;
            this._drawCalls = -1;
        }
        Object.defineProperty(BaseHooks.prototype, "drawCalls", {
            get: function () {
                if (this.glhook) {
                    return this.glhook.drawPasses;
                }
                return -1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseHooks.prototype, "deltaDrawCalls", {
            get: function () {
                if (this._drawCalls == -1) {
                    this._drawCalls == this.drawCalls;
                    return 0;
                }
                var dc = this.drawCalls;
                var delta = dc - this._drawCalls;
                this._drawCalls = dc;
                return delta;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseHooks.prototype, "maxTextureSourcesCount", {
            get: function () {
                return this._maxBTCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseHooks.prototype, "textureSourcesCount", {
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        BaseHooks.prototype.release = function () {
            if (this.glhook)
                this.glhook.release();
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
                    _gl.__proto__.drawElements = this.fakeGLdrawElements;
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
    var PIXIHooks = /** @class */ (function (_super) {
        __extends(PIXIHooks, _super);
        function PIXIHooks(app) {
            var _this = _super.call(this) || this;
            if (!app) {
                console.error("PIXI Application can't passed or NULL");
                return _this;
            }
            if (app.renderer instanceof PIXI.WebGLRenderer) {
                _this.glhook = new GStats.GLHook(app.renderer.gl);
            }
            else {
                console.error("[PIXI Hook]Canvas renderer is not allowed");
            }
            return _this;
        }
        Object.defineProperty(PIXIHooks.prototype, "textureSourcesCount", {
            get: function () {
                var count = Object.keys(PIXI.BaseTextureCache).length;
                this._maxBTCount = Math.max(this._maxBTCount, count);
                return count;
            },
            enumerable: true,
            configurable: true
        });
        return PIXIHooks;
    }(GStats.BaseHooks));
    GStats.PIXIHooks = PIXIHooks;
})(GStats || (GStats = {}));
//# sourceMappingURL=stats.js.map