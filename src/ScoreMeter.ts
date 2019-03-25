// Liberapp 2019 - Tahiti Katagai

class ScoreMeter extends GameObject{

    static I:ScoreMeter = null;   // singleton instance

    point:number = 0;
    bestScore:number = 0;
    text:egret.TextField = null;
    textBest:egret.TextField = null;

    constructor() {
        super();

        ScoreMeter.I = this;
        this.point = 0;
        this.text = Util.newTextField("0m", Util.width / 22, FONT_COLOR, 0.5, 0.0, true, true);
        GameObject.display.addChild( this.text );

        let bestScore = egret.localStorage.getItem(SAVE_KEY_BESTSCORE); // string
        if( bestScore == null ){
            bestScore = "50";
            egret.localStorage.setItem(SAVE_KEY_BESTSCORE, bestScore);
        }
        this.bestScore = parseInt( bestScore );
        this.textBest = Util.newTextField("BEST:" + bestScore + "m", Util.width / 22, FONT_COLOR, 0.0, 0.0, true, true);
        GameObject.display.addChild( this.textBest );
    }
    
    onDestroy() {
        GameObject.display.removeChild( this.text );
        this.text = null;
        GameObject.display.removeChild( this.textBest );
        this.textBest = null;
        ScoreMeter.I = null;
    }

    update() {
        this.point += Player.I.scrollSpeed / Util.height * 10;
        this.text.text = "" + this.point.toFixed() + "m";
        if( this.bestScore < this.point ){
            this.bestScore = this.point;
            this.textBest.text = "BEST:" + this.point.toFixed();
        }
    }

    breakBlock(){
        this.point += 1;
    }
}
