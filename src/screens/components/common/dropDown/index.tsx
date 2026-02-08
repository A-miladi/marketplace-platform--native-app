import React, {useState, useEffect, FC} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  StyleProp,
  ViewStyle,
} from 'react-native';
import ArrowUp from '@/assets/Icons/ArrowUp.svg';
import ArrowDown from '@/assets/Icons/ArrowDown.svg';
import {RH, RW} from '@/utils/DimensionsChange';
import {colors} from '@/styles/colors';
import {FlashList} from '@shopify/flash-list';
import {CustomTextInput} from '../TextInput';
import {_styles} from '@/styles/_styles';
import SearchIcon from '@/assets/Icons/Search.svg';
import MultiSelect from '../multiSelect';

interface DropdownItem {
  label: string;
  value: string;
}

interface DropdownProps {
  options: DropdownItem[];
  onSelect: (value: string | string[]) => void;
  placeholder?: string;
  placeholderColor?: string;
  selectedValue?: string | string[];
  style?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  error?: boolean;
  defaultValue?: string;
  helperText?: string;
  isSearch?: boolean;
  height?: number;
  multiSelect?: boolean;
  optionStyle?: StyleProp<ViewStyle>;
  btnClassName?: string;
  refetch?: () => void;
  hasPlace?: boolean;
}

const Dropdown: FC<DropdownProps> = ({
  options,
  onSelect,
  placeholder = 'Select...',
  selectedValue,
  style,
  defaultValue,
  error,
  helperText,
  isSearch,
  height,
  multiSelect,
  buttonStyle,
  optionStyle,
  btnClassName,
  refetch,
  placeholderColor,
}) => {
  if (multiSelect) {
    return (
      <MultiSelect
        options={options}
        value={Array.isArray(selectedValue) ? selectedValue : []}
        onChange={newValue => onSelect(newValue)}
        placeholder={placeholder}
        style={style}
        optionStyle={optionStyle}
        isSearch={isSearch}
        error={error}
        helperText={helperText}
        btnStyle={btnClassName}
      />
    );
  }

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<DropdownItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedLabel =
    options.find(opt => opt.value === selectedValue)?.label || '';

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  useEffect(() => {
    if (selectedValue && !Array.isArray(selectedValue)) {
      const selectedOption = options.find(opt => opt.value === selectedValue);
      if (selectedOption) {
        setSelected(selectedOption);
      }
    } else if (!selectedValue && defaultValue) {
      const defaultOption = options.find(opt => opt.value === defaultValue);
      if (defaultOption) {
        setSelected(defaultOption);
      }
    } else {
      setSelected(null);
    }
  }, [selectedValue, options, defaultValue]);

  const handleSelect = (option: DropdownItem) => {
    setSelected(option);
    onSelect(option.value);
    setIsOpen(false);
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={[
          styles.dropdownHeader,
          buttonStyle,
          error && {borderColor: 'red'},
        ]}
        onPress={() => {
          setIsOpen(!isOpen), refetch;
        }}
        activeOpacity={0.7}>
        <Text
          style={[
            styles.selectedText,
            !selected && {color: placeholderColor ?? colors.neutral[500]},
          ]}>
          {selectedLabel || placeholder}
        </Text>
        {isOpen ? (
          <ArrowUp width={20} height={20} />
        ) : (
          <ArrowDown width={20} height={20} />
        )}
        {error && helperText && (
          <Text style={styles.helperText}>{helperText}</Text>
        )}
      </TouchableOpacity>

      {isOpen && (
        <View style={[styles.dropdownList, {height}]}>
          {isSearch && (
            <View
              style={{
                borderBottomColor: colors.neutral[300],
                width: '100%',
                height: RH(4),
                borderBottomWidth: 1,
                ..._styles.rowCenterSpace,
                paddingHorizontal: 6,
                paddingBottom: 3,
              }}>
              <TextInput
                style={{paddingHorizontal: 6}}
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
                placeholder="Search"
                placeholderTextColor={colors.neutral[400]}
              />
              <SearchIcon width={18} height={18} />
            </View>
          )}
          <FlashList
            data={filteredOptions}
            keyExtractor={item => item.value}
            estimatedItemSize={44}
            renderItem={({item}) => (
              <TouchableOpacity
                style={[
                  styles.option,
                  selected?.value === item.value && styles.selectedOption,
                ]}
                onPress={() => handleSelect(item)}>
                <Text>{item.label}</Text>
              </TouchableOpacity>
            )}
            nestedScrollEnabled={true}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: RW(90),
  },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: RH(5),
    borderWidth: 1,
    borderColor: colors.neutral[400],
    borderRadius: 8,
    backgroundColor: 'white',
  },
  selectedText: {
    fontSize: 14,
    color: colors.neutral[950],
  },
  dropdownList: {
    position: 'absolute',
    top: '105%',
    width: '100%',
    maxHeight: 200,
    borderWidth: 1,
    borderColor: colors.neutral[200],
    borderRadius: 8,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1000,
    overflow: 'hidden',
  },
  option: {
    padding: 12,
    height: 44,
    backgroundColor: 'white',
  },
  selectedOption: {
    backgroundColor: '#f5f5f5',
  },
  helperText: {
    position: 'absolute',
    bottom: '87%',
    color: 'red',
    backgroundColor: 'white',
    paddingHorizontal: 4,
    left: 10,
    fontSize: 12,
  },
});

export default Dropdown;
