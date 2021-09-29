'use strict';

import React from 'react';

import { Viro3DObject, ViroNode, ViroDirectionalLight } from 'react-viro';

export function getScanningQuads() {
  if (this.state.isReady) {
    return;
  }

  return (
    <ViroNode
      transformBehaviors={'billboardY'}
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
        source={require('../../res/Voxel_Square_Full.obj')}
        visible={this.state.foundPlane}
        resources={[
          require('../../res/Voxel_Square_Full.mtl'),
          require('../../res/Voxel_Square_Full.png'),
        ]}
        scale={[0.2, 0.2, 0.2]}
        position={[-1.1, -0.5, 1]}
        type='OBJ'
      />
      <Viro3DObject
        source={require('../../res/Voxel_Square_Corners.obj')}
        visible={!this.state.foundPlane}
        resources={[
          require('../../res/Voxel_Square_Corners.mtl'),
          require('../../res/Voxel_Square_Corners.png'),
        ]}
        scale={[0.2, 0.2, 0.2]}
        position={[-1.1, -0.5, 1]}
        type='OBJ'
      />
    </ViroNode>
  );
}
