function Carousel({ carouselId, transitionSpeed, holdInterval, autoSlide }) {
  var that = this;
  that.carouselId = carouselId;
  that.sliderPosition = 0;
  that.sliderPosPercent = 0;
  that.animSpeed = transitionSpeed || 500;
  that.distnation = 0;
  that.holdInterval = holdInterval || 5000;
  that.running = false;
  that.autoSlide = autoSlide == false || false;

  const carouselContainer = document.getElementById(that.carouselId);
  const imageWrapper = carouselContainer.querySelector(
    ".carousel-image-wrapper"
  );

  var imagesLength = imageWrapper.children.length;

  const buttonsWrapper = carouselContainer.querySelector(".carousel-buttons");

  //   initializing the functions
  that.addCarouselEvents = addCarouselEvents;
  that.addUiButtons = addUiButtons;
  that.moveSlideWithAnimation = moveSlideWithAnimation;
  that.animInterval = animInterval;
  that.setDotsActive = setDotsActive;
  that.AutoAnimate = AutoAnimate;
  that.init = init;

  that.init();

  //   work as constructor
  function init() {
    that.addUiButtons();
    that.addCarouselEvents();
    if (!that.autoSlide) that.AutoAnimate();
  }

  //   add uiButtons to carousel
  function addUiButtons() {
    that.buttonsWrapper = document.createElement("div");
    that.buttonsWrapper.classList.add("carousel-buttons");
    that.buttonsWrapper.innerHTML = `
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

    that.buttonsWrapper.appendChild(indicatorDotsWrapper);
    carouselContainer.appendChild(that.buttonsWrapper);
  }

  //   add events to button
  function addCarouselEvents() {
    var leftSlderButton = that.buttonsWrapper.querySelector(".left");
    var rightSlidderButton = that.buttonsWrapper.querySelector(".right");

    leftSlderButton.addEventListener("click", (e) => {
      clearInterval(that.autoAnim);
      that.autoAnim = null;
      that.moveSlideWithAnimation(that.sliderPosition - 1);
    });
    rightSlidderButton.addEventListener("click", (e) => {
      clearInterval(that.autoAnim);
      that.autoAnim = null;
      that.moveSlideWithAnimation(that.sliderPosition + 1);
    });
    const indicatorDotsWrapper = that.buttonsWrapper.querySelectorAll(
      ".indicator-dots-wrapper>span"
    );

    indicatorDotsWrapper.forEach((element) => {
      element.addEventListener("click", (e) => {
        elementIndex = Array.prototype.indexOf.call(
          indicatorDotsWrapper,
          e.target
        );
        clearInterval(that.autoAnim);
        that.autoAnim = null;
        that.moveSlideWithAnimation(elementIndex);
      });
    });
  }

  //   clear dotsActive and make the activeIndex active
  function setDotsActive(activeIndex) {
    const indicatorDotsWrapper = that.buttonsWrapper.querySelectorAll(
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
    if (that.autoSlide) return;
    if (that.autoAnim) return;
    that.autoAnim = setInterval(() => {
      that.moveSlideWithAnimation(that.sliderPosition + 1);
    }, that.holdInterval);
  }

  //   animate the move
  function animInterval() {
    if (that.running) return;

    that.running = true;

    var source = that.sliderPosition * 100;
    var dist = that.distnation * 100;
    that.setDotsActive(that.distnation);

    that.animObject = setInterval(() => {
      if (source > dist) {
        source -= Math.abs(that.sliderPosition - that.distnation);
        if (source == dist) {
          that.sliderPosition = that.distnation;
          clearInterval(that.animObject);
          that.running = false;
          that.AutoAnimate();
        }
        imageWrapper.style = "left:-" + source + "%";
      } else {
        source += Math.abs(that.sliderPosition - that.distnation);
        imageWrapper.style = "left:-" + source + "%";
        if (source == dist) {
          that.sliderPosition = that.distnation;
          clearInterval(that.animObject);
          that.running = false;
          that.AutoAnimate();
        }
        imageWrapper.style = "left:-" + source + "%";
      }
    }, that.animSpeed / 100);
  }

  //   distingation slide index required
  function moveSlideWithAnimation(index) {
    if (index < 0 || index >= imagesLength) {
      if (index >= imagesLength) {
        that.distnation = 0;
        that.animInterval();
      } else {
        that.distnation = imagesLength - 1;
        that.animInterval();
      }

      return;
    }
    that.distnation = index;
    that.animInterval();
  }
}
