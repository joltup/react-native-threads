import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import { Thread } from 'react-native-threads';

class ThreadExample extends Component {
  componentDidMount() {
    this.worker= new Thread('worker.js');

    this.worker.onmessage = (message) => {
      console.log("Got message from worker", message);
    }
  }

  render() {

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => {
          console.log('SENDING MESSAGE TO WORKER');
          this.worker.postMessage("Hello from main thread");
        }}>
          <Text style={styles.welcome}>
            Send message
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('ThreadExample', () => ThreadExample);

