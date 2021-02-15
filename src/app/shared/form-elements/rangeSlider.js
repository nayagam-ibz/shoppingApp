import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Slider from 'react-native-custom-slider';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const rangeSlider = (props) => {
  const [value, setValue] = useState(100);
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
          height: 35,
          width: 15,
          backgroundColor: '#fff',
          borderWidth: 1,
          borderColor: '#ddd',
          borderRadius: 100,
        }}
      />
      <View style={styles._sliderInput}>
        <Text style={{fontSize: 16, fontFamily: 'Montserrat-Medium'}}>
          <FontAwesome name="rupee" size={15} color="#3f2950" />{' '}
          {Math.round(value * 100) / 100}{' '}
        </Text>
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
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 3,
    alignItems: 'center',
  },
});