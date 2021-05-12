function Ball({ boxObject, speed, arrayIndex }) {
  that = this;

  that.startMove = startMove;
  that.getRandomColor = getRandomColor;
  that.randomNumber = randomNumber;
  that.mass = 1;
  that.speed = speed;

  that.init = init;

  function init() {
    that.radius = 20;
    that.max = {
      x: boxObject.clientWidth - that.radius,
      y: boxObject.clientHeight - that.radius,
    };
    that.min = { x: that.radius, y: that.radius };
    that.velocity = {
      x: Math.random() < 0.5 ? 1 : -1,
      y: Math.random() < 0.5 ? 1 : -1,
    };

    that.position = {
      x: that.randomNumber(that.radius, that.max.x),
      y: that.randomNumber(that.radius, that.max.y),
    };

    that.ball = document.createElement("span");
    that.ball.style.left = that.position.x + "px";
    that.ball.style.top = that.position.y + "px";
    that.ball.style.width = that.ball.style.height = that.radius * 2 + "px";
    boxObject.appendChild(that.ball);
    that.startMove(that);
  }

  that.init();

  function updateDirection(ant) {
    let x = ant.velocity.x;
    let y = ant.velocity.y;

    if (x > 0 && y > 0) {
      ant.ball.style.transform = "translate(-50%, -50%) rotate(135deg)";
    } else if (x < 0 && y < 0) {
      ant.ball.style.transform = "translate(-50%, -50%) rotate(-45deg)";
    } else if (x < 0 && y > 0) {
      ant.ball.style.transform = "translate(-50%, -50%) rotate(-135deg)";
    } else if (x > 0 && y < 0) {
      ant.ball.style.transform = "translate(-50%, -50%) rotate(45deg)";
    }
  }

  function CheckColideAndMove(that) {
    ballArrayList[arrayIndex].forEach((item, index) => {
      if (item == that) {
        return;
      } else {
        var dx = item.position.x - that.position.x;
        var dy = item.position.y - that.position.y;
        var distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < item.radius + that.radius) {
          resolveCollision(that, item);
        }
      }
    });

    if (that.position.x >= that.max.x || that.position.x <= that.min.x) {
      that.velocity.x = -that.velocity.x;
    }
    if (that.position.y >= that.max.y || that.position.y <= that.min.y) {
      that.velocity.y = -that.velocity.y;
    }

    that.position.x = Number(that.position.x) + that.velocity.x * speed;
    that.position.y = Number(that.position.y) + that.velocity.y * speed;

    that.ball.style.left = that.position.x + "px";
    that.ball.style.top = that.position.y + "px";

    updateDirection(that);
  }

  function startMove(that) {
    if (that.invobj) return;
    that.invobj = setInterval(() => CheckColideAndMove(that), 20);
  }

  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function randomNumber(min, max) {
    return Number((Math.random() * (max - min) + min).toFixed(0));
  }

  function rotate(velocity, angle) {
    const rotatedVelocities = {
      x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
      y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle),
    };

    return rotatedVelocities;
  }

  function resolveCollision(particle, otherParticle) {
    const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
    const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

    const xDist = otherParticle.position.x - particle.position.x;
    const yDist = otherParticle.position.y - particle.position.y;

    // Prevent accidental overlap of particles
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
      // Grab angle between the two colliding particles
      const angle = -Math.atan2(
        otherParticle.position.y - particle.position.y,
        otherParticle.position.x - particle.position.x
      );

      // Velocity before equation
      const u1 = rotate(particle.velocity, angle);
      const u2 = rotate(otherParticle.velocity, angle);

      // Swap particle velocities for realistic bounce effect
      particle.velocity.x = u1.x;
      particle.velocity.y = u1.y;

      otherParticle.velocity.x = u2.x;
      otherParticle.velocity.y = u2.y;
    }
    ``;
  }
}
