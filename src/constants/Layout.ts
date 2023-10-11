import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default {
  window: {
    width,
    height
  },
  isSmallDevice: width < 375,
  pageTopPadding: 65,
  tabIconHeight: 68
};
