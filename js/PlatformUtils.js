import { Dimensions, Platform } from 'react-native';
import * as styleConstants from './res/styleConstants';

export const isIPhoneX = () => {
  let d = Dimensions.get('window');
  const { height, width } = d;

  return (
    // This has to be iOS duh
    Platform.OS === 'ios' &&
    // Accounting for the height in either orientation
    (height === styleConstants.IOSSIZES.iPhoneXHeight ||
      width === styleConstants.IOSSIZES.iPhoneXHeight || // iPhone X & XS
      height === styleConstants.IOSSIZES.iPhoneXSHeight ||
      width === styleConstants.IOSSIZES.iPhoneXSHeight) // iPhone XR & XS Max
  );
};

export const isIOS = () => {
  return Platform.OS === 'ios';
};

export const isAndroid = () => {
  return Platform.OS === 'android';
};

export const iOSTopPadding = styleConstants.IOSSIZES.iOSTopPadding;
export const iPhoneXBottomPadding =
  styleConstants.IOSSIZES.iPhoneXBottomPadding;
