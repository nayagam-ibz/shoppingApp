import React, {useRef, useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  FlatList,
  Modal,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {getStates} from '../../../app/store/actions/products';
import {connect} from 'react-redux';
const selectPicker = (props) => {
  const {
    meta: {touched, error},
    label,
    optionValue,
    picker,
    defaultName,
    input: {onChange},
  } = props;
  const [value, setValue] = useState();
  const [name, setName] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  onChange(value ? value : 999);
  
  const onNavigation = (id, name) => {
    setValue(id);
    setName(name);
    setModalVisible(false);
    if (picker === 'country') {
      props.getStates(id);
    }
  };
  return (
    <View>
      <Text style={styles._textLabel}>{label}</Text>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={styles._selectOption}
          onPress={() => {
            setModalVisible(true);
          }}>
          {name ? 
            <Text
              style={[styles._selectValue,{color: name ? '#7a7a7a' : '#989898'},]}>
              {name ? name : 'Select value'}
            </Text>
            : 
            <Text style={[styles._selectValue, {color:'#989898'}]}>{defaultName}</Text> 
          }
        </TouchableOpacity>
        <View style={styles._positionIcons}>
          <Entypo name="chevron-small-right" size={20} color="#7a7a7a" />
        </View>
      </View>
      {!name && touched && error && (
        <Text style={styles._errorText}>{error}</Text>
      )}
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles._centeredView}>
          <View style={styles._modalView}>
            <View style={styles._spaceBetween}>
              <Text style={styles._optionTitle}>Select {label}</Text>
              <TouchableOpacity onPress={() =>{setModalVisible(false)}} style={styles._modalClose}>
                <EvilIcons name="close-o" size={30} color="#7a7a7a" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={optionValue && optionValue}
              keyExtractor={(item, index) => index}
              renderItem={({item}) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles._selectRow}
                  onPress={() => onNavigation(item.id, item.name)}>
                  <View style={styles._spaceBetween}>
                    <Text style={styles._optionValue}>
                      {item.name}
                    </Text>
                    <Ionicons name="md-checkmark" size={25} color={item.id !== value ? '#fff' : 'green'} />
                  </View> 
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {getStates})(selectPicker);

const styles = StyleSheet.create({
  _modalView: {
    margin: 15,
    backgroundColor: 'white',
    borderRadius: 0,
    padding: 10,
    height: '80%',
    borderRadius: 3
  },

  _centeredView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent:'center',
  },

  _spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

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
    color: '#7a7a7a',
    fontSize: 13,
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
    paddingVertical: 10,
    marginBottom: 2
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
    right: 0,
  },
});