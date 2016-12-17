import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import Title from '../components/Title.js'
var {height, width} = Dimensions.get('window')
export default class HomeScreen extends React.Component {
  constructor(){
    super()
    this.state = {
      dataArray: ''
    }
  }
  componentWillMount(){
    var self = this;
    function getAlarms(){
     fetch('https://hs-bellbird.herokuapp.com/alarms/')
     .then(function(response) {
       return JSON.parse(response._bodyInit)
     })
     .then(function(response) {
        //  console.log('response1response1response1',  Date.parse(response[0].created_at) > Date.parse(response[1].created_at))
        // var newResponse = response.sort(function(a,b) {
        //   return Date.parse(a.created_at) > Date.parse(a.created_at)
        // })
        // console.log(response, newResponse)
        self.setState({
          dataArray: response.reverse()
        })
      })
     .catch(function(err) {
       console.error(err)
     })
    }
    getAlarms()
    setInterval(getAlarms, 2000)
  }
  updateVotes(row) {
    console.log(row.id)
     fetch(`https://hs-bellbird.herokuapp.com/alarms/${row.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        alarm:{
          body: row.body,
          votes: Number(row.votes) + 1,
          alarm_id: row.id,
          id: row.id,
        }
      })  
    })
    .then(function(response) {
      console.log('updateVotesupdateVotesupdateVotesupdateVotes', response)
    })
    .catch(function(err) {
      console.error('errorVotexerrorVotexerrorVotexerrorVotex', err)
    })
  }
  render() {
    var self = this;
    if(this.state.dataArray === '') {
      return (
        <View style={styles.container}>
          <Title/>
          <Text>Loading...</Text>
        </View>
      );
    } else {
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      return (
        <View style={styles.container}>
          <Title/>
          <Text style={{color: 'black', fontWeight: 'bold', fontSize: 16}}>Your Alarms</Text>
            <View style={{marginTop: 20}}>
              <ListView
                contentContainerStyle={styles.List}
                dataSource={ds.cloneWithRows(this.state.dataArray)}
                renderRow={(rowData) => (
                  <View style={styles.listRow}> 
                    <View style={styles.align}><Text>{rowData.body.toUpperCase()}</Text></View>
                    <View style={styles.align}><Text>{rowData.votes}</Text></View>
                    <View>
                      <TouchableOpacity 
                      onPress={function(){
                        self.updateVotes(rowData) 
                        rowData.votes += 1
                      }} 
                        style={{backgroundColor:'#2C68AD',borderRadius: 5, justifyContent:'center', width: 80, height: 30, alignItems: 'center'}}>
                        <Text style={{color: 'white', fontWeight: 'bold'}}>
                          UpVote!
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                />
            </View>
        </View>
      );
    }
  }
}

let styles = StyleSheet.create({
  align: {
    width: width * .3,
    alignItems: 'center'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  listRow: {
    borderWidth: 1,
    height: 40,
    alignItems: 'center',
    borderColor: '#2C68AD',
    marginTop: 15,
    justifyContent: 'space-around',
    width: width * .9 ,
    flexDirection: 'row'
  },
  List: {
    marginBottom: 1000,
  },
})
