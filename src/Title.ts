// Liberapp 2019 - Tahiti Katagai
// タイトルシーン

class Title extends GameObject{

    texts:egret.TextField[] = [];

    btnTexts:egret.TextField[] = [];
    btnShapes:egret.Shape[] = [];
    
    constructor() {
        super();

        this.texts[0] = Util.newTextField("DROP", Util.width / 10, FONT_COLOR, 0.5, 0.2, true, false);
        this.texts[1] = Util.newTextField("ぶつからずに落ちろ！", Util.width / 18, FONT_COLOR, 0.5, 0.3, true, false);
        this.texts[2] = Util.newTextField("タイムアタックコース", Util.width / 18, FONT_COLOR, 0.5, 0.7, true, false);

        // Endless
        this.newButton( 0, "スタート", Util.width/15, FONT_COLOR, 0.50, 0.50, 0.40, 0.10 );

        // time attack
        this.newButton( 1, "1", Util.width/15, FONT_COLOR, 0.25, 0.80, 0.15, 0.08 );
        this.newButton( 2, "2", Util.width/15, FONT_COLOR, 0.50, 0.80, 0.15, 0.08 );
        this.newButton( 3, "3", Util.width/15, FONT_COLOR, 0.75, 0.80, 0.15, 0.08 );

        this.texts.forEach( text => { GameObject.display.addChild( text ); });
        this.btnTexts.forEach( text => { GameObject.display.addChild( text ); });
    }

    onDestroy(){
        this.texts.forEach( text => { GameObject.display.removeChild( text ); });
        this.btnTexts.forEach( text => { GameObject.display.removeChild( text ); });
        this.btnShapes.forEach( shape => { GameObject.display.removeChild( shape ); });
        this.texts = null;
        this.btnTexts = null;
        this.btnShapes = null;
    }

    newButton( i:number, text:string, size:number, color:number, x:number, y:number, w:number, h:number ){
        this.btnTexts[i] = Util.newTextField(text, Util.width / 15, BACK_COLOR, x, y, true, false);
        let shape = new egret.Shape();
        GameObject.display.addChild(shape);
        GameObject.display.setChildIndex(shape, 1);
        w *= Util.width;
        h *= Util.height;
        shape.graphics.beginFill(color);
        shape.graphics.drawRect(-0.5*w, -0.5*h, w, h);
        shape.graphics.endFill();
        shape.touchEnabled = true;
        shape.x = x * Util.width;
        shape.y = y * Util.height;
        shape.once(egret.TouchEvent.TOUCH_TAP, (e: egret.TouchEvent) => this.tap(e, i), this);
        this.btnShapes[i] = shape;
    }

    update() {}

    tap(e:egret.TouchEvent, index:number){
        Game.stage = index;
        GameObject.transit = Game.loadSceneGamePlay;
    }
}

