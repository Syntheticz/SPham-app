import React, {useEffect, useState} from 'react';
import SmsAndroid from 'react-native-get-sms-android';
import type {PropsWithChildren} from 'react';
import {
  Image,
  PermissionsAndroid,
  Pressable,
  StatusBar,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import DisplayAllMessage from './components/message-container';
import DisplayAllSpam from './components/spam-container';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

type MessageType = {
  sender: string;
  message: string;
  date: string;
  category: '' | string;
  id: string;
};

function convertISODateToFormattedDate(isoDate: string): string {
  const months: string[] = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const date: Date = new Date(isoDate);
  const monthName: string = months[date.getMonth()];
  const day: number = date.getDate();
  const year: number = date.getFullYear();

  return `${monthName} ${day}, ${year}`;
}

/* List SMS messages matching the filter */
const filter = {
  box: 'inbox',

  indexFrom: 0,
  maxCount: 10, // count of SMS to return each time
};

const requestSMSPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_SMS,
      {
        title: 'Spam Detection App',
        message: 'To Check if messages is spam or ham ',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can now read SMS');
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#762E6F',
  },

  searchContainer: {
    alignSelf: 'center',
    marginTop: '20%',
    padding: 5,
    backgroundColor: '#D25AD4',
    borderRadius: 80,
    width: '90%',
    height: 50,
    flexDirection: 'row',
  },

  searchInput: {
    height: 40,
    borderRadius: 30,
    padding: 10,
    color: 'black',
    fontSize: 14,
    flex: 1,
  },

  tabContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
    width: '100%',
  },

  logobg: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function App(): React.JSX.Element {
  const [activeTab, setActiveTab] = useState('message'); // Default to message tab
  const [searchText, setSearchText] = useState('');
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [ham, setHam] = useState<MessageType[]>([]);
  const [spam, setSpam] = useState<MessageType[]>([]);

  const handleTabPress = (tab: any) => {
    setActiveTab(tab);
  };

  const getTabBackgroundColor = (tab: any) => {
    return activeTab === tab ? '#2C2C2C' : '#151515';
  };

  const getCategory = async (text: string): Promise<string> => {
    try {
      const res = await fetch('https://spham-api.onrender.com/api', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
        }),
      });
      const data = await res.json();
      return data.category;
    } catch (error) {
      console.error(error);
      return '';
    }
  };

  useEffect(() => {
    requestSMSPermission();
    SmsAndroid.list(
      JSON.stringify(filter),
      (fail: any) => {
        console.log('Failed with this error: ' + fail);
      },
      (count: any, smsList: any) => {
        const arr = JSON.parse(smsList);
        const records = arr.map((list: any) => ({
          category: '',
          sender: list.address,
          message: list.body,
          id: list._id,
          date: convertISODateToFormattedDate(
            new Date(list.date).toISOString(),
          ),
        }));
        setMessages(records);
      },
    );
  }, []);

  useEffect(() => {
    const momentOfTruth = async () => {
      const list = await Promise.all(
        messages.map(async item => {
          const category = await getCategory(item.message);
          const message = {...item, category: category};

          return message;
        }),
      );

      setHam(list.filter(message => message.category === 'ham'));
      setSpam(list.filter(message => message.category === 'spam'));
    };
    momentOfTruth();
  }, [messages]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'default'} />

      {/* Search bar */}
      <View style={styles.searchContainer}>
        <Image
          source={require('./assets/search-logo.png')}
          style={{width: 35, height: 35}}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchText}
          onChangeText={text => setSearchText(text)}
        />
      </View>

      {/* Display container based on the active tab */}
      {activeTab === 'message' ? (
        <DisplayAllMessage messages={ham} />
      ) : (
        <DisplayAllSpam messages={spam} />
      )}

      <View style={styles.tabContainer}>
        {/* All message tab */}
        <Pressable
          style={{
            width: '50%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: getTabBackgroundColor('message'),
          }}
          onPress={e => handleTabPress('message')}>
          <View style={styles.logobg}>
            <Image source={require('./assets/message-logo.png')} />
          </View>
        </Pressable>
        {/* All spam tab */}
        <Pressable
          style={{
            width: '50%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: getTabBackgroundColor('spam'),
          }}
          onPress={() => handleTabPress('spam')}>
          <View>
            <Image source={require('./assets/spam-logo.png')} />
          </View>
        </Pressable>
      </View>
    </View>
  );
}

export default App;
