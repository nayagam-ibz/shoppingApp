import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

class StepProgressIndicator extends Component {
   render() {
    const { step1, step2, step3 } = this.props
    return (
      <View style={{ flex: 1, paddingHorizontal: 10, paddingVertical: 10}}>
        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
          <View style={{flex: 0.8}}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
               <View style={[styles._stepLine, {width: '55%', backgroundColor: step1 === true ? 'green' : '#ddd'}]}/>
               <FontAwesome name="dot-circle-o" size={12} style={{color: step1 === true ? 'green' : '#ddd'}} />
               <Text style={[styles._stepText, {color: step1 === true ? "green" : '#333'}]}>Cart</Text>
            </View> 
          </View>
          <View style={{flex: 1}}>
            <View style={{flex: 1}}>
              <View style={{flexDirection:'row', alignItems:'center'}}>
                 <View style={[styles._stepLine, {backgroundColor: step2 === true ? 'green' : '#ddd'}]}/>
                 <FontAwesome name="dot-circle-o" size={12} style={{color: step2 === true ? 'green' : '#ddd'}} />
                 <Text style={[styles._stepText, {color: step2 === true ? "green" : '#333'}]}>Address</Text>
              </View> 
            </View>
          </View>
          <View style={{flex: 1}}>
            <View style={{flex: 1}}>
              <View style={{flexDirection:'row', alignItems:'center'}}>
                 <View style={[styles._stepLine, {backgroundColor: step3 === true ? 'green' : '#ddd'}]}/>
                 <FontAwesome name="dot-circle-o" size={12} style={{color: step3 === true ? 'green' : '#ddd'}} />
                 <Text style={[styles._stepText, {color: step3 === true ? "green" : '#333'}]}>Payment</Text>
              </View> 
            </View>
          </View>
        </View>  
      </View>
    );
  }
}

export default StepProgressIndicator;

const styles = StyleSheet.create({
  _stepText: {
    fontSize: 10.5,
    fontFamily: 'Montserrat-Medium',
    paddingHorizontal: 8,
    marginLeft: -2,
    marginTop: -2
  },

  _stepLine: {
    width: '45%',
    height: 2,
    backgroundColor:'#ddd',
  },
});