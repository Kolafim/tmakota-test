import {dataArray} from "./model/gameData";

export default class Player {
	constructor(manager, stage){
		this.manager = manager;
		this.manager.register(this);
		this.stage = stage;
		this.roundHeight = 52;
		this.arrayIndexCol = 0;
	}
	
	handleNotification(signal){
		switch(signal){
			case 'left': this.moveBall(); break;	
			case 'right': this.moveBall(true); break;	
			case 'down': this.putDown(); break;
			case 'cheked2': this.addBall(); break;	
            case 'restart': this.clearBall(); break;	
		}
	}
    
    clearBall(){
        this.stage.removeChildren();
        this.addBall();
    }
	
	addBall(){
		this.config = this.manager.config;
		let graphics = new PIXI.Graphics();
		graphics.beginFill(0xff0000);
		let r = this.config.radius;
		graphics.drawCircle(this.config.x + r, this.config.y - r, r);
		graphics.endFill();
		this.playerBall = graphics;
		this.stage.addChild(graphics);	
	}
	
	moveBall(dir){
		let x = this.playerBall.position.x;
		if((!dir && x == 0) || (dir && x == this.config.x + (this.config.radius * 2) * 4))return;
		if(dir){
			this.arrayIndexCol++;
			this.playerBall.position.x = x + 50;	
		}else{
			this.arrayIndexCol--;
			this.playerBall.position.x = x - 50;	
		}
		
	}
	
	putDown(){
        let lastRow = dataArray.length - 1;
        while(dataArray[lastRow] && dataArray[lastRow][this.arrayIndexCol] != 0 && lastRow >= 0){
            lastRow--;    
        }
        if(lastRow < 0) return;
        dataArray[lastRow][this.arrayIndexCol] = 1;
		this.playerBall.position.y = this.roundHeight * (lastRow + 1);
		this.stableBall = this.playerBall.clone();
		this.playerBall = null;
		this.arrayIndexCol = 0;
		this.manager.send('enemy');
	}
	
	
}