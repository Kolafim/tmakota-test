import GameApp from './App01';

let initGame = () => {
        let config = {width:800,height:600,bg:0xffffff,x:100,y:100,radius:25}
        let app = new GameApp(config);
        app.load();
        let mobile = isMobile();
        if (mobile) {window.scrollTo(0, 1);}
}

function isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
window.onload = initGame;
