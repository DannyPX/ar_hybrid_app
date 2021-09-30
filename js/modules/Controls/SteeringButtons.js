'use strict';

import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

import * as styleConstants from '../../res/styleConstants';

export function getSteeringButtons() {
  return (
    <View style={styles.drivingButtonsContainer}>
      <View style={styles.drivingButton}>
        <Image
          style={styles.pedalImage}
          opacity={this.state.left ? 0 : 1}
          source={require('../../res/pedal_left.png')}
        />
        <Image
          style={styles.pedalImage}
          opacity={!this.state.left ? 0 : 1}
          source={require('../../res/pedal_left_press.png')}
        />
        <View
          style={styles.pedalTouchArea}
          onTouchStart={this.getPressDown('left')}
          onTouchEnd={this.getPressUp('left')}
        />
      </View>

      <View style={styles.drivingButton}>
        <Image
          style={styles.pedalImage}
          opacity={this.state.right ? 0 : 1}
          source={require('../../res/pedal_right.png')}
        />
        <Image
          style={styles.pedalImage}
          opacity={!this.state.right ? 0 : 1}
          source={require('../../res/pedal_right_press.png')}
        />
        <View
          style={styles.pedalTouchArea}
          onTouchStart={this.getPressDown('right')}
          onTouchEnd={this.getPressUp('right')}
        />
      </View>
    </View>
  );
}

var styles = StyleSheet.create({
  drivingButton: {
    height: 70,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    width: 70,
  },
  drivingButtonsContainer: {
    alignItems: 'center',
    bottom: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    left: 10,
    position: 'absolute',
    width: 150,
  },
  pedalImage: {
    height: 70,
    position: 'absolute',
    width: 70,
  },
  pedalTouchArea: {
    backgroundColor: styleConstants.COLORS.WHITE00,
    height: 70,
    position: 'absolute',
    width: 70,
  },
});
