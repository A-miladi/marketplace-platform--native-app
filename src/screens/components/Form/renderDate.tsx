import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Modal} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {useController} from 'react-hook-form';
import {PropsInput} from '@/types/Forms';
import {_styles} from '@/styles/_styles';
import {RH} from '@/utils/DimensionsChange';
import {colors} from '@/styles/colors';

const RenderDate = ({input}: PropsInput) => {
  const {
    field,
    fieldState: {error},
  } = useController({
    name: input.name,
    control: input.control,
    rules: {
      required: input.is_required ? `${input.label} is required` : false,
      ...input.rules,
    },
    defaultValue: input.defaultValue ?? null,
  });

  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(field.value || '');

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    field.onChange(date);
    setCalendarVisible(false);
  };

  const toggleCalendar = () => {
    setCalendarVisible(!isCalendarVisible);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={toggleCalendar}
        style={[styles.dateInput, error && styles.errorBorder]}>
        <Text
          style={[styles.dateText, !selectedDate && styles.placeholderText]}>
          {selectedDate || input.placeholder || 'Select date'}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={isCalendarVisible}
        transparent={true}
        animationType="slide">
        <View style={styles.calendarContainer}>
          <View style={styles.calendar}>
            <Calendar
              current={selectedDate || undefined}
              markedDates={{
                [selectedDate]: {selected: true, selectedColor: '#3b82f6'},
              }}
              onDayPress={(day: any) => handleDateSelect(day.dateString)}
              minDate={input.validation?.min_date}
              maxDate={input.validation?.max_date}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 48,
    width: '100%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.neutral[400],
    paddingHorizontal: 12,
    backgroundColor: 'white',
  },
  dateText: {
    fontSize: 14,
    color: colors.neutral[950],
  },
  placeholderText: {
    color: colors.neutral[500],
  },
  errorBorder: {
    borderColor: 'red',
    borderWidth: 1,
  },
  calendarContainer: {
    backgroundColor: 'rgba(1,1,1,0.4)',
    padding: 20,
    flex: 1,
    height: RH(100),
    ..._styles.centerElements,
  },
  calendar: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    width: '90%',
  },
});

export default RenderDate;
