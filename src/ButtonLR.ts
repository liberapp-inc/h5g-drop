// Liberapp 2019 - Tahiti Katagai
// 左右ボタン表示

class ButtonLR extends GameObject{

    left:boolean = false;
    right:boolean = false;
    text:egret.TextField[] = [];

    constructor() {
        super();

        this.text[0] = Util.newTextField("◀", Util.width / 8, FONT_COLOR, 0.1, 0.9, true, false);
        this.text[1] = Util.newTextField("▶", Util.width / 8, FONT_COLOR, 0.9, 0.9, true, false);
        this.text[0].alpha = 0.5;
        this.text[1].alpha = 0.5;
        GameObject.display.addChild( this.text[0] );
        GameObject.display.addChild( this.text[1] );

        GameObject.display.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e: egret.TouchEvent) => this.touchMove(e), this);
        GameObject.display.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, (e: egret.TouchEvent) => this.touchMove(e), this);
        GameObject.display.stage.addEventListener(egret.TouchEvent.TOUCH_END, (e: egret.TouchEvent) => this.touchEnd(e), this);
    }

    onDestroy(){
        GameObject.display.removeChild( this.text[0] );
        GameObject.display.removeChild( this.text[1] );
        this.text = null;

        GameObject.display.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, (e: egret.TouchEvent) => this.touchMove(e), this);
        GameObject.display.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, (e: egret.TouchEvent) => this.touchMove(e), this);
        GameObject.display.stage.removeEventListener(egret.TouchEvent.TOUCH_END, (e: egret.TouchEvent) => this.touchEnd(e), this);
    }

    update() {}

    touchMove(e:egret.TouchEvent){
        if( this.deleteFlag )
            return;
        if( e.localX < Util.width * 0.5 ){
            this.left = true;
            this.text[0].alpha = 0.8;
            this.right = false;
            this.text[1].alpha = 0.5;
        }else{
            this.right = true;
            this.text[1].alpha = 0.8;
            this.left = false;
            this.text[0].alpha = 0.5;
        }
    }
    touchEnd(e:egret.TouchEvent){
        if( this.deleteFlag )
            return;
        this.left = false;
        this.right = false;
        this.text[0].alpha = 0.5;
        this.text[1].alpha = 0.5;
    }
}
