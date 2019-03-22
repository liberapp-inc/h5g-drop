// Liberapp 2019 Tahiti Katagai

class GameOver extends GameObject{

    textGameOver:egret.TextField = null;
    textScore:egret.TextField = null;

    constructor() {
        super();

        this.textGameOver = Util.newTextField("GAME OVER", Util.width / 11, FONT_COLOR, 0.5, 0.45, true, false);
        GameObject.display.addChild( this.textGameOver );
        
        this.textScore = Util.newTextField("SCORE : " + Score.I.point.toFixed() + "m", Util.width / 14, FONT_COLOR, 0.5, 0.55, true, false);
        GameObject.display.addChild( this.textScore );

        if( Score.I.point >= Score.I.bestScore ){
            egret.localStorage.setItem(SAVE_KEY_BESTSCORE, Score.I.point.toFixed() ); // string
        }
        GameObject.display.once(egret.TouchEvent.TOUCH_BEGIN, (e: egret.TouchEvent) => this.touchBegin(e), this);
    }

    onDestroy() {
        GameObject.display.removeChild( this.textGameOver );
        this.textGameOver = null;
        GameObject.display.removeChild( this.textScore );
        this.textScore = null;
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
