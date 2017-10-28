import React, { Component } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Thread } from 'react-native-threads';

export default class App extends Component<{}> {
  state = { messages: [] }

  workerThread = null;

  componentDidMount() {
    this.workerThread = new Thread('./worker.thread.js');
    this.workerThread.onmessage = this.handleMessage;
  }

  componentWillUnmount() {
    this.workerThread.terminate();
    this.workerThread = null;
  }

  handleMessage = message => {
    console.tron.log(`APP: got message ${message}`);

    this.setState(state => {
      return { messages: [...state.messages, message] };
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native Threads!
        </Text>

        <Button title="Send Message To Worker Thread" onPress={() => {
          this.workerThread.postMessage('Hello')
        }} />

        <View>
          <Text>Messages:</Text>
          {this.state.messages.map((message, i) => <Text key={i}>{message}</Text>)}
        </View>
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
  }
});
