const carScale = 0.1; // this is the scale of the car

// NOTE: make sure friction != drivingAcceleration!
const maxSpeed = 0.19 * carScale; // m/s
const drivingAcceleration = 0.08 * carScale; // m/s/s
const reverseAcceleration = 0.17 * carScale; // m/s/s
const friction = -0.03 * carScale; // m/s/s
const intervalTime = 16; //ms
const distanceToFullTurn = 0.4 * carScale; // meters - this is how far the car should travel before it completes a circle
const maxLeanRotation = 10;
var currentAcceleration = 0; // m/s/s
var currentVelocity = 0; // m/s
var currentPosition = [0, 0, 0];
var currentDirection = [0, 0, -1];
var currentRotation = 0; // this is a rotation about the Y in radians...
var currentLeanRotation = 0;

export function setInitialCarDirection() {
  if (this.car) {
    this.car.getTransformAsync().then((retDict) => {
      let rotation = retDict.rotation;
      let absX = Math.abs(rotation[0]);
      let absZ = Math.abs(rotation[2]);

      let yRotation = rotation[1];

      // if the X and Z aren't 0, then adjust the y rotation (the quaternion flipped the X or Z).
      if (absX !== 0 && absZ !== 0) {
        yRotation = 180 - yRotation;
      }

      this.setState(
        {
          modelWorldRotation: [0, yRotation, 0],
          shouldBillboard: false,
        },
        () => {
          this.timer = setInterval(() => {
            this._computeNewLocation();
          }, intervalTime);
        }
      );
    });
  }
}

export function computeNewLocation() {
  let pressedDirectionButtons =
    this.props.arSceneNavigator.viroAppProps.direction;

  let computedVelocity =
    currentVelocity + currentAcceleration * (intervalTime / 1000);

  if (currentAcceleration === friction) {
    // if we aren't driving (friction) then make sure we never fall below 0 speed
    currentVelocity = Math.max(computedVelocity, 0);
  } else if (currentAcceleration === -friction) {
    // if we aren't driving (negative friction) then make sure we never go above 0 speed
    currentVelocity = Math.min(computedVelocity, 0);
  } else {
    // if we are driving, then make sure we never go above maxSpeed (in either positive or negative)
    currentVelocity = Math.max(Math.min(computedVelocity, maxSpeed), -maxSpeed);
  }

  // immediately compute the next frame's accelerations now (it can be later, but sometimes we return early)
  this._computeAcceleration();

  let desiredLeanRotation = 0;
  // compute new directions based on the joystick
  let turnRatio = this.props.arSceneNavigator.viroAppProps.leftRightRatio;
  if ((pressedDirectionButtons & 5) > 0) {
    // if left or right was pressed...
    let additionalRotation = 0;
    if ((pressedDirectionButtons & 1) > 0) {
      // Left
      additionalRotation =
        -(
          ((currentVelocity * (intervalTime / 1000)) / distanceToFullTurn) *
          turnRatio
        ) *
        2 *
        Math.PI; // radians
      desiredLeanRotation =
        -maxLeanRotation * Math.abs(currentVelocity / maxSpeed);
    } else if ((pressedDirectionButtons & 4) > 0) {
      // right
      additionalRotation =
        ((currentVelocity * (intervalTime / 1000)) / distanceToFullTurn) *
        turnRatio *
        2 *
        Math.PI; // radians
      desiredLeanRotation =
        maxLeanRotation * Math.abs(currentVelocity / maxSpeed);
    }

    // compute new currentDirection based on the new additional rotation we're adding
    currentDirection = [
      Math.cos(additionalRotation) * currentDirection[0] -
        Math.sin(additionalRotation) * currentDirection[2], // x
      0, // y
      Math.sin(additionalRotation) * currentDirection[0] +
        Math.cos(additionalRotation) * currentDirection[2], // z
    ];

    currentRotation -= additionalRotation; // our platform rotation is "opposite" of the equation here
  }

  // based on the desiredLeanRotation, move the currentLeanRotation .5 degrees towards the desired one
  if (currentLeanRotation !== desiredLeanRotation) {
    if (currentLeanRotation > desiredLeanRotation) {
      currentLeanRotation -= 0.5;
    } else {
      currentLeanRotation += 0.5;
    }
  }

  if (currentVelocity !== 0) {
    // compute the new position & wheel turn.
    let distanceX = currentDirection[0] * currentVelocity;
    let distanceY = currentDirection[1] * currentVelocity;
    let distanceZ = currentDirection[2] * currentVelocity;
    currentPosition = [
      currentPosition[0] + distanceX,
      currentPosition[1] + distanceY,
      currentPosition[2] + distanceZ,
    ];

    // set the car's rotation/position
    this.car.setNativeProps({
      position: currentPosition,
      rotation: [0, (currentRotation * 180) / Math.PI, 0], // we're only rotating about the Y & we need to convert to degrees
    });

    this.carRotationNode.setNativeProps({
      rotation: [0, 0, currentLeanRotation],
    });
  }
}

export function computeAcceleration() {
  let pressedDirectionButtons =
    this.props.arSceneNavigator.viroAppProps.direction;

  if ((pressedDirectionButtons & 2) > 0) {
    if (currentVelocity < 0) {
      currentAcceleration = reverseAcceleration;
    } else {
      currentAcceleration = drivingAcceleration;
    }
  } else if ((pressedDirectionButtons & 8) > 0) {
    if (currentVelocity > 0) {
      currentAcceleration = -reverseAcceleration;
    } else {
      currentAcceleration = -drivingAcceleration;
    }
  } else {
    // if we were accelerating forward or were already applying friction, then keep applying friction
    if (
      currentAcceleration === drivingAcceleration ||
      currentAcceleration === friction
    ) {
      currentAcceleration = friction;
    } else {
      currentAcceleration = -friction;
    }
  }
}
