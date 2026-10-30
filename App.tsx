import { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';

export default function App() {
  const [likes, setLikes] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.helloText}>Hello, World!</Text>
      <Text style={styles.nameText}>Zhansaya Askar</Text>
      
      <Text style={styles.likesText}>Likes: {likes}</Text>
      
      <Pressable 
        style={styles.button} 
        onPress={() => setLikes(likes + 1)}
      >
        <Text style={styles.buttonText}>Like</Text>
      </Pressable>
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
    marginBottom: 30,
  },
  likesText: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    minHeight: 44,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFCBDB',
    fontSize: 18,
    fontWeight: 'bold',
  },
});