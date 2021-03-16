import React, {Component} from 'react';
import {Text, View, TextInput, StyleSheet} from 'react-native';

const textInput = ({
  placeholder,
  style,
  keyboardType,
  secureTextEntry,
  label,
  underlineColorAndroid,
  styleName,
  maxLength,
  hideClass,
  meta: {error, touched},
  input,
}) => {
  return (
    <View>
      <TextInput
        secureTextEntry={secureTextEntry}
        style={hideClass ? styles.hiddenInput : styles._textInput }
        underlineColorAndroid={underlineColorAndroid}
        placeholder={placeholder}
        keyboardType={keyboardType}
        maxLength={maxLength}
        {...input}
      />
      {touched && error && <Text style={styles._errorText}>{error}</Text>}
    </View>
  );
};

export default textInput;


const styles = StyleSheet.create({
  _textLable: {
    fontFamily: 'Montserrat-Medium',
    color: '#7a7a7a',
    fontSize: 11,
    textTransform: 'uppercase',
    marginBottom: 5,
  },

  _normalInput: {
    width: '100%',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    height: 38,
    color:'#7a7a7a',
    fontSize: 13,
    borderRadius: 5,
    alignItems: 'center',
    fontFamily: 'Montserrat-Medium',
  },

  _textInput: {
    width: '100%',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    height: 40,
    color:'#7a7a7a',
    fontSize: 13,
    borderRadius: 5,
    alignItems: 'center',
    fontFamily: 'Montserrat-Medium',
  },

  hiddenInput: {
    height: 0,
    marginBottom: -100
  },

  _errorText: {
    color:'red',
    fontSize: 9,
    fontFamily: 'Montserrat-Medium',
    position: 'absolute',
    bottom: -12,
    right: 0
  }
});