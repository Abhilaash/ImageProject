import React from 'react';
import {FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, ScrollView, View } from 'react-native';
import { Camera, Permissions } from 'expo';
import {awsAnalysisAsync} from './src/AWS'
import {googleAnalysisAsync} from './src/Google'

class Service extends React.Component {
  render() {
    return (
      <Text style={{textAlign: 'center', fontSize: 15}}>
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
      image: "",
      AWSText: "",
      AWSEnabled: true,
      AWSColor: "powderblue",
      AzureText: "",
      AzureEnabled: true,
      AzureColor: "skyblue",
      GoogleText: "",
      GoogleEnabled: true,
      GoogleColor: "steelblue",
      modalVisible: false,
    };
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted'});
  }

  snap = async () => {
    this.setModalVisible(!this.state.modalVisible);
    const options = { quality: 0.5, base64: true };
    if (this.camera) {
      let photo = await this.camera.takePictureAsync(options);
      this.setState({image: photo.uri});
      if(this.state.AWSEnabled) {
        var text = await(awsAnalysisAsync(photo.base64));
        text = text.substring(0, text.length - 1);
        var separatedVars = text.split(";").map(detection => {
          var label = detection.split('-');
          return " " + label[0] + "-" + label[1].substring(0, 5) + "\n";
        });
        this.setState({AWSText: separatedVars});
      }
      else {
        this.setState({AWSText: "Disabled"});
      }

      if(this.state.GoogleEnabled) {
        var text = await(googleAnalysisAsync(photo.base64));
        text = text.substring(0, text.length - 1);
        var separatedVars = text.split(";").map(detection => {
          var label = detection.split('-');
          if(label.length > 1 && label[1].length > 4) {
            return " " + label[0] + "-" + ((Number.parseFloat(label[1]) * 100) + "").substring(0, 5) + "\n";
          }
          else {
            return " " + label + "\n";
          }
        });
        this.setState({GoogleText: separatedVars});
      }
      else {
        this.setState({GoogleText: "Disabled"});
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
          <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}>
          <View style={{marginTop: 22}}>
              <View>

                <TouchableOpacity
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}>
                  <Text style={{backgroundColor: "powderblue", fontSize: 20, textAlign: 'center'}}> AWS </Text>
                  <Text style={{backgroundColor: "powderblue"}}>
                    <Service service = {this.state.AWSText} />
                  </Text>
                  <Text style={{backgroundColor: "skyblue", fontSize: 20, textAlign: 'center'}}> Azure </Text>
                  <Text style={{backgroundColor: "skyblue"}}>
                    <Service service = {this.state.AzureText} />
                  </Text>
                  <Text style={{backgroundColor: "steelblue", fontSize: 20, textAlign: 'center'}}> Google Cloud Platform </Text>
                  <Text style={{backgroundColor: "steelblue"}}>
                    <Service service = {this.state.GoogleText} />
                  </Text>
                  <Image source={image}/>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
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
              <Text style={{textAlign: 'center'}}>
                Amazon Web Services
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style = {{backgroundColor: this.state.AzureColor, paddingTop: 5, paddingBottom: 5}} onPress={() => {
              if(this.state.AzureEnabled == true) {
                this.setState({AzureColor: "black"});
              }
              else {
                this.setState({AzureColor: "skyblue"})
              }
              this.setState({AzureEnabled: !this.state.AzureEnabled});
            }}>
            <Text style={{textAlign: 'center'}}>
              Azure
            </Text>
            </TouchableOpacity>

            <TouchableOpacity style = {{backgroundColor: this.state.GoogleColor, paddingTop: 5, paddingBottom: 5}} onPress={() => {
              if(this.state.GoogleEnabled == true) {
                this.setState({GoogleColor: "black"});
              }
              else {
                this.setState({GoogleColor: "steelblue"})
              }
              this.setState({GoogleEnabled: !this.state.GoogleEnabled});
            }}>
            <Text style={{textAlign: 'center'}}>
              Google Cloud Platform
            </Text>
            </TouchableOpacity>
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
