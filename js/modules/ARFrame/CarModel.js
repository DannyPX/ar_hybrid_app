'use strict';

import React from 'react';

import { Viro3DObject, ViroNode } from 'react-viro';

const carScale = 0.05;

export function getCarModel() {
  let position = this.state.isReady
    ? this.state.lastFoundPlaneLocation
    : [0, 20, 0];

  var transformBehaviors = this.state.shouldBillboard ? 'billboardY' : [];

  return (
    <ViroNode
      position={position}
      rotation={this.state.modelWorldRotation}
      transformBehaviors={transformBehaviors}
    >
      <ViroNode
        ref={(car) => {
          this.car = car;
        }}
        scale={[carScale, carScale, carScale]}
      >
        <Viro3DObject
          source={require('../../res/Voxel_Truck.obj')}
          position={[0, 0, 0]}
          resources={[
            require('../../res/Voxel_Truck.mtl'),
            require('../../res/Voxel_Truck.png'),
          ]}
          type='OBJ'
        />
      </ViroNode>
    </ViroNode>
  );
}
