import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {FlatListSlider} from 'react-native-flatlist-slider';

const images = [
  {
    banner: require('../../../assets/images/New.png'),
    desc: 'Silent Waters in the mountains in midst of Himilayas',
  },

  {
    banner: require('../../../assets/images/ca.jpeg'),
    desc: 'Silent Waters in the mountains in midst of Himilayas',
  },
  
];

export default class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FlatListSlider
          data={images}
          imageKey={'banner'}
          local
          height={350} 
          width={275}
          onPress={(item) => alert(JSON.stringify(item))}
          autoscroll={false}
          indicatorContainerStyle={{position:'absolute', bottom: -15}}
          contentContainerStyle={{height: 350}}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor:'#eee',
    marginBottom: 25,
  },
});