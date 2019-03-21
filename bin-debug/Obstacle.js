// Liberapp 2019 - Tahiti Katagai
// ターゲットのマト
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
var Obstacle = (function (_super) {
    __extends(Obstacle, _super);
    function Obstacle(x, y, r) {
        var _this = _super.call(this) || this;
        _this.animFrameMax = 8;
        _this.animFrame = 0;
        Obstacle.obstacles.push(_this);
        _this.radius = r;
        _this.setShape(x, y, _this.radius);
        return _this;
    }
    Obstacle.prototype.onDestroy = function () {
        var _this = this;
        Obstacle.obstacles = Obstacle.obstacles.filter(function (obj) { return obj != _this; });
    };
    Obstacle.prototype.setShape = function (x, y, radius) {
        if (this.shape == null) {
            this.shape = new egret.Shape();
            GameObject.display.addChild(this.shape);
            GameObject.display.setChildIndex(this.shape, 2);
        }
        else {
            this.shape.graphics.clear();
        }
        this.shape.graphics.beginFill(OBSTACLE_COLOR);
        this.shape.graphics.drawCircle(0, 0, radius);
        this.shape.graphics.endFill();
        this.shape.x = x;
        this.shape.y = y;
    };
    Obstacle.prototype.update = function () {
        this.shape.y -= Player.I.scrollSpeed;
        this.scaleAnim();
        if (this.shape.y + this.radius <= 0)
            this.destroy();
    };
    Obstacle.prototype.scaleAnim = function () {
        if (this.animFrame > 0) {
            this.animFrame--;
            var scale = 1 + 0.2 * this.animFrame / this.animFrameMax;
            this.shape.scaleX = this.shape.scaleY = scale;
        }
    };
    // ヒット
    Obstacle.prototype.hit = function () {
        this.animFrame = this.animFrameMax;
        this.scaleAnim();
    };
    Obstacle.obstacles = [];
    return Obstacle;
}(GameObject));
__reflect(Obstacle.prototype, "Obstacle");
//# sourceMappingURL=Obstacle.js.map