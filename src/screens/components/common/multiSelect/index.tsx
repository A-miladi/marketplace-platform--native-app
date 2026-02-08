import React, {useEffect, useRef, useState} from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {CheckBox} from '../checkBox';
import SearchIcon from '@/assets/Icons/Search.svg';
import {_styles} from '@/styles/_styles';
import {RH, RW} from '@/utils/DimensionsChange';
import {colors} from '@/styles/colors';
import ArrowUp from '@/assets/Icons/ArrowUp.svg';
import ArrowDown from '@/assets/Icons/ArrowDown.svg';

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  style?: any;
  optionStyle?: any;
  isSearch?: boolean;
  error?: boolean;
  helperText?: string;
  btnStyle?: any;
}

const MultiSelect = ({
  options,
  value = [],
  onChange,
  placeholder = 'Select...',
  style,
  optionStyle,
  isSearch,
  error,
  helperText,
  btnStyle,
}: MultiSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [tempSelected, setTempSelected] = useState<string[]>([]);
  const ref = useRef(null);

  // Initialize tempSelected when dropdown opens
  useEffect(() => {
    if (isOpen) {
      setTempSelected(value);
    }
  }, [isOpen, value]);

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleOptionPress = (optionValue: string) => {
    const isSelected = tempSelected.includes(optionValue);
    const newSelected = isSelected
      ? tempSelected.filter(v => v !== optionValue)
      : [...tempSelected, optionValue];
    setTempSelected(newSelected);
  };

  const handleConfirm = () => {
    onChange(tempSelected);
    setIsOpen(false);
    setSearchQuery('');
  };

  const handleCancel = () => {
    setTempSelected(value);
    setIsOpen(false);
    setSearchQuery('');
  };

  const selectedLabels = options
    .filter(opt => value.includes(opt.value))
    .map(opt => opt.label);

  const displayText =
    selectedLabels.length > 0
      ? selectedLabels.length > 2
        ? `${selectedLabels.slice(0, 2).join(', ')} +${
            selectedLabels.length - 2
          }`
        : selectedLabels.join(', ')
      : placeholder;

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        onPress={() => setIsOpen(!isOpen)}
        style={[
          styles.button,
          btnStyle,
          error && styles.errorBorder,
          !selectedLabels.length && styles.placeholderText,
        ]}
        activeOpacity={0.8}>
        <Text
          style={[styles.buttonText, placeholder && styles.placeholderText]}
          numberOfLines={1}>
          {displayText ?? placeholder}
        </Text>
        {!isOpen ? (
          <ArrowDown width={20} height={20} />
        ) : (
          <ArrowUp width={20} height={20} />
        )}
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.dropdown}>
          {isSearch && (
            <View style={styles.searchContainer}>
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                style={styles.searchInput}
                placeholder="Search"
              />
              <SearchIcon width={17} height={17} />
            </View>
          )}

          <ScrollView style={styles.optionsContainer}>
            {filteredOptions.map(option => (
              <CheckBox
                key={option.value}
                title={option.label}
                isChecked={tempSelected.includes(option.value)}
                onPress={() => handleOptionPress(option.value)}
              />
            ))}
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity onPress={handleCancel} style={styles.cancel}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Confirm} onPress={handleConfirm}>
              <Text style={styles.confirmText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {error && helperText && (
        <Text style={styles.errorText}>{helperText}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: RW(90),
    backgroundColor: 'white',
  },
  button: {
    ..._styles.rowCenterSpace,
    height: 48,
    width: '100%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.neutral[400],
    paddingHorizontal: 12,
  },
  buttonText: {
    color: colors.neutral[900],
  },
  placeholderText: {
    color: colors.neutral[500],
  },
  errorBorder: {
    borderColor: '#ef4444',
    borderWidth: 2,
  },
  arrowIcon: {
    marginLeft: 8,
  },
  arrowIconRotated: {
    transform: [{rotate: '180deg'}],
  },
  dropdown: {
    maxHeight: 250,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.neutral[100],
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
    position: 'absolute',
    top: '105%',
    zIndex: 10,
  },
  searchContainer: {
    width: '100%',
    paddingHorizontal: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    position: 'relative',
    ..._styles.rowCenterSpace,
  },
  searchInput: {
    height: 40,
    paddingLeft: 6,
  },
  optionsContainer: {
    maxHeight: '70%',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  optionText: {
    fontSize: 14,
    color: '#262626',
  },
  selectedOption: {
    backgroundColor: '#f5f5f5',
  },
  selectedOptionText: {
    color: '#1d4ed8',
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#d4d4d4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#1d4ed8',
    borderColor: '#1d4ed8',
  },
  footer: {
    width: '100%',
    padding: 12,
    ..._styles.rowCenterSpace,
  },
  Confirm: {
    width: '49%',
    backgroundColor: colors.primary[800],
    height: RH(3.5),
    borderRadius: 8,
    ..._styles.centerElements,
  },
  cancel: {
    width: '49%',
    borderColor: colors.primary[800],
    borderWidth: 1,
    height: RH(3.5),
    borderRadius: 8,
    ..._styles.centerElements,
  },
  cancelText: {
    color: colors.primary[800],
  },
  confirmText: {
    color: 'white',
  },
  errorText: {
    marginTop: 4,
    fontSize: 12,
    color: '#ef4444',
  },
});

export default MultiSelect;
