var boxObject = document.getElementById("ball-box-1");

var ballArrayList = {};

ballArrayList[0] = Array(10);

ballArrayList[0] = ballArrayList[0].fill(null).map((intem, index) => {
  return new Ball({ boxObject, speed: 3, arrayIndex: 0 });
});
