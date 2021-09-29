'use strict';

import React, { Component } from 'react';

import { ViroARScene, ViroDirectionalLight } from 'react-viro';

import * as styleConstants from './res/styleConstants';

import { getCarModel } from './modules/ARFrame/CarModel';
import { onCameraARHitTest } from './modules/ARFrame/OnCameraARHitTest';
import { getScanningQuads } from './modules/ARFrame/ScanningQuads';

export default class ARFrame extends Component {
  constructor() {
    super();

    // State
    this.state = {
      text: 'Initializing AR...',
      modelWorldRotation: [0, 0, 0],
      displayHitReticle: false,
      foundPlane: false,
      planeReticleLocation: [0, 0, 0],
      shouldBillboard: true,
      isReady: false,
      lastFoundPlaneLocation: [0, 0, 0],
    };

    // Bind Functions
    this._getScanningQuads = getScanningQuads.bind(this);
    this._getCarModel = getCarModel.bind(this);
    this._onCameraARHitTest = onCameraARHitTest.bind(this);
  }

  render() {
    if (
      this.props.arSceneNavigator.viroAppProps.isReady &&
      !this.state.isReady
    ) {
      this.setState({
        isReady: true,
      });
    }

    let onCameraARHitTestCallback = this.state.isReady
      ? undefined
      : this._onCameraARHitTest;

    return (
      <ViroARScene
        ref={(scene) => {
          this.scene = scene;
        }}
        onCameraARHitTest={onCameraARHitTestCallback}
        onTrackingUpdated={this._onInitialized}
        physicsWorld={{ gravity: [0, -5, 0] }}
      >
        <ViroDirectionalLight
          color={styleConstants.COLORS.WHITE}
          direction={[0.3, -1, 0.2]}
          shadowOrthographicPosition={[0, 3, -5]}
          shadowOrthographicSize={10}
          shadowNearZ={2}
          shadowFarZ={9}
          castsShadow={true}
        />
        {this._getScanningQuads()}
        {this._getCarModel()}
      </ViroARScene>
    );
  }
}

module.exports = ARFrame;
