import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat,Send } from 'react-native-gifted-chat'
import {socket} from '../Services/WebSocket'
import {View,Text,ActivityIndicator, StyleSheet} from 'react-native'
import { AntDesign,Ionicons } from '@expo/vector-icons';
 


function renderSend(props) {
  return (
    <Send {...props}>
      <View style={styles.sendingContainer}>
        <Ionicons name="send" size={30} color='dodgerblue' />
      </View>
    </Send>
  );
}

function renderLoading() {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size='large' color='dodgerblue' />
    </View>
  );
}

function scrollToBottomComponent() {
  return (
    <View style={styles.bottomComponentContainer}>
        <AntDesign name="downcircle" size={30} color="dodgerblue" />
    </View>
  );
}



export default function Example(props) {
  const [messages, setMessages] = useState([]);

    let chatsocket = socket(props.route.params.order.id)

  useEffect(() => {
        chatsocket.onmessage = function(e) {
          const data = JSON.parse(e.data);
          console.log("data is ",data)
          setMessages(previousMessages => GiftedChat.append(previousMessages, data))
          console.log(messages)
        };

    chatsocket.onclose = function(e) {
        console.error('Chat socket closed unexpectedly',e.message);
    };
  }, [])

 
  const onSend = useCallback((messages = []) => {
    //setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    messages[0].order_id = 5
    chatsocket.send(JSON.stringify(messages[0]))
  }, [])
 
  return (
    <GiftedChat
      showUserAvatar
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
      renderLoading={renderLoading}
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
        name : "Meeran"
      }}
    />
  )
}

const styles = StyleSheet.create({
  sendingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding : 5
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  video : {
    width : 200
  }
});