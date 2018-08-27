export default class Manager {
	
	constructor(config){
		this.observerMap = {};
		this.notifications = ['left','right','down','end','enemy','cheked1','cheked2','over','restart'];
		this.config = config;
	}
	
	register(controller){        
        this.notifications.map((notificationName) => {
			if (this.observerMap[notificationName] != null) {
				this.observerMap[notificationName].push(controller);
			} else {
				this.observerMap[notificationName] = [controller];
			}	
		});
	}
	
	send(notificationName, data){
		let controllers = this.observerMap[notificationName];
		if (controllers != null) controllers.map(c => c.handleNotification(notificationName, data));
	}
	
}