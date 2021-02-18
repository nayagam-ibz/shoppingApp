import React, {useRef, useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';

const selectPicker = (props) => {
  const [value, setValue] = useState();
  const {
    meta: {touched, error},
    label,
    optionValue,
    onPress,
    optionType,
    type,
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
      <View style={{flexDirection: 'row', justifyContent: type === "length" ? null : 'space-between'}}>
        {optionValue &&
          optionValue.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => onNavigation(item.name)}
                style={{flexDirection: 'row', marginRight: type ==="length" ? 15 : null}}>
                {optionType && optionType === "size" ? (
                  <View
                    style={{
                      width: 45,
                      height: 32,
                      backgroundColor: value === item.name ? "orange" : '#fff',
                      borderRadius:2,
                      borderWidth: 1,
                      borderColor: value === item.name ? 'orange' : '#ddd',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={{fontFamily: 'Montserrat-Medium', fontSize: 12, color: value === item.name ? '#fff' : '#7a7a7a',}}>{item.name}</Text>
                  </View>
                ) : (
                  <View
                    style={{
                      width: 30,
                      height: 30,
                      backgroundColor: item.name,
                      borderRadius: 20,
                      borderWidth: 1,
                      borderColor: value === item.name ? "orange" : item.name,
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
    marginBottom: 10,
    color: '#7a7a7a',
    fontSize: 11,
    textTransform: 'uppercase',
  }

});