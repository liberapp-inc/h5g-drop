// Liberapp 2019 - Tahiti Katagai
// スタート時の説明テキスト

class StartMessage extends GameObject{

    texts:egret.TextField[] = [];
    
    constructor() {
        super();

        this.texts[0] = Util.newTextField("ボールを操作して障害物を避けろ！", Util.width / 20, FONT_COLOR, 0.5, 0.4, true, false);
        this.texts[1] = Util.newTextField("ボタンで左右に移動", Util.width / 20, FONT_COLOR, 0.5, 0.5, true, false);
        this.texts.forEach( text =>{ GameObject.display.addChild( text ); });

        GameObject.display.once(egret.TouchEvent.TOUCH_TAP, (e: egret.TouchEvent) => this.tap(e), this);
    }

    onDestroy(){
        this.texts.forEach( text =>{ GameObject.display.removeChild( text ); });
        this.texts = null;
    }

    update() {}

    tap(e:egret.TouchEvent){
        Player.I.state = Player.I.stateDrop;
        this.destroy();
    }
}
