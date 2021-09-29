'use strict';

import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';

import * as styleConstants from '../../res/styleConstants';

export function getReadyUI() {
  if (this.state.showInstructions) {
    let text = this.state.isOverPlane ? ' ' : 'Finding the floor...';

    let overlayStyle = {
      position: 'absolute',
      width: '100%',
      height: '100%',
    };

    let readyButton = {
      ...styleConstants.BUTTONCONSTANTS,
      marginTop: 10,
      backgroundColor: styleConstants.COLORS.WHITE,
      justifyContent: 'center',
      alignItems: 'center',
      opacity: this.state.isOverPlane
        ? styleConstants.OPACITYVALUES[100]
        : styleConstants.OPACITYVALUES[50],
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

export function ready() {
  if (!this.state.isOverPlane) {
    return;
  }

  Animated.timing(this.state.instructionOpacity, {
    toValue: 0,
    duration: 1000,
    easing: Easing.linear,
  }).start(() => {
    this.setState({
      showInstructions: false,
      isReady: true,
    });
  });
}

var styles = StyleSheet.create({
  instructionText: {
    color: styleConstants.COLORS.BLACK,
    fontFamily: styleConstants.FONTCONSTANTS.fontFamily,
    fontSize: styleConstants.FONTCONSTANTS.fontSizeNormal,
    textAlign: 'center',
  },
  outerContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  readyContainer: {
    alignItems: 'center',
    bottom: 0,
    height: styleConstants.FOOTERHEIGHT,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    width: '100%',
  },
});
