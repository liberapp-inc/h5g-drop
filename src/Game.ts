// Liberapp 2019 - Tahiti Katagai
// ゲームシーン

const BALL_SIZE_PER_WIDTH = 1/16;
const BALL_RADIUS_PER_WIDTH = BALL_SIZE_PER_WIDTH * 0.5;
const OBSTACLE_SIZE_PER_WIDTH = 1/7;
const OBSTACLE_RADIUS_PER_WIDTH = OBSTACLE_SIZE_PER_WIDTH * 0.5;
const OBSTACLES_IN_HEIGHT = 10;

const SAVE_KEY_BESTSCORE = "drop-bestScore";
const SAVE_KEY_BESTTIME  = "drop-bestTime";     // + ステージ番号

const BACK_COLOR = 0xFfFfe8;    // index.htmlで設定
const FONT_COLOR = 0x0080ff;
const PLAYER_COLOR = 0x00f8ff;
const OBSTACLE_COLOR = 0x2060ff;
const OBSTACLE_COLOR2 = 0x6060ff;

class Game {

    static loadSceneTitle() {
        new Title();
    }

    static loadSceneGamePlay() {

        if( Game.stage == 0 ){
            new ScoreMeter();
            new Player();
            new StartMessage();
            new Wave( Game.stage );
        }
        else{
            new ScoreTime();
            new Player();
            new StartMessage();
            new Wave( Game.stage );
        }
    }
    
    static stage:number = 0;
}
