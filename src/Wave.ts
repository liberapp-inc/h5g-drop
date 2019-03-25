// Liberapp 2019 - Tahiti Katagai
// 障害物の配置

class Wave extends GameObject{

    rand:Random;
    nextWave:number = 0;
    finishLine:FinishLine = null;

    static seeds:number[] = [ 0, 0, 0, 0 ];
    static stageLength:number[] = [ 0, 100, 160, 250 ];
    static stageHardRate:number[] = [ 0, 0.4, 0.6, 0.8 ];

    constructor( stage:number )  {
        super();

        console.log( stage );

        // random seed 
        let seed = Date.now();
        if( stage > 0 )
            seed = stage * 0x1dea + 1 + Wave.seeds[ stage-1 ];
        this.rand = new Random( seed );
    }

    onDestroy(){
    }

    update() {

        // time attack stage
        if( ScoreTime.I ){
            if( Player.I.scrollTotal / Util.height * 10 >= Wave.stageLength[ Game.stage ] - 10 ){
                if( this.finishLine == null ){
                    this.finishLine = new FinishLine(Util.height);
                }
                return;
            }
        }

        let r = OBSTACLE_RADIUS_PER_WIDTH * Util.width * 2;
        let xrd = 2.0 - 0.5 * Player.I.hardRate;

        while( this.nextWave <= Player.I.scrollTotal ){
            this.nextWave += this.rand.i( 1, 4 ) * Util.height / OBSTACLES_IN_HEIGHT;

            let xr = this.rand.v() * xrd;
            while( xr<1 ){
                new Obstacle( xr * Util.width, Util.height+r, r * this.rand.f(0.5, 1.0) );
                xr += this.rand.f( OBSTACLE_SIZE_PER_WIDTH, xrd );
            }
        }
    }
}
