// Liberapp 2019 - Tahiti Katagai
// プレイヤーボール　重力落下
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
var Player = (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super.call(this) || this;
        _this.vx = 0;
        _this.vy = 0;
        _this.scrollSpeed = 0;
        _this.scrollTotal = 0;
        _this.state = _this.stateNone;
        Player.I = _this;
        _this.buttonLR = new ButtonLR();
        _this.radius = BALL_SIZE_PER_WIDTH * Util.width * 0.5;
        _this.setShape(0.5 * Util.width, 0.3 * Util.height, _this.radius);
        _this.vx = 0;
        _this.vy = 0;
        return _this;
    }
    Player.prototype.onDestroy = function () {
        Player.I = null;
    };
    Player.prototype.setShape = function (x, y, radius) {
        if (this.shape == null) {
            this.shape = new egret.Shape();
            GameObject.display.addChild(this.shape);
            GameObject.display.setChildIndex(this.shape, 3);
        }
        else {
            this.shape.graphics.clear();
        }
        this.shape.graphics.beginFill(PLAYER_COLOR);
        this.shape.graphics.drawCircle(0, 0, radius);
        this.shape.graphics.endFill();
        this.shape.x = x;
        this.shape.y = y;
    };
    Player.prototype.update = function () {
        this.state();
    };
    Player.prototype.stateNone = function () { };
    Player.prototype.stateDrop = function () {
        var _this = this;
        // 移動処理
        this.move();
        this.scrollSpeed = Util.clamp(this.vy, Util.height / 768, 999);
        this.scrollTotal += this.scrollSpeed;
        this.shape.x += this.vx;
        this.shape.y += this.vy - this.scrollSpeed;
        this.vx *= 0.96;
        this.vy *= 0.97;
        this.vy += this.radius * 0.015;
        // Targetとの反射
        Obstacle.obstacles.forEach(function (obstacle) {
            var dx = obstacle.shape.x - _this.shape.x;
            var dy = obstacle.shape.y - _this.shape.y;
            var dd = Math.pow(dx, 2) + Math.pow(dy, 2);
            var rr = Math.pow((obstacle.radius + _this.radius), 2);
            if (dd < rr) {
                var l = Math.sqrt(dd);
                var udx = dx / l;
                var udy = dy / l;
                var dot = udx * _this.vx + udy * _this.vy;
                if (dot > 0) {
                    _this.vx += -2 * 0.95 * dot * udx;
                    _this.vy += -2 * 0.95 * dot * udy;
                    var minSpeed = (_this.radius * 0.2);
                    l = Math.pow(_this.vx, 2) + Math.pow(_this.vy, 2);
                    if (l < Math.pow(minSpeed, 2)) {
                        l = minSpeed / Math.sqrt(l);
                        _this.vx *= l;
                        _this.vy *= l;
                    }
                    obstacle.hit();
                }
            }
        });
        this.boundWall();
    };
    // 壁で跳ね返り
    Player.prototype.boundWall = function () {
        var x = this.shape.x - Util.width * 0.5;
        var wide = Util.width * 0.5 - this.radius;
        if (Math.pow(x, 2) > Math.pow(wide, 2)) {
            this.shape.x = Util.clamp(this.shape.x, this.radius, Util.width - this.radius);
            this.vx *= -0.5;
        }
        if (this.vy < 0 && this.shape.y < this.radius) {
            new GameOver();
            this.scrollSpeed = 0;
            this.state = this.stateNone;
        }
    };
    Player.prototype.move = function () {
        if (this.buttonLR.left) {
            this.vx -= this.radius * (1 / 20);
        }
        if (this.buttonLR.right) {
            this.vx += this.radius * (1 / 20);
        }
        this.vx = Util.clamp(this.vx, -this.radius, +this.radius);
    };
    Player.I = null;
    return Player;
}(GameObject));
__reflect(Player.prototype, "Player");
//# sourceMappingURL=Player.js.map