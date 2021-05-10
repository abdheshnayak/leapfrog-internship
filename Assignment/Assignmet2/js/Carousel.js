function Carousel({ carouselId, transitionSpeed, holdInterval }) {
  const obj = {};
  obj.carouselId = carouselId;
  obj.sliderPosition = 0;
  obj.sliderPosPercent = 0;
  obj.animSpeed = transitionSpeed || 500;
  obj.distnation = 0;
  obj.holdInterval = holdInterval || 5000;
  obj.running = false;

  const carouselContainer = document.getElementById(obj.carouselId);
  const imageWrapper = carouselContainer.querySelector(
    ".carousel-image-wrapper"
  );

  var imagesLength = imageWrapper.children.length;

  const buttonsWrapper = carouselContainer.querySelector(".carousel-buttons");

  //   initializing the functions
  obj.addCarouselEvents = addCarouselEvents;
  obj.addUiButtons = addUiButtons;
  obj.moveSlideWithAnimation = moveSlideWithAnimation;
  obj.animInterval = animInterval;
  obj.setDotsActive = setDotsActive;
  obj.AutoAnimate = AutoAnimate;
  obj.init = init;

  obj.init();

  //   work as constructor
  function init() {
    obj.addUiButtons();
    obj.addCarouselEvents();
    obj.AutoAnimate();
  }

  //   add uiButtons to carousel
  function addUiButtons() {
    obj.buttonsWrapper = document.createElement("div");
    obj.buttonsWrapper.classList.add("carousel-buttons");
    obj.buttonsWrapper.innerHTML = `
    <div class="left-rith-btn">
      <span class="left"></span>
      <span class="right"></span>
    </div>
    `;
    var indicatorDotsWrapper = document.createElement("div");
    indicatorDotsWrapper.classList.add("indicator-dots-wrapper");

    for (i = 0; i < imagesLength; i++) {
      var span = document.createElement("span");
      indicatorDotsWrapper.appendChild(span);
    }

    indicatorDotsWrapper.querySelector("span").classList.add("active");

    obj.buttonsWrapper.appendChild(indicatorDotsWrapper);
    carouselContainer.appendChild(obj.buttonsWrapper);
  }

  //   add events to button
  function addCarouselEvents() {
    var leftSlderButton = obj.buttonsWrapper.querySelector(".left");
    var rightSlidderButton = obj.buttonsWrapper.querySelector(".right");

    leftSlderButton.addEventListener("click", (e) => {
      obj.moveSlideWithAnimation(obj.sliderPosition - 1, obj);
    });
    rightSlidderButton.addEventListener("click", (e) => {
      obj.moveSlideWithAnimation(obj.sliderPosition + 1);
    });
    const indicatorDotsWrapper = obj.buttonsWrapper.querySelectorAll(
      ".indicator-dots-wrapper>span"
    );

    indicatorDotsWrapper.forEach((element) => {
      element.addEventListener("click", (e) => {
        elementIndex = Array.prototype.indexOf.call(
          indicatorDotsWrapper,
          e.target
        );
        obj.moveSlideWithAnimation(elementIndex);
      });
    });
  }

  //   clear dotsActive and make the activeIndex active
  function setDotsActive(activeIndex) {
    const indicatorDotsWrapper = obj.buttonsWrapper.querySelectorAll(
      ".indicator-dots-wrapper>span"
    );

    indicatorDotsWrapper.forEach((element, index) => {
      element.classList.remove("active");
      if (index == activeIndex) {
        element.classList.add("active");
      }
    });
  }

  function AutoAnimate() {
    // console.log("hello", carouselId);
    if (obj.autoAnim) return;
    obj.autoAnim = setInterval(() => {
      obj.moveSlideWithAnimation(obj.sliderPosition + 1);
    }, obj.holdInterval);
  }

  //   animate the move
  function animInterval() {
    if (obj.running) return;
    // console.log(carouselId);

    obj.running = true;

    var source = obj.sliderPosition * 100;
    var dist = obj.distnation * 100;
    obj.setDotsActive(obj.distnation);

    obj.animObject = setInterval(() => {
      if (source > dist) {
        source -= 1;
        if (source == dist) {
          obj.sliderPosition = obj.distnation;
          clearInterval(obj.animObject);
          obj.running = false;
        }
        imageWrapper.style = "left:-" + source + "%";
      } else {
        source += 1;
        imageWrapper.style = "left:-" + source + "%";
        if (source == dist) {
          obj.sliderPosition = obj.distnation;
          clearInterval(obj.animObject);
          obj.running = false;
        }
        imageWrapper.style = "left:-" + source + "%";
      }
    }, obj.animSpeed / 100);
  }

  //   distingation slide index required
  function moveSlideWithAnimation(index) {
    if (index < 0 || index >= imagesLength) {
      if (index >= imagesLength) {
        obj.distnation = 0;
        obj.animInterval();
      } else {
        obj.distnation = imagesLength - 1;
        obj.animInterval();
      }

      return;
    }
    obj.distnation = index;
    obj.animInterval();
  }
}
