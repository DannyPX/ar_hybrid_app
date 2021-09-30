'use strict';

import React from 'react';
import { Text, StyleSheet, Animated } from 'react-native';

import * as PlatformUtils from '../../PlatformUtils';

import * as styleConstants from '../../res/styleConstants';

export function getInstructions() {
  if (!this.state.showInstructions && this.state.menuVisible) {
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

let extraInstructionHeight = PlatformUtils.isIPhoneX() ? 5 : 0;
let paddingTop = PlatformUtils.isIPhoneX()
  ? PlatformUtils.iOSTopPadding + extraInstructionHeight
  : 0;

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
