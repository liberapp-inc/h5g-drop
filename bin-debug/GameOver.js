// Liberapp 2019 Tahiti Katagai
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var GameOver = (function (_super) {
    __extends(GameOver, _super);
    function GameOver() {
        var _this = _super.call(this) || this;
        _this.textGameOver = null;
        _this.textScore = null;
        _this.textGameOver = Util.newTextField("GAME OVER", Util.width / 11, FONT_COLOR, 0.5, 0.45, true, false);
        GameObject.display.addChild(_this.textGameOver);
        if (ScoreMeter.I) {
            if (ScoreMeter.I.point >= ScoreMeter.I.bestScore) {
                egret.localStorage.setItem(SAVE_KEY_BESTSCORE, ScoreMeter.I.point.toFixed()); // string
            }
            _this.textScore = Util.newTextField("SCORE : " + ScoreMeter.I.point.toFixed() + "m", Util.width / 14, FONT_COLOR, 0.5, 0.55, true, false);
            GameObject.display.addChild(_this.textScore);
        }
        GameObject.display.once(egret.TouchEvent.TOUCH_BEGIN, function (e) { return _this.touchBegin(e); }, _this);
        return _this;
    }
    GameOver.prototype.onDestroy = function () {
        GameObject.display.removeChild(this.textGameOver);
        this.textGameOver = null;
        if (this.textScore) {
            GameObject.display.removeChild(this.textScore);
            this.textScore = null;
        }
    };
    GameOver.prototype.update = function () { };
    GameOver.prototype.touchBegin = function (e) {
        var _this = this;
        GameObject.display.once(egret.TouchEvent.TOUCH_TAP, function (e) { return _this.tap(e); }, this);
    };
    GameOver.prototype.tap = function (e) {
        GameObject.transit = Game.loadSceneTitle;
        this.destroy();
    };
    return GameOver;
}(GameObject));
__reflect(GameOver.prototype, "GameOver");
//# sourceMappingURL=GameOver.js.map