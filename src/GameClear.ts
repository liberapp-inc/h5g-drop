// Liberapp 2019 Tahiti Katagai
//　タイムアタックをクリアしたときの処理

class GameClear extends GameObject{

    texts:egret.TextField[] = [];
    newRecord:boolean = true;

    constructor() {
        super();

        if( ScoreTime.I.time < ScoreTime.I.bestTime ){
            egret.localStorage.setItem(SAVE_KEY_BESTTIME+Game.stage, (ScoreTime.I.time * 100).toFixed() ); // string
            ScoreTime.I.setTextBest();
            this.newRecord = true;
        }
        this.texts[0] = Util.newTextField("CLEAR!", Util.width / 10, FONT_COLOR, 0.5, 0.45, true, false);
        this.texts[1] = Util.newTextField("TIME : " + ScoreTime.I.textTime.text, Util.width / 14, FONT_COLOR, 0.5, 0.55, true, false);
        if( this.newRecord )
            this.texts[2] = Util.newTextField("NEW RECORD!", Util.width / 14, FONT_COLOR, 0.5, 0.65, true, false);
        this.texts.forEach( text =>{ GameObject.display.addChild( text ); });

        GameObject.display.once(egret.TouchEvent.TOUCH_BEGIN, (e: egret.TouchEvent) => this.touchBegin(e), this);
    }

    onDestroy(){
        this.texts.forEach( text =>{ GameObject.display.removeChild( text ); });
        this.texts = null;
    }
    
    update() {
        if( this.newRecord ){
            this.texts[2].alpha = 1.0 - ((Date.now() / 500) % 1);
        }
     }

    touchBegin(e:egret.TouchEvent){
        GameObject.display.once(egret.TouchEvent.TOUCH_TAP, (e: egret.TouchEvent) => this.tap(e), this);
    }
    tap(e:egret.TouchEvent){
        GameObject.transit = Game.loadSceneTitle;
        this.destroy();
    }
}
