// Liberapp 2019 - Tahiti Katagai
// ターゲットのマト

class Obstacle extends GameObject{

    static obstacles:Obstacle[] = [];
    radius:number;
    readonly animFrameMax = 8;
    animFrame:number = 0;

    constructor( x:number, y:number, r:number ) {
        super();

        Obstacle.obstacles.push(this);
        this.radius = r;
        this.setShape(x, y, this.radius);
    }

    onDestroy(){
        Obstacle.obstacles = Obstacle.obstacles.filter( obj => obj != this );
    }

    setShape(x:number, y:number, radius:number){
        if( this.shape == null ){
            this.shape = new egret.Shape();
            GameObject.display.addChild(this.shape);
            GameObject.display.setChildIndex(this.shape, 2);
        }else{
            this.shape.graphics.clear();
        }
        this.shape.x = x;
        this.shape.y = y;
        this.shape.graphics.beginFill( 0x20f0e0 );
        this.shape.graphics.drawCircle(0, 0, radius );
        this.shape.graphics.endFill();
    }

    update() {
        this.shape.y -= Player.I.scroll;

        this.scaleAnim();

        if( this.shape.y + this.radius <= 0 )
            this.destroy();
    }

    scaleAnim(){
        if( this.animFrame > 0 ) {
            this.animFrame--;
            let scale = 1 + 0.2 * this.animFrame / this.animFrameMax;
            this.shape.scaleX = this.shape.scaleY = scale;
        }
    }

    // ヒット
    hit(){
        this.animFrame = this.animFrameMax;
        this.scaleAnim();
    }
}
