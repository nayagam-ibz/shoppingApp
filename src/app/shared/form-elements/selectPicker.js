import React, {useRef, useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import Entypo from 'react-native-vector-icons/Entypo';

const selectPicker = (props) => {
  const [value, setValue] = useState('Please Select value ');
  const {
    meta: {touched, error},
    label,
    optionValue,
    onPress,
    input: {onChange},
  } = props;

  onChange(value);
  const refRBSheet = useRef();
  const onNavigation = (res) => {
    setValue(res);
    refRBSheet.current.close();
  };
  return (
    <View>
      <Text style={styles._textLabel}>{label}</Text>
      <View style={{flexDirection:'row'}}>
        <TouchableOpacity
          style={styles._selectOption}
          onPress={() => refRBSheet.current.open()}>
          <Text style={styles._selectValue}>
            {value}
          </Text>
        </TouchableOpacity>
        <View style={styles._positionIcons}>
          <Entypo name="chevron-small-right" size={20} color="#7a7a7a"/>
        </View>
      </View> 
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
    fontSize: 12,
    color: '#7a7a7a',
    marginBottom: 5,
  },

  _optionValue: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 13,
    color: '#7a7a7a',
  },

  _selectOption: {
    height: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 3,
    width: '100%'
  },

  _selectValue: {
    fontFamily: 'Montserrat-Medium', 
    fontSize: 13
  },

  _selectRow: {
    paddingHorizontal: 10,
    paddingVertical: 8
  },

  _positionIcons: {
    position: "absolute",
    right: 5,
    top: 10
  },

  _optionTitle: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontFamily: 'Montserrat-Medium', 
  }
});