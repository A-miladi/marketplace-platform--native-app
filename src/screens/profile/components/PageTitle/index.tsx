import BackIcon from '@/assets/Icons/Back.svg';
import {goBack} from '@/navigation/navigationServices';
import {FC} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {PageTitleStyle} from './style';
interface IPageTitleProps {
  title: string;
  paddingTop?: number;
}
export const PageTitle: FC<IPageTitleProps> = ({title, paddingTop = 15}) => {
  return (
    <TouchableOpacity
      onPress={() => goBack()}
      style={[PageTitleStyle.title, {paddingTop}]}>
      <BackIcon />
      <Text style={PageTitleStyle.titleText}>{title}</Text>
    </TouchableOpacity>
  );
};
