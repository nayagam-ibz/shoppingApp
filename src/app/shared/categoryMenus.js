import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { getSubProduct } from '../../app/store/actions/products';
import { connect } from 'react-redux';
import Loader from '../shared/loader';

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selectValue: null, loading: false};
  }

  selectMenu = (id) => {
    this.setState({selectValue: id, loading: true});
    this.props.getSubProduct(id).then((data) => {
      this.setState({loading: false});
    });
  };

  componentDidMount() {
    const {itemId} = this.props;
    this.setState({selectValue: itemId});
  }

  render() {
    const {selectValue} = this.state;
    const {allCategories, title} = this.props;
    return (
      <View style={{paddingLeft: 10}}>
        <Loader loading={this.state.loading} />
        <View style={{paddingVertical: 10}}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {allCategories &&
              allCategories.map((item, index) => {
                return (
                  <View key={index}>
                    {item.taxons.map((item, index) => {
                      if (item.name === title) {
                        return (
                          <View style={{flexDirection: 'row'}} key={index}>
                            {item.taxons.map((item, index) => {
                              return (
                                <TouchableOpacity
                                  key={index}
                                  onPress={() => this.selectMenu(item.id)}
                                  style={[
                                    styles._information_widget,
                                    {
                                      backgroundColor:
                                        selectValue === item.id
                                          ? 'orange'
                                          : '#fff',
                                    },
                                  ]}>
                                  <Text
                                    style={[
                                      styles._information_text,
                                      {
                                        color:
                                          selectValue === item.id
                                            ? '#fff'
                                            : '#3B2D46',
                                      },
                                    ]}>
                                    {item.name}
                                  </Text>
                                </TouchableOpacity>
                              );
                            })}
                          </View>
                        );
                      }
                    })}
                  </View>
                );
              })}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allCategories: state.products.allCategories,
  };
};

export default connect(mapStateToProps, {getSubProduct})(Categories);

const styles = StyleSheet.create({
  _information_widget: {
    paddingVertical: 1,
    paddingHorizontal: 5,
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
    lineHeight: 16, 
    fontFamily: 'Montserrat-Medium',
  },
});