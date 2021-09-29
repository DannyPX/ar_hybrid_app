'use strict';

import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

import * as styleConstants from '../../res/styleConstants';

export function getDrivingPedals() {
  return (
    <View style={styles.drivingButtonsContainer}>
      <View style={styles.drivingButton}>
        <Image
          style={styles.pedalImage}
          opacity={this.state.down ? 0 : 1}
          source={require('../../res/pedal_reverse.png')}
        />
        <Image
          style={styles.pedalImage}
          opacity={!this.state.down ? 0 : 1}
          source={require('../../res/pedal_reverse_press.png')}
        />
        <View
          style={styles.pedalTouchArea}
          onTouchStart={this.getPressDown('down')}
          onTouchEnd={this.getPressUp('down')}
        />
      </View>

      <View style={styles.drivingButton}>
        <Image
          style={styles.pedalImage}
          opacity={this.state.up ? 0 : 1}
          source={require('../../res/pedal_accel.png')}
        />
        <Image
          style={styles.pedalImage}
          opacity={!this.state.up ? 0 : 1}
          source={require('../../res/pedal_accel_press.png')}
        />
        <View
          style={styles.pedalTouchArea}
          onTouchStart={this.getPressDown('up')}
          onTouchEnd={this.getPressUp('up')}
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
    position: 'absolute',
    right: 10,
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
