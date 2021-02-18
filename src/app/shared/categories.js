import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
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
    const {initialData} = this.props;
    return (
      <View style={{paddingLeft: 10}}>
        <View style={{marginTop: 20, marginBottom: 10}}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {initialData &&
              initialData.map((item, index) => {
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
                        {color: catValue === item.name ? '#fff' : '#3B2D46'},
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
    paddingVertical: 1,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginRight: 5,
    elevation: 0.6,
  },

  _information_text: {
    fontSize: 13,
    fontFamily: 'Montserrat-Medium',
  },
});