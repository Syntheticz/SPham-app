import {StyleSheet, View, Text, ScrollView} from 'react-native';

export default function DisplayAllSpam() {
  return (
    <View style={styles.container}>
      <Text style={styles.tabTitle}>Spam</Text>
      <ScrollView></ScrollView>
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
