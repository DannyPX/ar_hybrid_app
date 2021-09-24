"use strict";

import React, { Component } from "react";

import {
  ViroARScene,
  Viro3DObject,
  ViroNode,
  ViroDirectionalLight,
  ViroLightingEnvironment,
  ViroAmbientLight
} from "react-viro";

const carScale = 0.05;

export default class ARFrame extends Component {
  constructor() {
    super();

    // State
    this.state = {
      text: "Initializing AR...",
      modelWorldRotation: [0, 0, 0],
      displayHitReticle: false,
      foundPlane: false,
      planeReticleLocation: [0, 0, 0],
      shouldBillboard: true,
      isReady: false,
      lastFoundPlaneLocation: [0, 0, 0]
    };

    // Bind Functions
    this._onInitialized = this._onInitialized.bind(this);
    this._getScanningQuads = this._getScanningQuads.bind(this);
    this._getCarModel = this._getCarModel.bind(this);
    this._onCameraARHitTest = this._onCameraARHitTest.bind(this);
  }

  render() {
    if (
      this.props.arSceneNavigator.viroAppProps.isReady &&
      !this.state.isReady
    ) {
      this.setState({
        isReady: true
      });
    }

    let onCameraARHitTestCallback = this.state.isReady
      ? undefined
      : this._onCameraARHitTest;

    let environmentLightSource = require("./res/learner_park_1k.hdr");

    return (
      <ViroARScene
        ref={scene => {
          this.scene = scene;
        }}
        onCameraARHitTest={onCameraARHitTestCallback}
        onTrackingUpdated={this._onInitialized}
        physicsWorld={{ gravity: [0, -5, 0] }}
      >
        <ViroLightingEnvironment source={environmentLightSource} />
        {this._getScanningQuads()}
        {this._getCarModel()}
      </ViroARScene>
    );
  }

  _getScanningQuads() {
    if (this.state.isReady) {
      return;
    }

    return (
      <ViroNode
        transformBehaviors={"billboardY"}
        position={this.state.planeReticleLocation}
        scale={[0.5, 0.5, 0.5]}
      >
        <ViroDirectionalLight
          color='#FFFFFF'
          direction={[0, -1, 0]}
          shadowOrthographicPosition={[0, 3, -5]}
          shadowOrthographicSize={10}
          shadowNearZ={2}
          shadowFarZ={9}
          castsShadow={true}
        />
        <Viro3DObject
          source={require("./res/Voxel_Square_Full.obj")}
          visible={this.state.foundPlane}
          resources={[
            require("./res/Voxel_Square_Full.mtl"),
            require("./res/Voxel_Square_Full.png")
          ]}
          scale={[0.2, 0.2, 0.2]}
          position={[-1.1, -0.5, 1]}
          type='OBJ'
        />
        <Viro3DObject
          source={require("./res/Voxel_Square_Corners.obj")}
          visible={!this.state.foundPlane}
          resources={[
            require("./res/Voxel_Square_Corners.mtl"),
            require("./res/Voxel_Square_Corners.png")
          ]}
          scale={[0.2, 0.2, 0.2]}
          position={[-1.1, -0.5, 1]}
          type='OBJ'
        />
      </ViroNode>
    );
  }

  _getCarModel() {
    let position = this.state.isReady
      ? this.state.lastFoundPlaneLocation
      : [0, 20, 0];

    var transformBehaviors = this.state.shouldBillboard ? "billboardY" : [];

    return (
      <ViroNode
        position={position}
        rotation={this.state.modelWorldRotation}
        transformBehaviors={transformBehaviors}
      >
        <ViroNode
          ref={car => {
            this.car = car;
          }}
          scale={[carScale, carScale, carScale]}
        >
          <ViroAmbientLight
            ref={light => {
              this.ambientLight = light;
            }}
            color={"#f5f8e0"}
            intensity={200}
          />
          <Viro3DObject
            source={require("./res/Voxel_Truck.obj")}
            position={[0, 0, 0]}
            resources={[
              require("./res/Voxel_Truck.mtl"),
              require("./res/Voxel_Truck.png")
            ]}
            type='OBJ'
          />
        </ViroNode>
      </ViroNode>
    );
  }

  _onCameraARHitTest(results) {
    if (results.hitTestResults.length > 0) {
      for (var i = 0; i < results.hitTestResults.length; i++) {
        let result = results.hitTestResults[i];
        if (result.type === "ExistingPlaneUsingExtent") {
          this.setState({
            planeReticleLocation: result.transform.position,
            displayHitReticle: true,
            foundPlane: true,
            lastFoundPlaneLocation: result.transform.position
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
      results.cameraOrientation.forward[2] * 1.5
    ];
    newPosition[0] = results.cameraOrientation.position[0] + newPosition[0];
    newPosition[1] = results.cameraOrientation.position[1] + newPosition[1];
    newPosition[2] = results.cameraOrientation.position[2] + newPosition[2];
    this.setState({
      planeReticleLocation: newPosition,
      displayHitReticle: true,
      foundPlane: false
    });
    this.props.arSceneNavigator.viroAppProps.setIsOverPlane(false);
  }
}

module.exports = ARFrame;
