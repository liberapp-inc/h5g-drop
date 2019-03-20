// Liberapp 2019 - Tahiti Katagai
// 左右ボタン表示

class Buttons extends GameObject{

    text:egret.TextField[] = [];
    
    constructor() {
        super();

        this.text[0] = Util.newTextField("←", Util.width / 8, 0xf0c000, 0.1, 0.9, true);
        this.text[1] = Util.newTextField("→", Util.width / 8, 0xf0c000, 0.9, 0.9, true);
        GameObject.display.addChild( this.text[0] );
        GameObject.display.addChild( this.text[1] );
    }

    onDestroy(){
        GameObject.display.removeChild( this.text[0] );
        GameObject.display.removeChild( this.text[1] );
        this.text = null;
    }

    update() {}
}
