import React, {useRef, useState} from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import Entypo from 'react-native-vector-icons/Entypo';

const selectPicker = (props) => {
  const {
    meta: {touched, error},
    label,
    optionValue,
    input: {onChange},
  } = props;
  onChange(value);
  const [value, setValue] = useState();
  const refRBSheet = useRef();
  const onNavigation = (res) => {
    setValue(res);
    refRBSheet.current.close();
  };
  return (
    <View>
      <Text style={styles._textLabel}>{label}</Text>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={styles._selectOption}
          onPress={() => refRBSheet.current.open()}>
          <Text
            style={[
              styles._selectValue,
              {color: value ? '#3B2D46' : '#989898'},
            ]}>
            {value ? value : 'Select value'}
          </Text>
        </TouchableOpacity>
        <View style={styles._positionIcons}>
          <Entypo name="chevron-small-right" size={20} color="#7a7a7a" />
        </View>
      </View>
      { !value && touched && error && <Text style={styles._errorText}>{error}</Text>}
      <RBSheet
        ref={refRBSheet}
        height={380}
        openDuration={500}
        closeOnPressMask={true}
        closeOnDragDown={true}
        customStyles={{
          container: {
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          },
        }}>
        <View>
          <View style={{marginTop: 10}}>
            <Text style={styles._optionTitle}>Select {label}</Text>
            {optionValue &&
              optionValue.map((item) => {
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={styles._selectRow}
                    onPress={() => onNavigation(item.name)}>
                    <Text style={styles._optionValue}>{item.name}</Text>
                  </TouchableOpacity>
                );
              })}
          </View>
        </View>
      </RBSheet>
    </View>
  );
};

export default selectPicker;

const styles = StyleSheet.create({
  _textLabel: {
    fontFamily: 'Montserrat-Medium',
    color: '#7a7a7a',
    fontSize: 11,
    textTransform: 'uppercase',
    marginBottom: 5,
  },

  _optionValue: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 13,
    color: '#7a7a7a',
  },

  _selectOption: {
    height: 38,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 3,
    width: '100%',
  },

  _selectValue: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 13,
  },

  _selectRow: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },

  _positionIcons: {
    position: 'absolute',
    right: 5,
    top: 10,
  },

  _optionTitle: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontFamily: 'Montserrat-Medium',
  },

  _errorText: {
    color: 'red',
    fontSize: 9,
    fontFamily: 'Montserrat-Medium',
    position: 'absolute',
    bottom: -12,
    right: 0
  },
});