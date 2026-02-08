import CalendarIcon from '@/assets/Icons/calender.svg';
import {colors} from '@/styles/colors';
import {UpdateProfileRequest} from '@/types/user';
import {RW} from '@/utils/DimensionsChange';
import React, {useState} from 'react';
import {UseFormSetValue, UseFormWatch} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Calendar} from 'react-native-calendars';

interface BirthDateProps {
  watch: UseFormWatch<UpdateProfileRequest>;
  setValue: UseFormSetValue<UpdateProfileRequest>;
  error?: boolean;
  helperText?: string;
}

export const UserBirthDate = ({
  setValue,
  watch,
  error,
  helperText,
}: BirthDateProps) => {
  const {t} = useTranslation('UserProfile');
  const [showCalendar, setShowCalendar] = useState(false);
  const currentDate = watch('birth_date');
  const [selectedDate, setSelectedDate] = useState(currentDate || '');

  const handleDayPress = (day: {dateString: string}) => {
    setSelectedDate(day.dateString);
    setValue('birth_date', day.dateString, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setShowCalendar(false);
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const formatDisplayDate = (dateString: string): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.inputContainer, error && styles.errorBorder]}
          onPress={toggleCalendar}>
          <Text
            style={[styles.inputText, !selectedDate && styles.placeholderText]}>
            {selectedDate
              ? formatDisplayDate(selectedDate)
              : t('MyProfile.BirthDate.Placeholder')}
          </Text>
          <CalendarIcon />
        </TouchableOpacity>

        {helperText && (
          <Text style={[styles.helperText, error && styles.errorText]}>
            {helperText}
          </Text>
        )}
      </View>
      <Modal visible={showCalendar} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.calendarContainer}>
            <Calendar
              current={selectedDate}
              minDate={'1900-01-01'}
              maxDate={new Date().toISOString().split('T')[0]}
              onDayPress={handleDayPress}
              markedDates={{
                [selectedDate]: {selected: true, selectedColor: '#3B82F6'},
              }}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowCalendar(false)}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: RW(90),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.neutral[400],
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  inputText: {
    fontSize: 14,
    color: '#1F2937',
  },
  placeholderText: {
    color: '#6D6D6D',
  },
  errorBorder: {
    borderColor: '#EF4444',
    borderWidth: 2,
  },
  helperText: {
    marginTop: 4,
    fontSize: 12,
    color: '#6B7280',
  },
  errorText: {
    color: '#EF4444',
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
