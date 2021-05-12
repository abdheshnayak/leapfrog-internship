var boxObject = document.getElementById("ball-box-1");

var ballArrayList = {};

ballArrayList[0] = Array(1000);

ballArrayList[0] = ballArrayList[0].fill(null).map((intem, index) => {
  return new Ball({
    boxObject,
    speed: 2,
    arrayIndex: 0,
    sizeRange: { min: 2, max: 5 },
  });
});
