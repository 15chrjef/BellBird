import React from 'react';
import {
  StyleSheet,
  Text,
  View,
	Dimensions
} from 'react-native';
var {height, width} = Dimensions.get('window');

import { MonoText } from '../components/StyledText';

export default class Title extends React.Component {
  static route = {
    navigationBar: {
      visible: false,
    },
  }

  render() {
    return (
      <View style={styles.container}>
				<Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>Bellbird</Text>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
		height: 60,
    backgroundColor: '#2C68AD',
		width: width,
		alignItems: 'center',
		justifyContent: 'center',
  }
})
