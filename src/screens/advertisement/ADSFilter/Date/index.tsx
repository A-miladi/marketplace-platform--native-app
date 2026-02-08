import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Modal} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {IFilters} from '@/types/general';
import {UseFormSetValue, UseFormWatch} from 'react-hook-form';
import {RH} from '@/utils/DimensionsChange';

interface DateFilterProps {
  watch: UseFormWatch<IFilters>;
  setValue: UseFormSetValue<IFilters>;
}

const DateFilter = ({setValue, watch}: DateFilterProps) => {
  const [showFromCalendar, setShowFromCalendar] = React.useState(false);
  const [showToCalendar, setShowToCalendar] = React.useState(false);
  const dateFrom = watch('date_from');
  const dateTo = watch('date_to');

  const formatDateString = (date: Date | undefined) => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dateInput}
        onPress={() => setShowFromCalendar(true)}>
        <Text>{dateFrom ? dateFrom.toDateString() : 'From Date'}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.dateInput}
        onPress={() => setShowToCalendar(true)}>
        <Text>{dateTo ? dateTo.toDateString() : 'To Date'}</Text>
      </TouchableOpacity>

      {/* From Date Calendar Modal */}
      <Modal
        visible={showFromCalendar}
        transparent={true}
        animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.calendarContainer}>
            <Calendar
              current={formatDateString(dateFrom || new Date())}
              markedDates={{
                [formatDateString(dateFrom || new Date())]: {selected: true},
              }}
              onDayPress={(day: any) => {
                setValue('date_from', new Date(day.dateString));
                setShowFromCalendar(false);
              }}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowFromCalendar(false)}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* To Date Calendar Modal */}
      <Modal visible={showToCalendar} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.calendarContainer}>
            <Calendar
              current={formatDateString(dateTo || new Date())}
              markedDates={{
                [formatDateString(dateTo || new Date())]: {selected: true},
              }}
              minDate={formatDateString(dateFrom || new Date())}
              onDayPress={(day: any) => {
                setValue('date_to', new Date(day.dateString));
                setShowToCalendar(false);
              }}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowToCalendar(false)}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  dateInput: {
    height: RH(4),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    width: '48%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  calendarContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    width: '90%',
  },
  closeButton: {
    padding: 10,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
});

export default DateFilter;
