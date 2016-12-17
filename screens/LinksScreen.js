import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';
import Title from '../components/Title.js'


export default class LinksScreen extends React.Component {
  constructor(){
    super()
    this.state = {
      text: '',
      sent: ''
    }
    this.postResponse = this.postResponse.bind(this)
    this.handlePost = this.handlePost.bind(this)
  }
  handlePost(){
    if(this.state.text === '') { 
      this.setState({
        sent: false
      })
      console.log(this.state)
      return;
    }
    var self = this;
    var text = this.state.text
    this.setState({
      text: ''
    })
    fetch("https://hs-bellbird.herokuapp.com/alarms/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        alarm:{
          body: this.state.text,
          votes: 0,
        }
      })  
    })
    .then(function(response) {
      console.log('were goooooooodgooooooood', response)
      self.setState({
        sent: true
      })
      return JSON.parse(response._bodyInit)
    })
    .then(function(body) {
      console.log('we have the json id', body.id)
      fetch('https://hs-bellbird.herokuapp.com/push/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          alarm: {
            alarm_id: body.id
          }
        })  
      })
      .then(function(idResponse){
        console.log('PUSH COMPLETE', idResponse)
      })
    })
    .catch(function(err){
      console.error('were badbadbadbadbadbadbad', err)
    })
  }
  postResponse(){
    console.log('postResponse',this.state.sent)
    if(this.state.sent) {
      return(
        <Text style={{color: 'blue', fontSize: 16}}>Alarm Sent!</Text>
      )
    } else if(this.state.sent === false) {
      return(
        <Text style={{color: 'red', fontSize: 16}}>Alarm Failed to Send!</Text>
      )
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Title/>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => this.setState({text})}
            placeholder='Write an Alarm!'
            value={this.state.text}
          />
          <TouchableOpacity onPress={this.handlePost} style={{marginTop: 20, alignSelf: 'center', borderWidth: 1, width: 125}}>
            <Text>Submit Your Alarm</Text>
          </TouchableOpacity>
          {this.postResponse()}
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
