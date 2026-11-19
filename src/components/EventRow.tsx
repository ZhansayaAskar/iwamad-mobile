import { StyleSheet, Text, Pressable } from 'react-native';
import type { CampusEvent } from '../data/events';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Animated, { FadeIn, FadeOut, LinearTransition, ZoomIn } from 'react-native-reanimated';type EventRowProps = {
  event: CampusEvent;
  onPress: () => void;
  onToggleSaved: () => void;
  isSaved: boolean;
};

export function EventRow({ event, onPress, onToggleSaved, isSaved }: EventRowProps) {
  return (
    <Animated.View entering={FadeIn} exiting={FadeOut} layout={LinearTransition}>
      <Swipeable
        friction={2}
        rightThreshold={60}
        renderRightActions={(_progress, _translation, swipeable) => (
          <Pressable
            onPress={() => {
              onToggleSaved();
              swipeable.close();
            }}
            style={styles.action}
          >
            <Text style={styles.actionText}>{isSaved ? 'Unsave' : 'Save'}</Text>
          </Pressable>
        )}
      >
        <Pressable
          onPress={onPress}
          onLongPress={onToggleSaved}
          style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
        >
          <Text style={styles.title}>{event.title}</Text>
          <Text style={styles.details}>{event.date} · {event.place}</Text>
          {isSaved && (
            <Animated.Text entering={ZoomIn} style={styles.savedText}>
              ★ Saved
            </Animated.Text>
          )}
        </Pressable>
      </Swipeable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: { 
    backgroundColor: '#fff', 
    padding: 16, 
    marginBottom: 12, 
    borderRadius: 12, 
    minHeight: 44, 
    justifyContent: 'center' 
  },
  cardPressed: { 
    backgroundColor: '#fce7f3' 
  },
  title: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#333' 
  },
  details: { 
    fontSize: 14, 
    color: '#666', 
    marginTop: 4 
  },
  savedText: { 
    color: '#f59e0b', 
    fontWeight: 'bold', 
    marginTop: 8, 
    fontSize: 16 
  },
  action: { 
    backgroundColor: '#f59e0b', 
    justifyContent: 'center', 
    alignItems: 'center', 
    width: 100, 
    marginBottom: 12, 
    borderTopRightRadius: 12, 
    borderBottomRightRadius: 12, 
    minHeight: 44 
  },
  actionText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 16 
  }
});