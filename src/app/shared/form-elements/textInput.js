import React, {Component} from 'react';
import {Text, View, TextInput, StyleSheet} from 'react-native';

const textInput = ({
  placeholder,
  style,
  keyboardType,
  secureTextEntry,
  label,
  underlineColorAndroid,
  meta: {error, touched},
  input,
}) => {
  return (
    <View>
      <Text style={styles._textLable}>{label}</Text>
      <TextInput
        secureTextEntry={secureTextEntry}
        style={styles._textInput}
        underlineColorAndroid={underlineColorAndroid}
        placeholder={placeholder}
        keyboardType={keyboardType}
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
    fontSize: 12,
    color: '#7a7a7a',
    marginBottom: 3,
  },

  _textInput: {
    width: '100%',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    height: 38,
    borderRadius: 3,
    alignItems: 'center',
    fontFamily: 'Montserrat-Medium',
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