// Liberapp 2019 - Tahiti Katagai
// ゲームシーン

const BALL_SIZE_PER_WIDTH = 1/16;
const BALL_RADIUS_PER_WIDTH = BALL_SIZE_PER_WIDTH * 0.5;
const OBSTACLE_SIZE_PER_WIDTH = 1/8;
const OBSTACLE_RADIUS_PER_WIDTH = OBSTACLE_SIZE_PER_WIDTH * 0.5;
const OBSTACLES_IN_HEIGHT = 10;

const SAVE_KEY_BESTSCORE = "drop-bestScore";

const BACK_COLOR = 0xeee2dc;
const FONT_COLOR = 0x123c69;
const PLAYER_COLOR = 0x123c69;
const OBSTACLE_COLOR = 0xac3b61;

class Game {

    static loadSceneGamePlay() {
        new Background();
        new Score();
        new Player();
        new StartMessage();
        new Wave( 0 );
    }
}
