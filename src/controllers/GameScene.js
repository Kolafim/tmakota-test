export default class GameScene {
	constructor(config){
		// this.renderer = new PIXI.autoDetectRenderer(config.width, config.height);
		this.renderer = new PIXI.autoDetectRenderer({
		    width: config.width,
		    height: config.height,
		    antialias: true,
		    transparent: false,
		    resolution: 1
		});
		document.body.appendChild(this.renderer.view);
		this.renderer.backgroundColor = config.bg;
		this.renderer.autoResize = true;
	}

	getScene(){
		this.stage = new PIXI.Container();
		this.stage.interactive = true;

		this.loop();
		return this.stage;
	}

	loop() {
		this.renderer.render(this.stage);
    	requestAnimationFrame(function(){this.loop(this.stage)}.bind(this));
    }
}
