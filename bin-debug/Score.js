// Liberapp 2019 - Tahiti Katagai
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
var Score = (function (_super) {
    __extends(Score, _super);
    function Score() {
        var _this = _super.call(this) || this;
        _this.point = 0;
        _this.bestScore = 0;
        _this.text = null;
        _this.textBest = null;
        Score.I = _this;
        _this.point = 0;
        _this.text = Util.newTextField("0m", Util.width / 22, FONT_COLOR, 0.5, 0.0, true);
        GameObject.display.addChild(_this.text);
        var bestScore = egret.localStorage.getItem(SAVE_KEY_BESTSCORE); // string
        if (bestScore == null) {
            bestScore = "50";
            egret.localStorage.setItem(SAVE_KEY_BESTSCORE, bestScore);
        }
        _this.bestScore = parseInt(bestScore);
        _this.textBest = Util.newTextField("BEST:" + bestScore + "m", Util.width / 22, FONT_COLOR, 0.0, 0.0, true);
        GameObject.display.addChild(_this.textBest);
        return _this;
    }
    Score.prototype.onDestroy = function () {
        GameObject.display.removeChild(this.text);
        this.text = null;
        GameObject.display.removeChild(this.textBest);
        this.textBest = null;
        Score.I = null;
    };
    Score.prototype.update = function () {
        this.point += Player.I.scrollSpeed / Util.height * 10;
        this.text.text = "" + this.point.toFixed() + "m";
        if (this.bestScore < this.point) {
            this.bestScore = this.point;
            this.textBest.text = "BEST:" + this.point.toFixed();
        }
    };
    Score.prototype.breakBlock = function () {
        this.point += 1;
    };
    Score.I = null; // singleton instance
    return Score;
}(GameObject));
__reflect(Score.prototype, "Score");
//# sourceMappingURL=Score.js.map