var boxObject = document.getElementById("ball-box-1");

var ballArrayList = {};

ballArrayList[0] = Array(10);

ballArrayList[0] = ballArrayList[0].fill(null).map((intem, index) => {
  return new Ball({
    boxObject,
    speed: 5,
    arrayIndex: 0,
    sizeRange: { min: 10, max: 15 },
  });
});

var boxObject = document.getElementById("ball-box-2");

ballArrayList[1] = Array(100);

ballArrayList[1] = ballArrayList[1].fill(null).map((intem, index) => {
  return new Ball({
    boxObject,
    speed: 2,
    arrayIndex: 1,
    sizeRange: { min: 3, max: 8 },
  });
});
