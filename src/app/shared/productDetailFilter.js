
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

class ProductDetailFilter extends React.Component {
  state = { size: 'XXS', color: '#34283E'}

  _pickerColor = (color) => {
    this.setState({color: color});
  };

  _pickerSize = (size) => {
    this.setState({size: size});
  };

  render() {
    const { color, size } = this.state
    const { productFilter } = this.props
    return (
      <View style={{paddingHorizontal: 10, paddingVertical: 10}}>
        <Text style={styles._styleTitle}>Colors</Text>
        <View>
          { productFilter.map((item, index) =>{
              if(item.name === "color") {
                return(
                  <View style={styles._filterRow} key={index}>
                    {item.optionValues.map((item, index) => {
                      return(
                         <TouchableOpacity
                            onPress={() => this._pickerColor(item.name)}
                            key={index}
                            style={[styles._colorView, {borderColor: color === item.name ? 'orange' : '#ddd', backgroundColor: item.name}]}>
                          </TouchableOpacity>
                        )
                     })
                    }
                  </View>
                )
              } 
            })
          }
        </View>
        <View style={{marginTop: 20}}>
          <Text style={styles._styleTitle}>Size</Text>
          { productFilter.map((item, index) =>{
              if(item.name === "size") {
                return(
                  <View style={styles._filterRow} key={index}>
                    {item.optionValues.map((item, index) => {
                      return(
                         <TouchableOpacity
                            onPress={() => this._pickerSize(item.name)}
                            key={index}
                            style={[styles._sizeView, {borderColor: size === item.name ? 'orange' : '#ddd'}]}>
                             <Text style={styles._sizeText}>{item.name}</Text>
                          </TouchableOpacity>
                        )
                     })
                    }
                  </View>
                )
              } 
            })
          }
        </View>
      </View>
    );
  }
}

export default ProductDetailFilter

const styles = StyleSheet.create({

  _filterRow: {
    flexDirection: 'row', 
    alignItems: 'center'
  },

  _styleTitle: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    color: '#3B2D46',
    textTransform: 'uppercase',
    marginBottom: 8,
  },

  _colorView: {
    borderWidth: 1,
    width: 30,
    height: 30,
    marginRight: 10,
    borderRadius: 100,
  },

  _sizeView: {
    width: 50,
    height: 30,
    borderWidth: 1,
    alignItems:'center',
    justifyContent:'center',
    marginRight: 10,
    borderRadius: 2
  },

  _sizeText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    color: '#3B2D46',
    textTransform: 'uppercase'
  }
});
