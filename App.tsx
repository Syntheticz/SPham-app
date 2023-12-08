/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  GestureResponderEvent,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import DisplayAllMessage from './components/message-container';
import DisplayAllSpam from './components/spam-container';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

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

  const handleTabPress = (tab: any) => {
    setActiveTab(tab);
  };

  const getTabBackgroundColor = (tab: any) => {
    return activeTab === tab ? '#2C2C2C' : '#151515';
  };

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
      {activeTab === 'message' ? <DisplayAllMessage /> : <DisplayAllSpam />}

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
