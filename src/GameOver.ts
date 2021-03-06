// Liberapp 2019 Tahiti Katagai

class GameOver extends GameObject{

    textGameOver:egret.TextField = null;
    textScore:egret.TextField = null;

    constructor() {
        super();

        this.textGameOver = Util.newTextField("GAME OVER", Util.width / 11, FONT_COLOR, 0.5, 0.45, true, false);
        GameObject.display.addChild( this.textGameOver );
        
        if( ScoreMeter.I ){
            if( ScoreMeter.I.point >= ScoreMeter.I.bestScore ){
                egret.localStorage.setItem(SAVE_KEY_BESTSCORE, ScoreMeter.I.point.toFixed() ); // string
            }
            this.textScore = Util.newTextField("SCORE : " + ScoreMeter.I.point.toFixed() + "m", Util.width / 14, FONT_COLOR, 0.5, 0.55, true, false);
            GameObject.display.addChild( this.textScore );
        }
        GameObject.display.once(egret.TouchEvent.TOUCH_BEGIN, (e: egret.TouchEvent) => this.touchBegin(e), this);
    }

    onDestroy() {
        GameObject.display.removeChild( this.textGameOver );
        this.textGameOver = null;
        if( this.textScore ){
            GameObject.display.removeChild( this.textScore );
            this.textScore = null;
        }
    }
    
    update() { }

    touchBegin(e:egret.TouchEvent){
        GameObject.display.once(egret.TouchEvent.TOUCH_TAP, (e: egret.TouchEvent) => this.tap(e), this);
    }
    tap(e:egret.TouchEvent){
        GameObject.transit = Game.loadSceneTitle;
        this.destroy();
    }
}
