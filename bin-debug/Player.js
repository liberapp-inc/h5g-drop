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
        _this.scroll = 0;
        _this.state = _this.stateNone;
        _this.touchX = -1;
        _this.offsetX = 0;
        Player.I = _this;
        _this.radius = BALL_SIZE_PER_WIDTH * Util.width * 0.5;
        _this.setShape(0.5 * Util.width, 0.2 * Util.height, _this.radius);
        _this.vx = 0;
        _this.vy = 0;
        GameObject.display.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) { return _this.touchBegin(e); }, _this);
        GameObject.display.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, function (e) { return _this.touchMove(e); }, _this);
        GameObject.display.stage.addEventListener(egret.TouchEvent.TOUCH_END, function (e) { return _this.touchEnd(e); }, _this);
        return _this;
    }
    Player.prototype.onDestroy = function () {
        var _this = this;
        GameObject.display.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) { return _this.touchBegin(e); }, this);
        GameObject.display.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, function (e) { return _this.touchMove(e); }, this);
        GameObject.display.stage.removeEventListener(egret.TouchEvent.TOUCH_END, function (e) { return _this.touchEnd(e); }, this);
        Player.I = null;
    };
    Player.prototype.setShape = function (x, y, radius) {
        if (this.shape == null) {
            this.shape = new egret.Shape();
            GameObject.display.addChild(this.shape);
        }
        else {
            this.shape.graphics.clear();
        }
        this.shape.graphics.beginFill(0x00c0ff);
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
        this.scroll = this.vy;
        this.shape.x += this.vx;
        this.vx *= 0.95;
        this.vy *= 0.95;
        this.vy += this.radius * 0.05;
        // Targetとの接触判定（一番近いもの）
        var nearest = null;
        var ndd = 0;
        Obstacle.obstacles.forEach(function (obstacle) {
            var dx = obstacle.shape.x - _this.shape.x;
            var dy = obstacle.shape.y - _this.shape.y;
            var dd = Math.pow(dx, 2) + Math.pow(dy, 2);
            if (!nearest) {
                var rr = Math.pow((obstacle.radius + _this.radius), 2);
                if (dd < rr) {
                    nearest = obstacle;
                    ndd = dd;
                }
            }
            else {
                if (ndd > dd) {
                    nearest = obstacle;
                    ndd = dd;
                }
            }
        });
        // 反射
        if (nearest) {
            var dx = this.shape.x - nearest.shape.x;
            var dy = this.shape.y - nearest.shape.y;
            var l = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
            var udx = dx / l;
            var udy = dy / l;
            var dot = udx * this.vx + udy * this.vy;
            if (dot < 0) {
                this.vx += -2 * 0.90 * dot * udx;
                this.vy += -2 * 0.90 * dot * udy;
                var minSpeed = (this.radius * 0.2);
                l = Math.pow(this.vx, 2) + Math.pow(this.vy, 2);
                if (l < Math.pow(minSpeed, 2)) {
                    l = minSpeed / Math.sqrt(l);
                    this.vx *= l;
                    this.vy *= l;
                }
                nearest.applyDamage(1, -udx, -udy);
            }
        }
        this.boundWall();
    };
    // 壁で跳ね返り
    Player.prototype.boundWall = function () {
        if (Math.pow((this.shape.x - Util.width * 0.5), 2) > Math.pow((Util.width * 0.5 - this.radius), 2)) {
            this.shape.x -= this.vx;
            this.vx *= -0.5;
        }
        if (this.vy < 0 && this.shape.y < this.radius) {
            this.shape.y -= this.vy;
            this.vy *= -0.5;
        }
        // 下に落ちたら消える
        if (this.shape.y - this.radius < 0) {
            new GameOver();
            this.state = this.stateNone;
        }
    };
    Player.prototype.touchBegin = function (e) {
        if (this.state == this.stateNone)
            return;
        this.touchX = e.localX;
    };
    Player.prototype.touchMove = function (e) {
        if (this.state == this.stateNone)
            return;
        this.touchX = e.localX;
    };
    Player.prototype.touchEnd = function (e) {
        if (this.state == this.stateNone)
            return;
        this.touchX = -1;
    };
    Player.prototype.move = function () {
        if (this.touchX >= 0) {
            if (this.touchX < Util.width * 0.5) {
                this.vx -= this.radius * (1 / 16);
            }
            else {
                this.vx += this.radius * (1 / 16);
            }
            this.vx = Util.clamp(this.vx, -this.radius, +this.radius);
        }
    };
    Player.I = null;
    return Player;
}(GameObject));
__reflect(Player.prototype, "Player");
//# sourceMappingURL=Player.js.map