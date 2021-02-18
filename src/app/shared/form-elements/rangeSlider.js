import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Slider from 'react-native-custom-slider';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const soSlider = ({ label, min, max, interval, initialValue, input: { onChange, } }) => {
  const [value, setValue] = useState(initialValue);
  onChange(value);
  return (
    <View>
      <Text style={styles._textLable}>{label}</Text>
      <Slider
        value={value}
        minimumValue={min}
        maximumValue={max}
        onValueChange={(value) => setValue(value)}
        minimumTrackTintColor="orange"
        maximumTrackTintColor="#ddd"
        thumbStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          height: 35,
          width: 15,
          backgroundColor: '#fff',
          borderWidth: 1,
          borderColor: '#ddd',
          borderRadius: 100,
        }}
      />
      <View style={styles._sliderInput}>
        <Text style={{fontSize: 18, fontFamily: 'Montserrat-Medium', color:'#3f2950'}}>
          <FontAwesome name="rupee" size={16} color="#3f2950" />{' '}
          {Math.round(value * 100) / 100}{' '}
        </Text>
      </View>
    </View>
  )
}

export default soSlider;

const styles = StyleSheet.create({
  _textLable: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    color: '#7a7a7a',
    marginBottom: 5,
  },

  _sliderInput: {
    width: '100%',
    marginTop: 10,
    paddingHorizontal: 10,
    height: 40,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 3,
    alignItems: 'center',
  },
});