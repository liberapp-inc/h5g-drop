// Liberapp 2019 - Tahiti Katagai

class ScoreTime extends GameObject{

    static I:ScoreTime = null;   // singleton instance

    frame:number = 0;
    time:number = 0;
    bestTime:number = 0;
    textTime:egret.TextField = null;
    textBest:egret.TextField = null;

    constructor() {
        super();

        ScoreTime.I = this;
        this.frame = 0;
        this.textTime = Util.newTextField("0.00Sec", Util.width / 22, FONT_COLOR, 0.5, 0.0, true, true);
        GameObject.display.addChild( this.textTime );

        this.setTextBest();
    }

    setTextBest(){
        let bestTime = egret.localStorage.getItem(SAVE_KEY_BESTTIME+Game.stage); // string
        if( bestTime == null ){
            bestTime = "9900";
            egret.localStorage.setItem(SAVE_KEY_BESTTIME+Game.stage, bestTime);
        }
        this.bestTime = parseInt( bestTime ) / 100;

        if( this.textBest ) GameObject.display.removeChild( this.textBest );
        this.textBest = Util.newTextField("BEST:" + this.bestTime.toFixed(2) + "sec", Util.width / 22, FONT_COLOR, 0.0, 0.0, true, true);
        GameObject.display.addChild( this.textBest );
    }
    
    onDestroy() {
        GameObject.display.removeChild( this.textTime );
        this.textTime = null;
        GameObject.display.removeChild( this.textBest );
        this.textBest = null;
        ScoreTime.I = null;
    }

    update() {
        if( this.frame == 0 && Player.I.state == Player.I.stateNone ){
            return;
        }

        this.time += 1/60;
        this.textTime.text = "" + this.time.toFixed(2) + "sec";
    }
}
