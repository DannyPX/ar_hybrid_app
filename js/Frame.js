'use strict';

import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  Image,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native';

import * as PlatformUtils from './PlatformUtils';

import {
  ViroARSceneNavigator,
  ViroARScene,
  ViroConstants,
  ViroText,
} from 'react-viro';

export default class Frame extends Component {
  constructor(props) {
    super(props);

    // State
    this.state = {
      instructionOpacity: new Animated.Value(1),
      showInstructions: true,
      isReady: false,
      isOverPlane: false,
    };

    // Bind Functions
    this.getViroARView = this.getViroARView.bind(this);
    this.getReadyUI = this.getReadyUI.bind(this);
    this.getInstructions = this.getInstructions.bind(this);

    this.ready = this.ready.bind(this);

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

  getReadyUI() {
    if (this.state.showInstructions) {
      let text = this.state.isOverPlane ? ' ' : 'Finding the floor...';

      let overlayStyle = {
        position: 'absolute',
        width: '100%',
        height: '100%',
      };

      let readyButton = {
        height: 60,
        width: 130,
        marginTop: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: this.state.isOverPlane ? 1 : 0.5,
      };

      return (
        <Animated.View
          style={{ ...overlayStyle, opacity: this.state.instructionOpacity }}
        >
          <View style={styles.readyContainer}>
            <Text style={styles.instructionText}>{text}</Text>
            <TouchableOpacity
              style={readyButton}
              opacity={0.5}
              onPress={this.ready}
              disabled={!this.state.isOverPlane}
              activeOpacity={0.6}
            >
              <Text style={styles.instructionText}>Place</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      );
    }
  }

  ready() {
    // only allow ready to be clicked when the user has click over a plane!
    if (!this.state.isOverPlane) {
      return;
    }
  }

  getInstructions() {
    if (!this.state.showInstructions) {
      return;
    }

    var instructionContainer = {
      position: 'absolute',
      backgroundColor: '#ffffff33',
      flexDirection: 'column',
      width: '100%',
      height: 100,
      justifyContent: 'center',
      top: 0,
      paddingTop: paddingTop,
    };

    let instructions = 'Scan the ground and tap Place to begin.';

    return (
      <Animated.View
        style={{
          ...instructionContainer,
          opacity: this.state.instructionOpacity,
        }}
      >
        <Text style={styles.instructionText}>{instructions}</Text>
      </Animated.View>
    );
  }

  getViroARView() {
    // use viroAppProps to pass in "changing/dynamic" values, passProps is "not" dynamic.
    let viroAppProps = {
      isReady: this.state.isReady,
      setIsOverPlane: this.setIsOverPlane,
    };
    return (
      <ViroARSceneNavigator
        ref={(ref) => {
          this.arNavigator = ref;
        }}
        viroAppProps={viroAppProps}
        initialScene={{
          scene: require('./ARFrame.js'),
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

  setIsOverPlane(isOverPlane) {
    if (this.state.isOverPlane != isOverPlane) {
      this.setState({
        isOverPlane: isOverPlane,
      });
    }
  }
}

let extraInstructionHeight = PlatformUtils.isIPhoneX() ? 5 : 0;
let paddingTop = PlatformUtils.isIPhoneX()
  ? PlatformUtils.iOSTopPadding + extraInstructionHeight
  : 0;

var styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  titleText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'center',
    fontFamily: 'BebasNeue-Regular',
  },
  instructionText: {
    color: '#000',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'BebasNeue-Regular',
  },
  readyContainer: {
    position: 'absolute',
    height: 170,
    width: '100%',
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
