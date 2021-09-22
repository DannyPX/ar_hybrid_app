import React, { Component } from 'react';

import { ViroARSceneNavigator } from 'react-viro';

// Sets the default scene you want for AR and VR
var InitialARScene = require('./js/HelloWorldSceneAR');

export default class ViroSample extends Component {
  constructor() {
    super();
    this._getARNavigator = this._getARNavigator.bind(this);
  }

  // Replace this function with the contents of _getVRNavigator() or _getARNavigator()
  // if you are building a specific type of experience.
  render() {
    return this._getARNavigator();
  }

  // Returns the ViroARSceneNavigator which will start the AR experience
  _getARNavigator() {
    return <ViroARSceneNavigator initialScene={{ scene: InitialARScene }} />;
  }
}

module.exports = ViroSample;
