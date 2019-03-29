// Liberapp 2019 - Tahiti Katagai
// ゲームシーン
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BALL_SIZE_PER_WIDTH = 1 / 16;
var BALL_RADIUS_PER_WIDTH = BALL_SIZE_PER_WIDTH * 0.5;
var OBSTACLE_SIZE_PER_WIDTH = 1 / 7;
var OBSTACLE_RADIUS_PER_WIDTH = OBSTACLE_SIZE_PER_WIDTH * 0.5;
var OBSTACLES_IN_HEIGHT = 10;
var SAVE_KEY_BESTSCORE = "drop-bestScore";
var SAVE_KEY_BESTTIME = "drop-bestTime"; // + ステージ番号
var BACK_COLOR = 0xFfFfe8; // index.htmlで設定
var FONT_COLOR = 0x0080ff;
var PLAYER_COLOR = 0x00f8ff;
var OBSTACLE_COLOR = 0x2060ff;
var OBSTACLE_COLOR2 = 0x6060ff;
var Game = (function () {
    function Game() {
    }
    Game.loadSceneTitle = function () {
        new Title();
    };
    Game.loadSceneGamePlay = function () {
        if (Game.stage == 0) {
            new ScoreMeter();
            new Player();
            new StartMessage();
            new Wave(Game.stage);
        }
        else {
            new ScoreTime();
            new Player();
            new StartMessage();
            new Wave(Game.stage);
        }
    };
    Game.stage = 0;
    return Game;
}());
__reflect(Game.prototype, "Game");
//# sourceMappingURL=Game.js.map