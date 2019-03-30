// Liberapp 2019 - Tahiti Katagai
// タイムアタックのゴールライン

class FinishLine extends GameObject{

    constructor( y:number ) {
        super();

        this.shape = new egret.Shape();
        GameObject.display.addChild(this.shape);
        GameObject.display.setChildIndex(this.shape, 2);
        this.shape.graphics.beginFill(OBSTACLE_COLOR);
        this.shape.graphics.drawRect(-0.5*Util.width, -0.5*Util.height/200, Util.width, Util.height/200);
        this.shape.graphics.endFill();
        this.shape.x = 0.5 * Util.width;
        this.shape.y = y;
    }

    update() {
        this.shape.y -= Player.I.scrollSpeed;

        if( Player.I.state == Player.I.stateDrop && this.shape.y <= Player.I.shape.y ){
            new GameClear();
            Player.I.setStateNone();
        }
    }
}
