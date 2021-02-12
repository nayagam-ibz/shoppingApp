import React, { useState} from 'react';
import { View,StyleSheet, Text } from 'react-native';
import Slider from 'react-native-custom-slider';

const rangeSlider = (props) => {
  const [value, setValue] = useState(0);
  const {
    meta: {touched, error},
    label,
    optionValue,
    onPress,
    optionType,
    input: {onChange},
  } = props;
  onChange(value);

  return (
    <View>
      <Text style={styles._textLable}>{label}</Text>
      <Slider
        value={value}
        minimumValue={0}
        maximumValue={1000}
        minimumTrackTintColor="orange"
        maximumTrackTintColor="#ddd"
        onValueChange={(value) => setValue(value)}
        thumbStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          height: 20,
          width: 20,
          backgroundColor: '#fff',
          borderWidth: 1,
          borderColor: '#ddd',
          borderRadius: 100,
        }}
      />
      <View style={styles._sliderInput}>
        <Text>${value} </Text>
      </View>
    </View>
  );
};

export default rangeSlider;

const styles = StyleSheet.create({
  _textLable: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    color: '#7a7a7a',
    marginBottom: 5,
  },

  _sliderInput: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 3,
    alignItems: 'center',
  },
});