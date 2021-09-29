import React from 'react';

import { ViroARSceneNavigator } from 'react-viro';
export function getViroARView() {
  let viroAppProps = {
    leftRightRatio: this.state.leftRightRatio,
    isReady: this.state.isReady,
    setIsOverPlane: this.setIsOverPlane,
    direction:
      (this.state.left ? 1 : 0) +
      (this.state.up ? 2 : 0) +
      (this.state.right ? 4 : 0) +
      (this.state.down ? 8 : 0),
  };
  return (
    <ViroARSceneNavigator
      ref={(ref) => {
        this.arNavigator = ref;
      }}
      viroAppProps={viroAppProps}
      initialScene={{
        scene: require('../../ARFrame'),
        passProps: {
          onARInitialized: this.onARInitialized,
          onPosterFound: this.onPosterFound,
          onExperienceFinished: this.onExperienceFinished,
          onARSceneCreated: this.onARSceneCreated,
        },
      }}
    />
  );
}

export function setIsOverPlane(isOverPlane) {
  if (this.state.isOverPlane !== isOverPlane) {
    this.setState({
      isOverPlane: isOverPlane,
    });
  }
}
