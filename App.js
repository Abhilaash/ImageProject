import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, ScrollView, View } from 'react-native';
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

export default class CameraExample extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }
  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <ScrollView style={styles.container}>
          <Camera style={{flex: 4, height: 600}} type={this.state.type}>
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
                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back,
                  });
                }}>
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                  {' '}Flip{' '}
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
