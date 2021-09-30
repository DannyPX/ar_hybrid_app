'use strict';

export function getPressDown(key) {
  return () => {
    let dict = {};
    dict[key] = true;
    this.setState(dict);
    this.setState({
      leftRightRatio: 1,
    });
  };
}

export function getPressUp(key) {
  return () => {
    let dict = {};
    dict[key] = false;
    this.setState(dict);
    this.setState({
      leftRightRatio: 0,
    });
  };
}
