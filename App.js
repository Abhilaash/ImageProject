import React from 'react';
import {FlatList, StyleSheet, Text, ScrollView, View } from 'react-native';

class Service extends React.Component {
  render() {
    return (
      <Text style={{textAlign: 'center'}}>
        {this.props.service} Lorem ipsum dolor sit amet, dicam ubique intellegat eos in, te laoreet probatus facilisis sed. Vim ex dolore omnesque. An simul similique vix, per ad menandri indoctum scriptorem. Vide sonet blandit mel ad, ea timeam patrioque mei. Qui at doming adipiscing.
      </Text>
    );
  }
}

export default class App extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container}>
          <Text style={{flex: 3, textAlign: 'center', height: 600}}>
            Camera
          </Text>
          <View style = {{flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
            <View style = {{backgroundColor: 'powderblue'}}>
              <Service service = "AWS"  />
            </View>
            <View style = {{backgroundColor: 'skyblue'}}>
              <Service service = "Azure"/>
            </View>
            <View style = {{backgroundColor: 'steelblue'}}>
              <Service service = "Google Cloud" />
            </View>
          </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    paddingTop: 22,
    paddingBottom: 22,
  },

  item: {
    padding: 10,
    fontSize: 18,
    height: 10,
  },
});
