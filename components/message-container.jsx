import {StyleSheet, View, Text, ScrollView} from 'react-native';

export default function DisplayAllMessage() {
  return (
    <View style={styles.container}>
      <Text style={styles.tabTitle}>Messages</Text>

      <ScrollView>
        <View>
          <Text style={styles.tabTitle}>test</Text>
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
  card_container: {
    backgroundColor: '#343434',
    width: '100%',
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
