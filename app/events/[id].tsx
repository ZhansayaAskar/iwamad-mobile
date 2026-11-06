import { useLocalSearchParams, Link, Stack } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { events } from '../../src/data/events';

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const event = events.find((e) => e.id === Number(id));

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
  container: { flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center' , backgroundColor: '#fce7f3',},
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  details: { fontSize: 16, color: '#666', marginBottom: 20 },
  seats: { fontSize: 16, fontWeight: 'bold', marginBottom: 20 },
  link: { color: 'pink', marginTop: 20, fontSize: 16 },
});