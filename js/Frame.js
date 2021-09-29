'use strict';

import React, { Component } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

import * as styleConstants from './res/styleConstants';

import { getReadyUI, ready } from './modules/2DFrame/ReadyUI';
import { getViroARView, setIsOverPlane } from './modules/2DFrame/ViroARView';
import { getInstructions } from './modules/2DFrame/Instructions';

export default class Frame extends Component {
  constructor(props) {
    super(props);

    // State
    this.state = {
      instructionOpacity: new Animated.Value(styleConstants.OPACITYVALUES[100]),
      showInstructions: true,
      isReady: false,
      isOverPlane: false,
      touchLocation: '0,0',
      leftRightRatio: 0,
      shouldResetCar: false,
    };

    // Bind Functions
    this.getViroARView = getViroARView.bind(this);

    this.getReadyUI = getReadyUI.bind(this);

    this.ready = ready.bind(this);
    this.getInstructions = getInstructions.bind(this);

    this.setIsOverPlane = setIsOverPlane.bind(this);
  }

  render() {
    return (
      <View style={styles.outerContainer}>
        {this.getViroARView()}

        {this.getReadyUI()}
        {this.getInstructions()}
      </View>
    );
  }
}

var styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    flexDirection: 'column',
  },
});
