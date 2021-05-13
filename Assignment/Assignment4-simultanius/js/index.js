var gameObj = new Game({ id: "game-1", left: "a", right: "d", up: "u" });
var gameObj2 = new Game({ id: "game-2", left: "4", right: "6", up: "8" });

var games = 1;

this.gameObj.startAnimating(50);
this.gameObj2.startAnimating(50);

// this.gameObj.startAnimating(50);

document.getElementById("play").addEventListener(
  "click",
  (e) => {
    this.games = 1;
    this.gameObj.startAnimating(50);
    // this.gameObj2.startAnimating(50);
  },
  this
);
