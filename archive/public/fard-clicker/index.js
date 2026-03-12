const createImageElement = function(src) {
	var self = document.createElement("img");
	self.setAttribute("src",src);
	return self;
}

function run() {
	
	let clickpoints = 1;
	
	let play = document.getElementById("play");
	play.style.display = "none";
	
	let game = document.getElementById("content");

	let fard = createImageElement("/archive/public/fard-clicker/static/a.png");

	let scoremonitor = document.createElement("h1");
	scoremonitor.innerText = 0;
	
	let sneakysnitch = new Audio("/archive/public/fard-clicker/static/b.mp3");
	
	let ten = new Audio("/archive/public/fard-clicker/static/c.wav");
	
	let fifty = new Audio("/archive/public/fard-clicker/static/d.wav");
	
	let seventyfive = new Audio("/archive/public/fard-clicker/static/e.wav");
	
	let onehundred = new Audio("/archive/public/fard-clicker/static/f.wav");

	game.appendChild(fard);
	game.appendChild(scoremonitor);
	
	sneakysnitch.play();

	fard.onclick = function() {
		let score = scoremonitor.innerText;
		
		scoremonitor.innerText = Number(score) + clickpoints;
		
		score = Number(score) + clickpoints;
		
		if (score == 10) {
			ten.play();
			clickpoints = clickpoints * 2;
		}
		
		if (score == 50) {
			fifty.play();
			clickpoints = clickpoints * 2;
		}
		
		if (score == 78) {
			seventyfive.play();
			clickpoints = clickpoints * 2;
		}
		
		if (score == 102) {
			onehundred.play();
			clickpoints = clickpoints * 2;
		}
	}

}