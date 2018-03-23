export class Store {
	private subscribers: Function[];
	private reducers: { [key: string]: Function };
	private state: { [key: string]: any };

	constructor(reducers = {}, intitialState = {}) {
		this.subscribers = [];
		this.reducers = reducers;
		this.state = this.reduce(intitialState, {});
	}

	get value() {
		return this.state;
	}

	subscribe(fn) {
		this.subscribers = [...this.subscribers, fn];
	}

	dispatch(action) {
		this.state = this.reduce(this.state, action);
	}

	private reduce(state, action) {
		const newState = {};

		for (const prop in this.reducers) {
			newState[prop] = this.reducers[prop](state[prop], action);
		}

		return newState;
	}
}
