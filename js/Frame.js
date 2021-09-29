'use strict';

import React, { Component } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

import * as styleConstants from './res/styleConstants';

import { getReadyUI, ready } from './modules/2DFrame/ReadyUI';
import { getViroARView, setIsOverPlane } from './modules/2DFrame/ViroARView';
import { getInstructions } from './modules/2DFrame/Instructions';

import { getDrivingPedals } from './modules/Controls/DrivingPedals';
import { getPressDown, getPressUp } from './modules/Controls/Controls';

export default class Frame extends Component {
  constructor(props) {
    super(props);

    // State
    this.state = {
      instructionOpacity: new Animated.Value(styleConstants.OPACITYVALUES[100]),
      carControlsOpacity: new Animated.Value(styleConstants.OPACITYVALUES[0]),
      showInstructions: true,
      isReady: false,
      isOverPlane: false,
      touchLocation: '0,0',
      leftRightRatio: 0,
      shouldResetCar: false,
      left: false,
      up: false,
      right: false,
      down: false,
      isRecording: false,
      shouldPlayMedia: true,
      hours: '00',
      minutes: '00',
      seconds: '00',
    };

    // Bind Functions
    this.getViroARView = getViroARView.bind(this);
    this.getReadyUI = getReadyUI.bind(this);
    this.ready = ready.bind(this);
    this.getInstructions = getInstructions.bind(this);
    this.setIsOverPlane = setIsOverPlane.bind(this);

    this.getCarControls = this.getCarControls.bind(this);
    this.getDrivingPedals = getDrivingPedals.bind(this);
    this.getPressDown = getPressDown.bind(this);
    this.getPressUp = getPressUp.bind(this);
  }

  render() {
    return (
      <View style={styles.outerContainer}>
        {this.getViroARView()}
        {this.getCarControls()}
        {this.getReadyUI()}
        {this.getInstructions()}
      </View>
    );
  }
  getCarControls() {
    let controlStyle = {
      position: 'absolute',
      width: '100%',
      height: '100%',
      opacity: this.state.carControlsOpacity,
    };

    return (
      <Animated.View style={controlStyle}>
        {/* These are the controls to drive the car */}
        {this.getDrivingPedals()}
      </Animated.View>
    );
  }
}

var styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    flexDirection: 'column',
  },
});
