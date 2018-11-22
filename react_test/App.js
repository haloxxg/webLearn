/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for devss',
});

export default class App extends Component {
	constructor(props) {
		super(props);
		this.handleText = this.handleText.bind(this);
    	this.state = {text: ''};
  	}
  	render() {
    	return (
		// 尝试把`flexDirection`改为`column`看看
			<View style={{flex: 1, flexDirection: 'column'}}>
				<View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
				<View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} />
				<View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} />
				<Text>{this.state.text}</Text>
				<TextInput onChangeText={this.handleText} />
			</View>
		);
  	}
  	handleText(text) {
		this.setState({text})
  	}
};

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
