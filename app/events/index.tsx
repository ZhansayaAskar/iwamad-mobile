import { useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, ActivityIndicator, Pressable, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useEvents } from '../../src/hooks/useEvents';
import { EventRow } from '../../src/components/EventRow';

export default function EventsScreen() {
  const router = useRouter();
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [searchText, setSearchText] = useState('');

  const { data, isPending, isError, error, refetch, isRefetching } = useEvents();

  const handleLongPress = (id: number) => {
    if (savedIds.includes(id)) {
      setSavedIds(savedIds.filter((savedId) => savedId !== id));
    } else {
      setSavedIds([...savedIds, id]);
    }
  };

  // Строго "Loading events"
  if (isPending) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#333" />
        <Text style={styles.statusText}>Loading events</Text>
      </View>
    );
  }

  // Строго "Could not load events" и "Try again"
  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Could not load events</Text>
        <Text style={styles.errorSub}>{error.message}</Text>
        <Pressable style={styles.retryButton} onPress={() => refetch()}>
          <Text style={styles.retryText}>Try again</Text>
        </Pressable>
      </View>
    );
  }

  const filteredEvents = (data || []).filter((e) =>
    e.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.hint}>
        Long-press an event to save it. Saved: {savedIds.length}
      </Text>

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
        refreshing={isRefetching}
        onRefresh={() => refetch()}
        ListEmptyComponent={<Text style={styles.emptyText}>No events match</Text>}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    paddingHorizontal: 16, 
    paddingTop: Platform.OS === 'ios' ? 120 : 20, 
    backgroundColor: '#FFCBDB',
  },
  center: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#FFCBDB',
    padding: 20
  },
  hint: { 
    fontSize: 14, 
    color: '#333', 
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  searchInput: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    minHeight: 50,
  },
  emptyText: { 
    textAlign: 'center', 
    marginTop: 20, 
    color: '#333',
    fontWeight: 'bold' 
  },
  statusText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  },
  errorText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#dc2626',
    marginBottom: 5,
  },
  errorSub: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#333',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    minHeight: 44,
    justifyContent: 'center',
  },
  retryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }
});