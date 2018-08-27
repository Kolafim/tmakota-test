import {dataArray} from "./model/gameData";

export default class GamePlay {
	constructor(manager){
		this.manager = manager;
		this.manager.register(this);
	}
	
	handleNotification(signal, data){
		switch(signal){
			case 'enemy': this.checkLine(1); break;	
            case 'end': this.checkLine(2); break;	
            case 'restart': this.clearArray(); break;	
		}
	}
    
    clearArray(){
        for(let r = 0; r < dataArray.length; r++){
            var row = dataArray[r];
            for(let c = 0; c < row.length; c++){
                dataArray[r][c] = 0;
            }
        }
    }
    
    checkLine(value){
        /// TODO: Check possible to win
       this.checking = value; 
       if(this.chekGorisontal() || this.checkVertical() || this.checkDiagonal()){
           let text = value == 1 ? 'you win!' : 'you lose!';
           this.manager.send('over', text);
       }
       else{
           this.checking == 1 ? this.manager.send('cheked1') : this.manager.send('cheked2');
       } 
   }
   
   chekGorisontal(){
       let match = false;
       let a = dataArray.length - 1;
       while(a >= 0){
           let row = dataArray[a];
           var color = 0;
           for(let col = 0; col < row.length; col++){
              if(row[col] == this.checking)color++;
              else color = 0;
              if(color == 4)match = true;
           } 
           a--;
       }  
       return match;  
   }
   
   checkVertical(){
       let match = false;
       let h = 0;
       while(h < dataArray[0].length){
        var color = 0;  
        for(let v = dataArray.length - 1; v >= 0; v--){
            if(dataArray[v][h] == this.checking)color++;
            else color = 0;
            if(color == 4)match = true;
        }
        h++;
       }  
       return match;     
   }
   
   checkDiagonal(){
       let match = false;
       let a = dataArray.length - 1;
       while(a >= 3){
           let row = dataArray[a];
           let color = 0;
           for(let col = 0; col < row.length; col++){
               if(dataArray[a][col] == this.checking){
                   if(col < 4){
                       color = 1;
                       let nextCellColl = col + 1;
                       let nextCellRow = a - 1;
                       while(color < 4 && dataArray[nextCellRow][nextCellColl] == this.checking){
                           color++;
                           nextCellColl++;
                           nextCellRow--;
                       }
                       if(color < 4)color = 1;
                   }
                   if(col > 3){
                       color = 1;
                       let nextCellColl = col-1;
                       let nextCellRow = a-1;
                       while(color < 4 && dataArray[nextCellRow][nextCellColl] == this.checking){
                           color++;
                           nextCellColl--;
                           nextCellRow--;
                       }
                       if(color < 4)color = 1;
                   }
                   if(color == 4)match = true;
               }       
           } 
           a--;
       }  
       return match; 
   }
	
	
}