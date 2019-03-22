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
        
        this.shape.graphics.beginFill(OBSTACLE_COLOR);
        this.shape.graphics.drawCircle(0, 0, radius);
        this.shape.graphics.endFill();
        this.shape.x = x;
        this.shape.y = y;
    }

    update() {
        this.shape.y -= Player.I.scrollSpeed;

        this.scaleAnim();

        if( this.shape.y + this.radius *0.5 <= 0 )
            this.destroy();
    }

    scaleAnim(){
        if( this.animFrame > 0 ) {
            this.animFrame--;
            let scale = 1 + 0.4 * this.animFrame / this.animFrameMax;
            this.shape.scaleX = this.shape.scaleY = scale;
        }
    }

    // ヒット
    hit(){
        this.animFrame = this.animFrameMax;
        this.radius *= 0.8;
        this.setShape( this.shape.x, this.shape.y, this.radius );
        this.scaleAnim();
    }
}
