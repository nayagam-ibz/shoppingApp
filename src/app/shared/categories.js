import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const categories = [
  {id: 1, name: 'All'},
  {id: 2, name: 'Dress'},
  {id: 3, name: 'Tops'},
  {id: 4, name: 'Sweaters'},
  {id: 5, name: 'Jeans'},
  {id: 6, name: 'Kurtas'},
  {id: 7, name: 'Tshirts'},
  {id: 8, name: 'Track Pants'},
];

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {catValue: 'All'};
  }

  selectCategorie = (res) => {
    this.setState({catValue: res});
  };
  render() {
    const {catValue} = this.state;
    return (
      <View style={{paddingLeft: 10}}>
        <View style={{paddingVertical: 12}}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {categories &&
              categories.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => this.selectCategorie(item.name)}
                    style={[
                      styles._information_widget,
                      {
                        backgroundColor:
                          catValue === item.name ? 'orange' : '#fff',
                      },
                    ]}>
                    <Text
                      style={[
                        styles._information_text,
                        {color: catValue === item.name ? '#fff' : '#7B5996'},
                      ]}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default Categories;

const styles = StyleSheet.create({
  _information_widget: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    marginRight: 8,
    elevation: 0.5,
  },

  _information_text: {
    fontSize: 11.5,
    fontFamily: 'Montserrat-Medium',
  },
});