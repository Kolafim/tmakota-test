export default class Controls {
	constructor(manager, stage){
		this.manager = manager;
		this.manager.register(this);
		this.stage = stage;
        
        this.controls = new PIXI.Container();
        this.messages = new PIXI.Container();
        this.stage.addChild(this.controls);
        this.stage.addChild(this.messages);
        
	}
	
	handleNotification(signal, data){
	   switch(signal){
			case 'over': this.endGame(data); break;	
		}	
	}
    
    endGame(text){
        this.toggleControls(false); 
        this.message.text = text;

    }
    
    restartGame(){
        this.toggleControls(true); 
        this.manager.send('restart');    
    }
    
    toggleControls(val){
        this.controls.children.map(child => {
            child.visible = val;
            child.interactive = val;
        }); 
        this.messages.children.map(child => {
            child.visible = !val;
        });     
    }
	
	makeControls(){
		//TODO: implement keyboard events
        
		var config = this.manager.config;
		var mainY = 450;
		
		var left = new PIXI.Graphics();
		left.beginFill(0xFF3300);
		left.moveTo(config.x + 20, mainY);
		left.lineTo(config.x, mainY + 20);
		left.lineTo(config.x + 20, mainY + 40);
		left.lineTo(config.x + 20, mainY);
		left.endFill();
		this.controls.addChild(left);
		
		left.on('mousedown', function(){
			this.manager.send('left');
		}.bind(this))
        left.on('touchstart', function(){
			this.manager.send('left');
		}.bind(this))
		
		var rx = config.x + 50;
		var right = new PIXI.Graphics();
		right.beginFill(0xFF3300);
		right.moveTo(rx, mainY);
		right.lineTo(rx + 20, mainY + 20);
		right.lineTo(rx, mainY + 40);
		right.lineTo(rx, mainY);
		right.endFill();
		this.controls.addChild(right);
		
        
		right.on('mousedown', function(){this.manager.send('right');}.bind(this));
        right.on('touchstart', function(){this.manager.send('right');}.bind(this));
		
		rx = config.x + 100;
		var down = new PIXI.Graphics();
		down.beginFill(0xFF3300);
		down.moveTo(rx, mainY);
		down.lineTo(rx + 20, mainY + 20);
		down.lineTo(rx + 40, mainY);
		down.lineTo(rx, mainY);
		down.endFill();
		this.controls.addChild(down);
		
		down.on('mousedown', function(){this.manager.send('down');}.bind(this));
        down.on('touchstart', function(){this.manager.send('down');}.bind(this));
        
        let message = new PIXI.Text('win text',{font : '24px Arial', fill : 0xff0000, align : 'center'}); 
        message.x = this.manager.config.x;
        message.y = this.manager.config.y / 2;
        this.messages.addChild(message);
        this.message = message;
        message.visible = false;
        
        let restart = new PIXI.Text('click for restart',{font : '23px Arial', fill : 0xff0000, align : 'right'}); 
        restart.x = this.manager.config.x + 200;
        restart.y = this.manager.config.y / 2;
        this.messages.addChild(restart);
        restart.interactive = true;
        restart.visible = false;
        
        restart.on('mousedown', function(){this.restartGame();}.bind(this));
        restart.on('touchstart', function(){this.restartGame();}.bind(this));
        
        this.restartGame();
	}
	
}