// Liberapp 2019 - Tahiti Katagai
// スタート時の説明テキスト

class StartMessage extends GameObject{

    text:egret.TextField[] = [];
    
    constructor() {
        super();

        this.text[0] = Util.newTextField("ボールを操作して障害物を避けろ！", Util.width / 20, 0xf0c000, 0.5, 0.4, true);
        this.text[1] = Util.newTextField("← → ボタンで左右に移動", Util.width / 28, 0xf0c000, 0.5, 0.5, true);
        GameObject.display.addChild( this.text[0] );
        GameObject.display.addChild( this.text[1] );

        GameObject.display.once(egret.TouchEvent.TOUCH_TAP, (e: egret.TouchEvent) => this.tap(e), this);
    }

    onDestroy(){
        GameObject.display.removeChild( this.text[0] );
        GameObject.display.removeChild( this.text[1] );
        this.text = null;
    }

    update() {}

    tap(e:egret.TouchEvent){
        Player.I.state = Player.I.stateDrop;
        this.destroy();
    }
}
