import {Text, TouchableOpacity, View} from 'react-native';
import {UserTypeStyle} from './style';
import {useTranslation} from 'react-i18next';
import {Role} from '@/types/user';
import {useState} from 'react';
import {colors} from '@/styles/colors';
import {RW} from '@/utils/DimensionsChange';
interface UserTypeProps {
  onSelect: (type: Role) => void;
  width?: number;
}
export function UserType({onSelect, width = RW(90)}: UserTypeProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);
  const {t} = useTranslation('signup');
  const mockUserType: {type: Role}[] = [
    {type: 'USER' as Role},
    {type: 'COMPANY' as Role},
  ];
  const handleSelect = (idx: number, type: Role) => {
    setSelectedIndex(idx);
    onSelect(type);
  };
  return (
    <View style={[UserTypeStyle.container, {width}]}>
      <Text>{t('userType')}</Text>
      <View style={UserTypeStyle.buttons}>
        {mockUserType.map((i, idx) => (
          <TouchableOpacity
            onPress={() => handleSelect(idx, i.type)}
            key={idx}
            style={[
              UserTypeStyle.button,
              selectedIndex === idx && UserTypeStyle.selectedButton,
            ]}>
            <Text style={selectedIndex === idx && {color: colors.primary[800]}}>
              {i.type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
