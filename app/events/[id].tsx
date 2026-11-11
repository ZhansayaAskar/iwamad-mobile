import { useLocalSearchParams, Link, Stack } from 'expo-router';
import { View, Text, StyleSheet, ActivityIndicator, Pressable } from 'react-native';
import { useEvents } from '../../src/hooks/useEvents';

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isPending, isError, error, refetch } = useEvents();

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

  const event = data?.find((e) => e.id === Number(id));

  // Строго "Event not found" и "No event with id {id}."
  if (!event) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: 'Not Found' }} />
        <Text style={styles.title}>Event not found</Text>
        <Text>No event with id {id}.</Text>
        <Link href="/events" style={styles.link}>Go back to events</Link>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: event.title }} />
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.details}>{event.date} · {event.place}</Text>
      <Text style={styles.seats}>Seats: {event.seats}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFCBDB' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFCBDB', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  details: { fontSize: 16, color: '#666', marginBottom: 20 },
  seats: { fontSize: 16, fontWeight: 'bold', marginBottom: 20 },
  link: { color: 'blue', marginTop: 20, fontSize: 16 },
  statusText: { marginTop: 10, fontSize: 16, fontWeight: 'bold', color: '#333' },
  errorText: { fontSize: 20, fontWeight: 'bold', color: '#dc2626', marginBottom: 5 },
  errorSub: { fontSize: 16, color: '#333', marginBottom: 20 },
  retryButton: { backgroundColor: '#333', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 10, minHeight: 44, justifyContent: 'center' },
  retryText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});