// Liberapp 2019 - Tahiti Katagai
// 左右ボタン表示
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
var Buttons = (function (_super) {
    __extends(Buttons, _super);
    function Buttons() {
        var _this = _super.call(this) || this;
        _this.text = [];
        _this.text[0] = Util.newTextField("←", Util.width / 8, 0xf0c000, 0.1, 0.9, true);
        _this.text[1] = Util.newTextField("→", Util.width / 8, 0xf0c000, 0.9, 0.9, true);
        GameObject.display.addChild(_this.text[0]);
        GameObject.display.addChild(_this.text[1]);
        return _this;
    }
    Buttons.prototype.onDestroy = function () {
        GameObject.display.removeChild(this.text[0]);
        GameObject.display.removeChild(this.text[1]);
        this.text = null;
    };
    Buttons.prototype.update = function () { };
    return Buttons;
}(GameObject));
__reflect(Buttons.prototype, "Buttons");
//# sourceMappingURL=Buttons.js.map