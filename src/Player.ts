// Liberapp 2019 - Tahiti Katagai
// プレイヤーボール　重力落下

class Player extends GameObject{

    static I:Player = null;
    buttonLR:ButtonLR;

    radius:number;
    vx:number = 0;
    vy:number = 0;
    scrollSpeed:number = 0;
    scrollTotal:number = 0;
    minScrollSpeed:number;
    hardRate:number = 0;
    state:()=>void = this.stateNone;

    constructor() {
        super();

        Player.I = this;
        this.buttonLR = new ButtonLR();
        this.radius = BALL_SIZE_PER_WIDTH * Util.width * 0.5;
        this.minScrollSpeed = Util.height / (60 * 16);
        this.vy = this.minScrollSpeed;
        this.setShape( 0.5*Util.width, 0.3*Util.height, this.radius);
    }

    onDestroy(){
        Player.I = null;
    }

    setShape(x:number, y:number, radius:number){
        if( this.shape == null ){
            this.shape = new egret.Shape();
            GameObject.display.addChild(this.shape);
            GameObject.display.setChildIndex(this.shape, 3);
        }else{
            this.shape.graphics.clear();
        }
        
        this.shape.graphics.beginFill(PLAYER_COLOR);
        this.shape.graphics.drawCircle(0, 0, radius);
        this.shape.graphics.endFill();
        this.shape.x = x;
        this.shape.y = y;
    }
    
    update() {
        this.state();
    }

    stateNone(){}

    stateDrop() {
        // 移動処理
        this.move();
        this.scrollSpeed = Math.max( this.vy, this.minScrollSpeed );
        this.scrollTotal += this.scrollSpeed;
        this.hardRate = Util.clamp( this.scrollTotal / (Util.height * 40), 0, 1 ); // 0.0~1.0
        console.log( "hard " + (this.hardRate*100).toFixed() );
        
        this.shape.x += this.vx;
        this.shape.y += this.vy - this.scrollSpeed;
        this.vx *= 0.96;
        this.vy *= 0.97 + 0.01 * this.hardRate;
        this.vy += this.radius * 0.014;

        // Targetとの反射
        Obstacle.obstacles.forEach( obstacle => {
            let dx = obstacle.shape.x - this.shape.x;
            let dy = obstacle.shape.y - this.shape.y;
            let dd = dx**2 + dy**2;
            let rr = (obstacle.radius + this.radius) ** 2;
            if( dd < rr ){
                let l = Math.sqrt( dd );
                let udx = dx / l;
                let udy = dy / l;

                let dot = udx * this.vx + udy * this.vy;
                if( dot > 0 ){
                    this.vx += -2 * 0.95 * dot * udx;
                    this.vy += -2 * 0.93 * dot * udy;
                    let minSpeed = (this.radius * 0.2);
                    l = this.vx**2 + this.vy**2;
                    if( l < minSpeed**2 ) {
                        l = minSpeed / Math.sqrt( l );
                        this.vx *= l;
                        this.vy *= l;
                    }
                    obstacle.hit();
                }
            }
        });

        this.boundWall();
    }

    // 壁で跳ね返り
    boundWall(){
        let x = this.shape.x - Util.width*0.5;
        let wide = Util.width*0.5 - this.radius;

        if( x**2 > wide**2 ) {
            this.shape.x = Util.clamp( this.shape.x, this.radius, Util.width - this.radius );
            this.vx *= -0.5;
        }

        if( this.vy < 0 && this.shape.y < this.radius ) {
            new GameOver();
            this.scrollSpeed = 0;
            this.state = this.stateNone;
        }
    }

    move(){
        if( this.buttonLR.left ){
            this.vx -= this.radius * (1/20);
        }
        if( this.buttonLR.right ){
            this.vx += this.radius * (1/20);
        }
        this.vx = Util.clamp( this.vx, -this.radius, +this.radius );
    }
}
