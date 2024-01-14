import {StyleSheet, View, Text, ScrollView} from 'react-native';
import Message_card from './message_card';

type MessageType = {
  sender: string;
  message: string;
  date: string;
  category: '' | string;
  id: string;
};

export default function DisplayAllSpam({messages}: {messages: MessageType[]}) {
  return (
    <View style={styles.container}>
      <Text className="mb-4" style={styles.tabTitle}>
        Spam
      </Text>
      <ScrollView>
        <View className="h-full w-full px-4 pl-8 flex flex-col items-center gap-4">
          {messages.length === 0
            ? null
            : messages.map(message => (
                <Message_card
                  key={message.id}
                  message={message.message}
                  title={message.sender}
                />
              ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    width: '100%',
    marginTop: '10%',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },

  tabTitle: {
    color: '#9A48EC',
    fontSize: 16,
    backgroundColor: '#343434',
    width: 120,
    height: 30,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: 30,
    marginLeft: 20,
    borderRadius: 20,
  },
});
