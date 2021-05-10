function Carousel(carouselId, transitionSpeed = 500) {
  this.sliderPosition = 0;
  this.sliderPosPercent = 0;
  this.animSpeed = transitionSpeed;
  this.distnation = 0;
  this.holdInterval = 2000;
  this.running = false;

  const carouselContainer = document.getElementById(carouselId);
  const imageWrapper = carouselContainer.querySelector(
    ".carousel-image-wrapper"
  );

  var imagesLength = imageWrapper.children.length;

  const buttonsWrapper = carouselContainer.querySelector(".carousel-buttons");

  //   initializing the functions
  this.addCarouselEvents = addCarouselEvents;
  this.addUiButtons = addUiButtons;
  this.moveSlideWithAnimation = moveSlideWithAnimation;
  this.animInterval = animInterval;
  this.setDotsActive = setDotsActive;
  this.AutoAnimate = AutoAnimate;
  this.init = init;

  this.init();

  //   work as constructor
  function init() {
    this.addUiButtons();
    this.addCarouselEvents();
    // this.AutoAnimate();
  }

  //   add uiButtons to carousel
  function addUiButtons() {
    this.buttonsWrapper = document.createElement("div");
    this.buttonsWrapper.classList.add("carousel-buttons");
    this.buttonsWrapper.innerHTML = `
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

    this.buttonsWrapper.appendChild(indicatorDotsWrapper);
    carouselContainer.appendChild(this.buttonsWrapper);
  }

  //   add events to button
  function addCarouselEvents() {
    var _this = this;
    var leftSlderButton = _this.buttonsWrapper.querySelector(".left");
    var rightSlidderButton = _this.buttonsWrapper.querySelector(".right");

    leftSlderButton.addEventListener("click", (e) => {
      _this.moveSlideWithAnimation(_this.sliderPosition - 1);
    });
    rightSlidderButton.addEventListener("click", (e) => {
      _this.moveSlideWithAnimation(_this.sliderPosition + 1);
    });
    const indicatorDotsWrapper = _this.buttonsWrapper.querySelectorAll(
      ".indicator-dots-wrapper>span"
    );

    indicatorDotsWrapper.forEach((element) => {
      element.addEventListener("click", (e) => {
        elementIndex = Array.prototype.indexOf.call(
          indicatorDotsWrapper,
          e.target
        );
        _this.moveSlideWithAnimation(elementIndex);
      });
    });
  }

  //   clear dotsActive and make the activeIndex active
  function setDotsActive(activeIndex) {
    const indicatorDotsWrapper = _this.buttonsWrapper.querySelectorAll(
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
    _this = this;
    console.log("hello", carouselId);
    _this.autoAnim = setInterval(() => {
      _this.moveSlideWithAnimation(_this.sliderPosition + 1);
    }, _this.holdInterval);
  }

  //   animate the move
  function animInterval() {
    _this = this;

    if (_this.running) return;
    console.log(carouselId);

    _this.running = true;

    var source = this.sliderPosition * 100;
    var dist = this.distnation * 100;
    _this.setDotsActive(_this.distnation);

    _this.animObject = setInterval(() => {
      if (source > dist) {
        source -= 1;
        if (source == dist) {
          this.sliderPosition = this.distnation;
          clearInterval(_this.animObject);
          _this.running = false;
        }
        imageWrapper.style = "left:-" + source + "%";
      } else {
        source += 1;
        imageWrapper.style = "left:-" + source + "%";
        if (source == dist) {
          this.sliderPosition = this.distnation;
          clearInterval(_this.animObject);
          _this.running = false;
        }
        imageWrapper.style = "left:-" + source + "%";
      }
    }, _this.animSpeed / 100);
  }

  //   distingation slide index required
  function moveSlideWithAnimation(index) {
    _this = this;
    if (index < 0 || index >= imagesLength) {
      if (index >= imagesLength) {
        _this.distnation = 0;
        _this.animInterval();
      } else {
        _this.distnation = imagesLength - 1;
        _this.animInterval();
      }

      return;
    }
    _this.distnation = index;
    _this.animInterval();
  }
}
