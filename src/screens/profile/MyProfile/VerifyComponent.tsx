import {Text, TouchableOpacity, View} from 'react-native';
import {MyProfileStyle} from './style';
import {colors} from '@/styles/colors';
import {FC} from 'react';

interface IVerifyProps {
  title: string;
  onClick: () => void;
}
export const Verify: FC<IVerifyProps> = ({title, onClick}) => {
  return (
    <View style={MyProfileStyle.verify}>
      <Text style={[MyProfileStyle.verifyText, {color: colors.neutral[500]}]}>
        {title}
      </Text>
      <TouchableOpacity onPress={onClick}>
        <Text style={[MyProfileStyle.verifyText, {color: colors.primary[800]}]}>
          Verify now
        </Text>
      </TouchableOpacity>
    </View>
  );
};
