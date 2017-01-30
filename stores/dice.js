import Reflux from 'reflux';
import DiceActions from '../actions/dice';
import values from '../data/dice'


const DiceStore = Reflux.createStore({
		listenables: [DiceActions],
		seconds: 5,
		timeup: this.seconds,

	roll: function() {
		let action = this.getRandom(values.action);
		let part = this.getRandom(values.part);
		this.trigger({ action: action, part: part, timeup: '0' });
		this.timer();
	},


	getRandom: function(arr) {
		let index = Math.floor(Math.random() * arr.length);
		return arr[index];
	},

	setSeconds: function(seconds) {
		this.seconds = seconds;
	},

	timer: function() {
		let done = 0;
		let click = this.seconds;
		let t = setInterval(() => {
			this.trigger({ timeup: click });
			if (click === done) {
				clearInterval(t);
				this.trigger({ timeup: 'Time Up' });
			}
			click--;
		}, 1000);
	},

	getSeconds: function() {
		this.trigger({ seconds: this.seconds });
	}
})



export default DiceStore;