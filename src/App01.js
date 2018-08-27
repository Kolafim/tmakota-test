import * as PIXI from 'pixi.js'
let m = 1;
export default class GameApp {

	constructor(config){
        this.stage = new PIXI.Container();
        this.renderer = new PIXI.autoDetectRenderer({
		    width: config.width,
		    height: config.height,
		    antialias: true,
		    transparent: false,
		    resolution: 1
        });
        
		document.body.appendChild(this.renderer.view);
		// this.renderer.backgroundColor = config.bg;
        this.renderer.autoResize = true;
        
        this.renderer.render(this.stage);
        
		this.originX = config.x;
		this.originY = config.y;
		this.radius = config.radius;
		this.config = config;
	}

    load(){
        //add asset loader
        this.loader = PIXI.loader; // pixi exposes a premade instance for you to use.
        this.loader.add('grid',"./static/images/column.png");
		this.loader.add('cat','https://raw.githubusercontent.com/kittykatattack/learningPixi/master/examples/images/cat.png');
        this.loader.once('complete',this.init());
		this.loader.on("progress", (load,resource)=>{
			console.log("loading: " + resource.url);
			console.log("progress: " + load.progress + "%");
		})
        this.loader.load(()=>{
			console.log("All files loaded");
		});
    }

	init(){
		// let manager = new Manager(this.config);
		// new GamePlay(manager);

		// let ballContainer = new PIXI.Container();
		// this.gridContainer = new PIXI.Container();
		// // console.log(this.stage);
		// // console.log(this.gridContainer);
        // let controlsContainer = new PIXI.Container();

		// this.stage.addChild(ballContainer);
		// this.stage.addChild(this.gridContainer);
        // this.stage.addChild(controlsContainer);

		// this.player = new Enemy(manager, ballContainer);

		// this.player = new Player(manager, ballContainer);
		// this.player.addBall();

		// this.controls = new Controls(manager, controlsContainer);
		// this.controls.makeControls();

		// this.makeGrid();
		this.makeSprite()
	}

	makeGrid(){
		let texture = PIXI.Texture.fromImage(this.loader.resources.grid.url);
		for (let n = 0; n < 7; n ++){
			let grid = new PIXI.Sprite(texture);
			grid.position.x = this.originX + (this.radius * 2) * n;
			grid.position.y = this.originY;
			this.gridContainer.addChild(grid);
		}
	}

	makeSprite(){
		let midTexture = PIXI.Texture.fromImage("cate");
		this.mid = new PIXI.Sprite(midTexture);
		// this.mid = new PIXI.extras.TilingSprite(midTexture,midTexture.baseTexture.width,midTexture.baseTexture.height);
		this.mid.position.x = 0;
		this.mid.position.y = 0;
		// this.mid.tilePosition.x = 0;
		// this.mid.tilePosition.y = 0;
		this.stage.addChild(this.mid);
		
		// requestAnimationFrame(()=>{
		// 	this.update();
		// });
		this.renderer.render(this.stage);
	}

	update(...arg) {
		// console.log(arg);
		// far.position.x -= 0.128;
		this.mid.tilePosition.x -= 0.64;

		this.renderer.render(this.stage);

		// requestAnimationFrame(this.update);
		requestAnimationFrame(()=>{
			this.update();
		});
	}

}
