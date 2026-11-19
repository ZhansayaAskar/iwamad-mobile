import { Text, StyleSheet } from 'react-native';
import { useHolidays } from '../hooks/useHolidays';

type HolidayNoteProps = {
  date: string;
};

export function HolidayNote({ date }: HolidayNoteProps) {
  const year = Number(date.slice(0, 4));
  const { data, isPending, isError } = useHolidays(year);

  if (isPending) {
    return <Text style={styles.text}>Checking holidays</Text>;
  }

  if (isError) {
    return <Text style={styles.error}>Holidays unavailable</Text>;
  }

  const holiday = data?.find((h) => h.date === date);

  if (holiday) {
    return <Text style={styles.holiday}>Public holiday: {holiday.name}</Text>;
  }

  return <Text style={styles.text}>Not a public holiday</Text>;
}

const styles = StyleSheet.create({
  text: { fontSize: 14, color: '#666', marginTop: 10 },
  holiday: { fontSize: 14, color: '#e11d48', fontWeight: 'bold', marginTop: 10 },
  error: { fontSize: 14, color: 'red', marginTop: 10 },
});