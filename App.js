import React from 'react';
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, ScrollView, View } from 'react-native';
import { Camera, Permissions } from 'expo';
import {awsAnalysisAsync} from './src/AWS'

class Service extends React.Component {
  render() {
    return (
      <Text style={{textAlign: 'center'}}>
        {this.props.service}
      </Text>
    );
  }
}

export default class ImageProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      image: "https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg",
      AWSText: "AWS",
      AWSEnabled: true,
      AWSColor: "powderblue",
      AzureEnabled: true,
      AzureColor: "skyblue",
      GoogleEnabled: true,
      GoogleColor: "steelblue"
    };
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted'});
  }

  snap = async () => {
    const options = { base64: true };
    if (this.camera) {
      let photo = await this.camera.takePictureAsync(options);
      this.setState({image: photo.uri});
      if(this.state.AWSEnabled) {
        this.setState({AWSText: await(awsAnalysisAsync(photo.base64))});
      }
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
        <View style={styles.container}>
          <Camera style={{flex: 1}} type={this.state.type} ref={ref => { this.camera = ref; }} >
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
                onPress={this.snap}>
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                  {' '}Detect{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </Camera>

          <View style = {{flexDirection: 'column', justifyContent: 'space-between', paddingBottom: 10}}>
            <TouchableOpacity style = {{backgroundColor: this.state.AWSColor, paddingTop: 5, paddingBottom: 5}} onPress={() => {
              if(this.state.AWSEnabled == true) {
                this.setState({AWSColor: "black"});
              }
              else {
                this.setState({AWSColor: "powderblue"})
              }
              this.setState({AWSEnabled: !this.state.AWSEnabled});
            }}>
              <Service service = {this.state.AWSText}/>
            </TouchableOpacity>
            <TouchableOpacity style = {{backgroundColor: this.state.AzureColor, paddingTop: 5, paddingBottom: 5}} onPress={() => {
              this.setState({AzureEnabled: !this.state.AzureEnabled});
              if(this.state.AzureEnabled == false) {
                this.setState({AzureColor: "black"});
              }
              else {
                this.setState({AzureColor: "skyblue"})
              }
            }}>
              <Service service = "Azure"/>
            </TouchableOpacity>
            <View style = {{backgroundColor: this.state.GoogleColor, paddingTop: 5, paddingBottom: 5}} onPress={() => {
              this.setState({GoogleEnabled: !this.state.GoogleEnabled});
              if(this.state.GoogleEnabled == false) {
                this.setState({GoogleColor: "black"});
              }
              else {
                this.setState({GoogleColor: "steelblue"})
              }
            }}>
              <Service service = "Google Cloud" />
            </View>
          </View>
        </View>
      );
    }
  }
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 20,
    },
  });
