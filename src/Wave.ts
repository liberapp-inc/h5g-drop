// Liberapp 2019 - Tahiti Katagai
// 障害物の配置

class Wave extends GameObject{

    rand:Random;

    scrollTotal:number = 0;
    next:number = 0;
    wave:number = 0;

    static seeds:number[] = [ 0, 0, 0, 0, 0,  0, 0, 0, 0, 0 ];

    constructor( stage:number )  {
        super();

        // random seed 
        let seed = Date.now();
        if( stage > 0 )
            seed = stage * 765 + 1 + Wave.seeds[ stage-1 ];
        this.rand = new Random( seed );
    }

    onDestroy(){
    }

    update() {
        this.scrollTotal += Player.I.scrollSpeed;

        let hardRate = Util.clamp( this.scrollTotal / 500, 0, 1 ); // 0.0~1.0
        let r = OBSTACLE_RADIUS_PER_WIDTH * Util.width * 2;
        let xrd = 2.0 - 1.0 * hardRate;

        while( this.next <= this.scrollTotal ){
            this.next += this.rand.i( 1, 4 ) * Util.height / OBSTACLES_IN_HEIGHT;

            let xr = this.rand.v() * xrd;
            while( xr<1 ){
                new Obstacle( xr * Util.width, Util.height+r, r * this.rand.f(0.5, 1.0) );
                xr += this.rand.f( OBSTACLE_SIZE_PER_WIDTH, xrd );
            }
        }
    }
}
