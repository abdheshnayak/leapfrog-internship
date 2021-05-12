var boxObject = document.getElementById("ball-box-1");

var ballArrayList = {};

ballArrayList[0] = Array(10);

ballArrayList[0] = ballArrayList[0].fill(null).map((intem, index) => {
  return new Ball({ boxObject, speed: 3, arrayIndex: 0 });
});

var boxObject = document.getElementById("ball-box-2");

ballArrayList[1] = Array(50);

ballArrayList[1] = ballArrayList[1].fill(null).map((intem, index) => {
  return new Ball({ boxObject, speed: 2, arrayIndex: 1 });
});
