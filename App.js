import React from 'react';
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, ScrollView, View } from 'react-native';
import { Camera, Permissions } from 'expo';

class Service extends React.Component {
  render() {
    return (
      <Text style={{textAlign: 'center'}}>
        {this.props.service} Lorem ipsum dolor sit amet, dicam ubique intellegat eos in, te laoreet probatus facilisis sed. Vim ex dolore omnesque. An simul similique vix, per ad menandri indoctum scriptorem. Vide sonet blandit mel ad, ea timeam patrioque mei. Qui at doming adipiscing.
      </Text>
    );
  }
}

export default class ImageProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      image: "https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg"
    };
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted'});
  }

  snap = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
      this.setState({image: photo.uri})
    }
  };

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <ScrollView style={styles.container}>
          <Camera style={{flex: 4, height: 600}} type={this.state.type} ref={ref => { this.camera = ref; }} >
            <View
              style={{
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={this.snap} >
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                  {' '}Capture{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </Camera>

          <View style = {{flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
            <View style = {{backgroundColor: 'powderblue'}}>
              <Service service = "AWS"  />
            </View>
            <View style = {{backgroundColor: 'skyblue'}}>
              <Service service = "Azure"/>
            </View>
            <View style = {{backgroundColor: 'steelblue', paddingBottom: 22}}>
              <Service service = "Google Cloud" />
            </View>
          </View>

          <Image source={{uri: this.state.image}} style={{width: 193, height: 110}}/>
        </ScrollView>
      );
    }
  }
}

  const styles = StyleSheet.create({
    container: {
      flex: 2,
      paddingTop: 22,
      paddingBottom: 22,
    },
  });
