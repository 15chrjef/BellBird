import React from 'react';
import {
  View,
  StyleSheet,
  Text
} from 'react-native';
import Title from '../components/Title.js'

export default class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Title/>
        <Text>Hello SettingsScreen</Text>
      </View>
    );
  }
}
 

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
})
