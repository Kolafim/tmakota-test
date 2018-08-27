import {dataArray} from "./model/gameData";

export default class Enemy {
	constructor(manager, stage){
		this.manager = manager;
		this.manager.register(this);
        this.config = manager.config;
		this.stage = stage;
		this.roundHeight = 52;
	}
	
	handleNotification(signal, data){
		switch(signal){
			case 'cheked1': this.enemyPart(); break;	
		}
	}
	
	addBall(pos){
		let graphics = new PIXI.Graphics();
		graphics.beginFill(0xffff00);
		let r = this.config.radius;
		graphics.drawCircle(this.config.x + (pos.col * 50) + 25, (this.roundHeight * pos.row) + this.config.y + this.roundHeight / 2, r);
		graphics.endFill();
		this.stage.addChild(graphics);	
	}
	
	enemyPart(){
        let positions = this.findOriginPositions();
        if (!positions)positions = this.findFreePosition();
        if(positions){
            // TODO check player variants, prevent player win
            this.addBall(positions);
            dataArray[positions.row][positions.col] = 2;
            this.manager.send('end');
       }
       else this.manager.send('over', 'you win');
	}
    
    findOriginPositions(){
       let a = dataArray.length - 1;
       let pos = null;
       while(a >= 0){
           let row = dataArray[a];
           for(let col = 0; col < row.length; col++){
              if(row[col] == 2){
                  let hor = this.searchHorPos(a, col);
                  if(hor)pos ={"col":(col + hor),"row":a}
                // TODO  
                // let ver = this.searchVertPos(a, col); //calculate vertical variants
                // let diag = this.searchDiagPos(a, col); //calculate diagonal variants
              }
           } 
           a--;
       }  
       return pos; 
    }
    
    searchHorPos(row, col){
        let rowArray = dataArray[row];
        let nextCol = col - 1;
        let count = 0;
        let pos = null;
        let diff = 1;
        while(nextCol >=0 && rowArray[nextCol] != 1 && (!dataArray[row + 1] || dataArray[row + 1][nextCol] != 0)){
            count++;  
            if(rowArray[nextCol] == 2)diff++;
            nextCol--;      
        }
        if(count >= 3) pos = -1 * diff;
        else {
            count = 0;
            nextCol = col + 1;
            count = 0;
            diff = 1;
            while(nextCol < (rowArray.length - 1) && rowArray[nextCol] != 1 && (!dataArray[row + 1] || dataArray[row + 1][nextCol] != 0)){
                count++; 
                if(rowArray[nextCol] == 2)diff++; 
                nextCol++;      
            }
            if(count >= 3) pos = 1 * diff;    
        }
        return pos;
    }
    
    searchVertPos(row, col){
        return false;  
    }
    
    searchDiagPos(row, col){
        return false;
    }
	
	findFreePosition(){
        let noPossibleCol = [];
        let lastRow = dataArray.length - 1;
        let x = Math.floor(Math.random() * dataArray[lastRow].length);
        let find = false;
        
        while(noPossibleCol.length < dataArray[lastRow].length && !find){
                while(dataArray[lastRow] && dataArray[lastRow][x] != 0 && lastRow >= 0)lastRow--;   
                if(lastRow >= 0)find = true; 
                else {
                    noPossibleCol.push(x);   
                    lastRow = dataArray.length - 1;
                    while(noPossibleCol.indexOf(x) != -1)x = Math.floor(Math.random() * dataArray[lastRow].length);  
                }     
        }
        
        return find ? {col:x,row:lastRow} : null;
	}
}