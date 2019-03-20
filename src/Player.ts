// Liberapp 2019 - Tahiti Katagai
// プレイヤーボール　重力落下

class Player extends GameObject{

    static I:Player = null;
    radius:number;
    vx:number = 0;
    vy:number = 0;
    scroll:number = 0;
    state:()=>void = this.stateNone;

    touchX:number = -1;
    offsetX:number = 0;

    constructor() {
        super();

        Player.I = this;
        this.radius = BALL_SIZE_PER_WIDTH * Util.width * 0.5;
        this.setShape( 0.5*Util.width, 0.2*Util.height, this.radius);
        this.vx = 0;
        this.vy = 0;

        GameObject.display.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e: egret.TouchEvent) => this.touchBegin(e), this);
        GameObject.display.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, (e: egret.TouchEvent) => this.touchMove(e), this);
        GameObject.display.stage.addEventListener(egret.TouchEvent.TOUCH_END, (e: egret.TouchEvent) => this.touchEnd(e), this);
    }

    onDestroy(){
        GameObject.display.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, (e: egret.TouchEvent) => this.touchBegin(e), this);
        GameObject.display.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, (e: egret.TouchEvent) => this.touchMove(e), this);
        GameObject.display.stage.removeEventListener(egret.TouchEvent.TOUCH_END, (e: egret.TouchEvent) => this.touchEnd(e), this);
        Player.I = null;
    }

    setShape(x:number, y:number, radius:number){
        if( this.shape == null ){
            this.shape = new egret.Shape();
            GameObject.display.addChild(this.shape);
        }else{
            this.shape.graphics.clear();
        }
        
        this.shape.graphics.beginFill(0x00c0ff);
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
        this.scroll = this.vy;
        this.shape.x += this.vx;
        this.vx *= 0.95;
        this.vy *= 0.95;
        this.vy += this.radius * 0.05;

        // Targetとの接触判定（一番近いもの）
        let nearest = null;
        let ndd = 0;
        Obstacle.obstacles.forEach( obstacle => {
            let dx = obstacle.shape.x - this.shape.x;
            let dy = obstacle.shape.y - this.shape.y;
            let dd = dx**2 + dy**2;

            if( !nearest ){
                let rr = (obstacle.radius + this.radius) ** 2;
                if( dd < rr ){
                    nearest = obstacle;
                    ndd = dd;
                }
            }
            else{
                if( ndd > dd ){
                    nearest = obstacle;
                    ndd = dd;
                }
            }
        });

        // 反射
        if( nearest ){
            let dx = this.shape.x - nearest.shape.x;
            let dy = this.shape.y - nearest.shape.y;
            let l = Math.sqrt(dx**2 + dy**2);
            let udx = dx / l;
            let udy = dy / l;

            let dot = udx * this.vx + udy * this.vy;
            if( dot < 0 ){
                this.vx += -2 * 0.90 * dot * udx;
                this.vy += -2 * 0.90 * dot * udy;
                let minSpeed = (this.radius * 0.2);
                l = this.vx**2 + this.vy**2;
                if( l < minSpeed**2 ) {
                    l = minSpeed / Math.sqrt( l );
                    this.vx *= l;
                    this.vy *= l;
                } 
                nearest.applyDamage( 1, -udx, -udy );
            }
        }

        this.boundWall();
    }

    // 壁で跳ね返り
    boundWall(){
        if( (this.shape.x - Util.width*0.5)**2 > (Util.width*0.5 - this.radius)**2 ) {
            this.shape.x -= this.vx;
            this.vx *= -0.5;
        }
        if( this.vy < 0 && this.shape.y < this.radius ) {
            this.shape.y -= this.vy;
            this.vy *= -0.5;
        }
        // 下に落ちたら消える
        if( this.shape.y - this.radius < 0 ) {
            new GameOver();
            this.state = this.stateNone;
        }
    }

    touchBegin(e:egret.TouchEvent){
        if( this.state == this.stateNone )
            return;
        this.touchX = e.localX;
    }
    touchMove(e:egret.TouchEvent){
        if( this.state == this.stateNone )
            return;
        this.touchX = e.localX;
    }
    touchEnd(e:egret.TouchEvent){
        if( this.state == this.stateNone )
            return;
        this.touchX = -1;
    }

    move(){
        if( this.touchX >= 0 ){
            if( this.touchX < Util.width * 0.5 ){
                this.vx -= this.radius * (1/16);
            }else{
                this.vx += this.radius * (1/16);
            }
            this.vx = Util.clamp( this.vx, -this.radius, +this.radius );
        }
    }
}
