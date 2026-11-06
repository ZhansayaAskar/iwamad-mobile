import { useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { events } from '../../src/data/events';
import { EventRow } from '../../src/components/EventRow';

export default function EventsScreen() {
  const router = useRouter();
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [searchText, setSearchText] = useState('');

  const filteredEvents = events.filter((e) =>
    e.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleLongPress = (id: number) => {
    if (savedIds.includes(id)) {
      setSavedIds(savedIds.filter((savedId) => savedId !== id));
    } else {
      setSavedIds([...savedIds, id]);
    }
  };

  return (
    <View style={styles.container}>

      <TextInput
        style={styles.searchInput}
        placeholder="Search events"
        placeholderTextColor="#999"
        value={searchText}
        onChangeText={setSearchText}
      />
      <FlatList
        data={filteredEvents}
        keyExtractor={(e) => String(e.id)}
        renderItem={({ item }) => (
          <EventRow
            event={item}
            isSaved={savedIds.includes(item.id)}
            onPress={() => router.push(`/events/${item.id}`)}
            onLongPress={() => handleLongPress(item.id)}
          />
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No events match</Text>}
        showsVerticalScrollIndicator={false}
      />
            <Text style={styles.hint}>
        Saved: {savedIds.length}{"\n"}
        <Text style={{ fontSize: 12, color: '#666' }}>
          Long-press an event to save it
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    paddingTop: 115, 
    backgroundColor: '#FFCBDB',
  },
  hint: { 
    fontSize: 14, 
    color: '#333', 
    marginBottom: 15,
    marginTop: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  searchInput: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  emptyText: { 
    textAlign: 'center', 
    marginTop: 20, 
    color: '#333',
    fontWeight: 'bold' 
  },
});