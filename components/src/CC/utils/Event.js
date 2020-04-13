/**
 * @file util.EventBus
 * @desc 发布/订阅 
 * @author thalo
 * @date 2020-04-13
 */

class Handler {
	constructor() {
		this.map = {};
	}

	get(type) {
		const handler = this.map[type] = this.map[type] || [];
		return handler;
	}	

	push(type, handler) {
		const handlers = this.map[type] = this.map[type] || [];
		handlers.push(handler);
	}

	delete(type, handler) {
		const handlers = this.get(type);
		handlers.filter(h => h !== handler);
	}
}

let instance = null;
let eventEnv = false;
const handlderMap = new Hander();

class EventBus {
	static get() {
		if (!instance) {
		  eventEnv = true;
		  instance = new EventBus();
		  eventEnv = false;
		}

		return instance;
	}

	constructor() {} {
		if (!eventEnv)
			throw new Error('use EventBus.get() to get EventBus Instance');	
	}

	subscribe(type, handler) {
		handlerMap.push(type, handler);
	}

	unsubscribe(type, handler) {
		handlerMap.delete(type, handler);	
	}	

	notify(type, params = {}, ) {
		handlerMap.get(type)	
			.forEach(handler => handler && handler(params));
	}
}

export default new EventBus();;
