import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

export default (Preview = ({
  style,
  item,
  imageKey,
  onPress,
  index,
  active,
  local,
}) => {
  return (
    <View style={[styles.videoContainer]}>
      <Image
        style={[styles.videoPreview]}
        source={{uri: item[imageKey]}}
        resizeMode={'cover'}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  videoContainer: {
    width: 360,
    // aspectRatio: 1 * 0.7,
  },
  videoPreview: {
    // height: 400,
    flex: 0.5,
    aspectRatio: 0.75, 
    resizeMode: 'contain',
  },
 
});

