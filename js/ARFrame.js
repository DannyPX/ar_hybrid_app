'use strict';

import React, { Component } from 'react';

import { StyleSheet } from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroARImageMarker,
  Viro3DObject,
  ViroAmbientLight,
  ViroMaterialVideo,
  ViroMaterials,
  ViroAnimations,
  ViroNode,
  ViroPortal,
  ViroPortalScene,
  Viro360Video,
  Viro360Image,
  ViroVideo,
  ViroDirectionalLight,
  ViroLightingEnvironment,
  ViroImage,
  ViroSound,
  ViroParticleEmitter,
  ViroSpotLight,
  ViroQuad,
  ViroBox,
} from 'react-viro';

export default class ARFrame extends Component {
  constructor() {
    super();

    // State
    this.state = {
      foundPlane: false,
      planeReticleLocation: [0, 0, 0],
      isReady: false,
      lastFoundPlaneLocation: [0, 0, 0],
    };

    // Bind Functions
    this._onInitialized = this._onInitialized.bind(this);
    this._getScanningQuads = this._getScanningQuads.bind(this);
    this._onCameraARHitTest = this._onCameraARHitTest.bind(this);
  }

  render() {
    let onCameraARHitTestCallback = this.state.isReady
      ? undefined
      : this._onCameraARHitTest;
    let environmentLightSource = require('./res/learner_park_1k.hdr');

    return (
      <ViroARScene
        ref={(scene) => {
          this.scene = scene;
        }}
        onCameraARHitTest={onCameraARHitTestCallback}
        onTrackingUpdated={this._onInitialized}
        physicsWorld={{ gravity: [0, -5, 0] }}
      >
        <ViroLightingEnvironment source={environmentLightSource} />
        {this._getScanningQuads()}
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state === ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text: 'Hello World!',
      });
    } else if (state === ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }

  _getScanningQuads() {
    let environmentLightSource = require('./res/learner_park_1k.hdr');

    if (this.state.isReady) {
      return;
    }

    return (
      <ViroNode
        transformBehaviors={'billboardY'}
        position={this.state.planeReticleLocation}
        scale={[0.5, 0.5, 0.5]}
      >
        <ViroDirectionalLight
          color="#FFFFFF"
          direction={[0, -1, 0]}
          shadowOrthographicPosition={[0, 3, -5]}
          shadowOrthographicSize={10}
          shadowNearZ={2}
          shadowFarZ={9}
          castsShadow={true}
        />
        <Viro3DObject
          source={require('./res/Voxel_Square_Full.obj')}
          visible={this.state.foundPlane}
          resources={[
            require('./res/Voxel_Square_Full.mtl'),
            require('./res/Voxel_Square_Full.png'),
          ]}
          scale={[0.2, 0.2, 0.2]}
          position={[-1.1, -0.5, 1]}
          type="OBJ"
        />
        <Viro3DObject
          source={require('./res/Voxel_Square_Corners.obj')}
          visible={!this.state.foundPlane}
          resources={[
            require('./res/Voxel_Square_Corners.mtl'),
            require('./res/Voxel_Square_Corners.png'),
          ]}
          scale={[0.2, 0.2, 0.2]}
          position={[-1.1, -0.5, 1]}
          type="OBJ"
        />
      </ViroNode>
    );
  }

  _onCameraARHitTest(results) {
    if (results.hitTestResults.length > 0) {
      for (var i = 0; i < results.hitTestResults.length; i++) {
        let result = results.hitTestResults[i];
        if (result.type == 'ExistingPlaneUsingExtent') {
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
}

module.exports = ARFrame;