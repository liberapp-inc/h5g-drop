// Liberapp 2019 - Tahiti Katagai
// スタート時の説明テキスト
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
var StartMessage = (function (_super) {
    __extends(StartMessage, _super);
    function StartMessage() {
        var _this = _super.call(this) || this;
        _this.texts = [];
        _this.texts[0] = Util.newTextField("ボールを操作して障害物を避けろ！", Util.width / 20, FONT_COLOR, 0.5, 0.4, true, false);
        _this.texts[1] = Util.newTextField("ボタンで左右に移動", Util.width / 20, FONT_COLOR, 0.5, 0.5, true, false);
        _this.texts.forEach(function (text) { GameObject.display.addChild(text); });
        GameObject.display.once(egret.TouchEvent.TOUCH_TAP, function (e) { return _this.tap(e); }, _this);
        return _this;
    }
    StartMessage.prototype.onDestroy = function () {
        this.texts.forEach(function (text) { GameObject.display.removeChild(text); });
        this.texts = null;
    };
    StartMessage.prototype.update = function () { };
    StartMessage.prototype.tap = function (e) {
        Player.I.state = Player.I.stateDrop;
        this.destroy();
    };
    return StartMessage;
}(GameObject));
__reflect(StartMessage.prototype, "StartMessage");
//# sourceMappingURL=StartMessage.js.map