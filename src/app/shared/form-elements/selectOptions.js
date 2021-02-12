import React, {useRef, useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';

const selectPicker = (props) => {
  const [value, setValue] = useState('Please Select value ');
  const {
    meta: {touched, error},
    label,
    optionValue,
    onPress,
    optionType,
    input: {onChange},
  } = props;
  onChange(value);

  const onNavigation = (res) => {
    setValue(res);
  };

  return (
    <View>
      <Text
        style={styles._textLable}>
        {label}
      </Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        {optionValue &&
          optionValue.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => onNavigation(item)}
                style={{flexDirection: 'row'}}>
                {optionType && optionType === "size" ? (
                  <View
                    style={{
                      width: 40,
                      height: 32,
                      backgroundColor: value === item ? "orange" : '#fff',
                      borderRadius:2,
                      borderWidth: 1,
                      borderColor: value === item ? 'orange' : '#ddd',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={{fontFamily: 'Montserrat-Medium', fontSize: 12}}>{item}</Text>
                  </View>
                ) : (
                  <View
                    style={{
                      width: 30,
                      height: 30,
                      backgroundColor: item,
                      borderRadius: 20,
                      borderWidth: 1,
                      borderColor: value === item ? "orange" : item,
                    }}
                  />
                )}
              </TouchableOpacity>
            );
          })}
      </View>
    </View>
  );
};

export default selectPicker;

const styles = StyleSheet.create({

  _textLable: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    color: '#7a7a7a',
    marginBottom: 5,
  }

});