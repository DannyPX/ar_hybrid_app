'use strict';

export function onCameraARHitTest(results) {
  if (results.hitTestResults.length > 0) {
    for (var i = 0; i < results.hitTestResults.length; i++) {
      let result = results.hitTestResults[i];
      if (result.type === 'ExistingPlaneUsingExtent') {
        this.setState({
          planeReticleLocation: result.transform.position,
          displayHitReticle: true,
          foundPlane: true,
          lastFoundPlaneLocation: result.transform.position,
        });
        this.props.arSceneNavigator.viroAppProps.setIsOverPlane(true);
        return;
      }
    }
  }

  //else we made it here, so just forward vector with unmarked.
  let newPosition = [
    results.cameraOrientation.forward[0] * 1.5,
    results.cameraOrientation.forward[1] * 1.5,
    results.cameraOrientation.forward[2] * 1.5,
  ];
  newPosition[0] = results.cameraOrientation.position[0] + newPosition[0];
  newPosition[1] = results.cameraOrientation.position[1] + newPosition[1];
  newPosition[2] = results.cameraOrientation.position[2] + newPosition[2];
  this.setState({
    planeReticleLocation: newPosition,
    displayHitReticle: true,
    foundPlane: false,
  });
  this.props.arSceneNavigator.viroAppProps.setIsOverPlane(false);
}
