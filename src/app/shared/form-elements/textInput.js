import React, {Component} from 'react';
import {Text, View, TextInput, StyleSheet} from 'react-native';

const textInput = ({
  placeholder,
  style,
  keyboardType,
  label,
  meta: {error, touched},
  input,
}) => {
  return (
    <View>
      <Text style={styles._textLable}>{label}</Text>
      <TextInput
        style={styles._textInput}
        placeholder={placeholder}
        keyboardType={keyboardType}
        {...input}
      />
      {touched && error && <Text style={styles._error_text}>{error}</Text>}
    </View>
  );
};

export default textInput;


const styles = StyleSheet.create({
  _textLable: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    color: '#7a7a7a',
    marginBottom: 5,
  },

  _textInput: {
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