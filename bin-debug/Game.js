// Liberapp 2019 - Tahiti Katagai
// ゲームシーン
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BALL_SIZE_PER_WIDTH = 1 / 16;
var BALL_RADIUS_PER_WIDTH = BALL_SIZE_PER_WIDTH * 0.5;
var OBSTACLE_SIZE_PER_WIDTH = 1 / 8;
var OBSTACLE_RADIUS_PER_WIDTH = OBSTACLE_SIZE_PER_WIDTH * 0.5;
var OBSTACLES_IN_HEIGHT = 10;
var SAVE_KEY_BESTSCORE = "drop-bestScore";
var BACK_COLOR = 0xeee2dc;
var FONT_COLOR = 0x123c69;
var PLAYER_COLOR = 0x123c69;
var OBSTACLE_COLOR = 0xac3b61;
var Game = (function () {
    function Game() {
    }
    Game.loadSceneGamePlay = function () {
        new Background();
        new Score();
        new Player();
        new StartMessage();
        new Wave(0);
    };
    return Game;
}());
__reflect(Game.prototype, "Game");
//# sourceMappingURL=Game.js.map