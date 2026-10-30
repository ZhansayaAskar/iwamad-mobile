import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.helloText}>Hello, World!</Text>
      <Text style={styles.nameText}>Zhansaya Askar</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFCBDB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  helloText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  nameText: {
    fontSize: 24,
    marginTop: 10,
    color: '#fff',
  },
});