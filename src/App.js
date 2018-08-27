import * as PIXI from 'pixi.js'
import GameScene from './controllers/GameScene';
import Controls from './controllers/ControlsCotnroller';
import Player from './controllers/PlayerController';
import Enemy from './controllers/EnemyController';
import Manager from './controllers/Manager';
import GamePlay from './controllers/GamePlay';

export default class GameApp {

	constructor(config){
		this.stage = new GameScene(config).getScene();
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
		let manager = new Manager(this.config);
		new GamePlay(manager);

		let ballContainer = new PIXI.Container();
		this.gridContainer = new PIXI.Container();
		// console.log(this.stage);
		// console.log(this.gridContainer);
        let controlsContainer = new PIXI.Container();

		this.stage.addChild(ballContainer);
		this.stage.addChild(this.gridContainer);
        this.stage.addChild(controlsContainer);

		this.player = new Enemy(manager, ballContainer);

		this.player = new Player(manager, ballContainer);
		this.player.addBall();

		this.controls = new Controls(manager, controlsContainer);
		this.controls.makeControls();

		this.makeGrid();
		this.makeSprite()
	}

	makeGrid(){
		var texture = PIXI.Texture.fromImage(this.loader.resources.grid.url);
		for (let n = 0; n < 7; n ++){
			let grid = new PIXI.Sprite(texture);
			grid.position.x = this.originX + (this.radius * 2) * n;
			grid.position.y = this.originY;
			this.gridContainer.addChild(grid);
		}
	}
	makeSprite(){

	}


}
