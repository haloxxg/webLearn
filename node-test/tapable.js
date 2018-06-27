var tapable = require('tapable').Tapable;

var a = new tapable();

var options = [
	{
		apply(t) {
			t.plugin("name", ()=>{
				console.log("haloxxg");
			})
		}
	},
	{
		apply(t) {
			t.plugin("age", ()=>{
				console.log(25);
			})
		}
	}
]

a.apply(options);