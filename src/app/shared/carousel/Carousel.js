import React, {Component} from 'react';
import {
  Text,
  View,
  Dimensions,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import Carousel from 'react-native-looped-carousel';

const {width, height} = Dimensions.get('window');

class CarouselSlider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      size: {width, height},
    };
  }
  _onLayoutDidChange = (e) => {
    const layout = e.nativeEvent.layout;
    this.setState({size: {width: layout.width, height: layout.height}});
  };

  render() {
    return (
      <View
        style={{flex: 1, borderRadius: 3}}
        onLayout={this._onLayoutDidChange}>
        <Carousel
          delay={3000}
          style={[this.state.size, {borderRadius: 3}]}
          autoplay
          bullets
          bulletStyle={{width: 20, height: 2, marginRight: 0}}
          chosenBulletStyle={{marginRight: 0, width: 20, height: 2}}
          bulletsContainerStyle={{paddingTop: 25}}>
          <View style={[styles._slideView, this.state.size]}>
            <ImageBackground
              source={require('../../../../assets/images/slide-1.jpg')}
              style={styles._bg_image}
              imageStyle={{borderRadius: 3}}>
              <View style={styles.overlay} />
              <Text style={styles._slideText}>Fashion Sale</Text>
            </ImageBackground>
          </View>

          <View style={[styles._slideView, this.state.size]}>
            <ImageBackground
              source={require('../../../../assets/images/slide-2.jpg')}
              style={styles._bg_image}
              imageStyle={{borderRadius: 3}}>
              <View style={styles.overlay} />
              <Text style={styles._slideText}>Fashion Sale</Text>
            </ImageBackground>  
          </View>

          <View style={[styles._slideView, this.state.size]}>
            <ImageBackground
              imageStyle={{borderRadius: 3}}
              source={require('../../../../assets/images/slide-3.png')}
              style={styles._bg_image}
              imageStyle={{borderRadius: 3}}>
              <View style={styles.overlay} />
              <Text style={styles._slideText}>Fashion Sale</Text>
            </ImageBackground>
          </View>

          <View style={[styles._slideView, this.state.size]}>
            <ImageBackground
              source={require('../../../../assets/images/slide-4.jpg')}
              style={styles._bg_image}
              imageStyle={{borderRadius: 3}}>
              <View style={styles.overlay} />
              <Text style={styles._slideText}>Fashion Sale</Text>
            </ImageBackground>
          </View>

          <View style={[styles._slideView, this.state.size]}>
            <ImageBackground
              source={require('../../../../assets/images/slide-5.jpg')}
              style={styles._bg_image}
              imageStyle={{borderRadius: 3}}>
              <View style={styles.overlay} />
              <Text style={styles._slideText}>Fashion Sale</Text>
            </ImageBackground>
          </View>
        </Carousel>
      </View>
    );
  }
}

export default  CarouselSlider

const styles = StyleSheet.create({
  _slideView: {
    backgroundColor: '#BADA55',
    height: 100,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },

  _bg_image: {
    width: '100%',
    height: '100%',
    borderRadius: 3,
    justifyContent: 'center',
  },

  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: '#3C2E48',
    opacity: 0.5,
    borderRadius: 3,
  },

  _slideText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 18,
    color: '#fff',
    paddingLeft: 10,
  },
});