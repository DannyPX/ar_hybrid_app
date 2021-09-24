'use strict';

import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing
} from 'react-native';

import * as PlatformUtils from './PlatformUtils';

import { ViroARSceneNavigator } from 'react-viro';

import * as styleConstants from './res/styleConstants';

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
      shouldResetCar: false
    };

    // Bind Functions
    this.getViroARView = this.getViroARView.bind(this);

    this.getReadyUI = this.getReadyUI.bind(this);

    this.ready = this.ready.bind(this);
    this.getInstructions = this.getInstructions.bind(this);

    this.setIsOverPlane = this.setIsOverPlane.bind(this);
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

  getViroARView() {
    let viroAppProps = {
      leftRightRatio: this.state.leftRightRatio,
      isReady: this.state.isReady,
      setIsOverPlane: this.setIsOverPlane
    };
    return (
      <ViroARSceneNavigator
        ref={ref => {
          this.arNavigator = ref;
        }}
        viroAppProps={viroAppProps}
        initialScene={{
          scene: require('./ARFrame.js'),
          passProps: {
            onARInitialized: this.onARInitialized,
            onPosterFound: this.onPosterFound,
            onExperienceFinished: this.onExperienceFinished,
            onARSceneCreated: this.onARSceneCreated
          }
        }}
      />
    );
  }

  getReadyUI() {
    if (this.state.showInstructions) {
      let text = this.state.isOverPlane ? ' ' : 'Finding the floor...';

      let overlayStyle = {
        position: 'absolute',
        width: '100%',
        height: '100%'
      };

      let readyButton = {
        ...styleConstants.BUTTONCONSTANTS,
        marginTop: 10,
        backgroundColor: styleConstants.COLORS.WHITE,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: this.state.isOverPlane
          ? styleConstants.OPACITYVALUES[100]
          : styleConstants.OPACITYVALUES[50]
      };

      return (
        <Animated.View
          style={{ ...overlayStyle, opacity: this.state.instructionOpacity }}
        >
          <View style={styles.readyContainer}>
            <Text style={styles.instructionText}>{text}</Text>
            <TouchableOpacity
              style={readyButton}
              opacity={styleConstants.OPACITYVALUES[50]}
              onPress={this.ready}
              disabled={!this.state.isOverPlane}
              activeOpacity={styleConstants.OPACITYVALUES[60]}
            >
              <Text style={styles.instructionText}>Place</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      );
    }
  }

  ready() {
    if (!this.state.isOverPlane) {
      return;
    }

    Animated.timing(this.state.instructionOpacity, {
      toValue: 0,
      duration: 1000,
      easing: Easing.linear
    }).start(() => {
      this.setState({
        showInstructions: false,
        isReady: true
      });
    });
  }

  getInstructions() {
    if (!this.state.showInstructions) {
      return;
    }

    var instructionContainer = {
      position: 'absolute',
      backgroundColor: styleConstants.COLORS.WHITE20,
      flexDirection: 'column',
      width: '100%',
      height: styleConstants.HEADHERHEIGHT,
      justifyContent: 'center',
      top: 0,
      paddingTop: paddingTop
    };

    let instructions = 'Scan the ground and tap Place to begin.';

    return (
      <Animated.View
        style={{
          ...instructionContainer,
          opacity: this.state.instructionOpacity
        }}
      >
        <Text style={styles.instructionText}>{instructions}</Text>
      </Animated.View>
    );
  }

  setIsOverPlane(isOverPlane) {
    if (this.state.isOverPlane !== isOverPlane) {
      this.setState({
        isOverPlane: isOverPlane
      });
    }
  }
}

let extraInstructionHeight = PlatformUtils.isIPhoneX() ? 5 : 0;
let paddingTop = PlatformUtils.isIPhoneX()
  ? PlatformUtils.iOSTopPadding + extraInstructionHeight
  : 0;

var styles = StyleSheet.create({
  instructionText: {
    color: styleConstants.COLORS.BLACK,
    fontFamily: styleConstants.FONTCONSTANTS.fontFamily,
    fontSize: styleConstants.FONTCONSTANTS.fontSizeNormal,
    textAlign: 'center'
  },
  outerContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  readyContainer: {
    alignItems: 'center',
    bottom: 0,
    height: styleConstants.FOOTERHEIGHT,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    width: '100%'
  }
});
