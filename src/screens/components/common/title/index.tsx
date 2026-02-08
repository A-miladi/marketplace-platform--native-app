import {Text, View} from 'react-native';
import {FC} from 'react';
import {TitleStyle} from './titleStyle';

interface ITitleProps {
  text: string;
  backgroundColor?: string;
  secondText?: string;
  left: number;
}

export const Title: FC<ITitleProps> = ({
  text,
  backgroundColor,
  secondText,
  left,
}) => {
  const textContainerStyle = [
    TitleStyle.textContainer,
    {backgroundColor},
    left === 0 && {left: 0, paddingLeft: 0},
  ];

  return (
    <View style={[TitleStyle.container]}>
      <View style={TitleStyle.Line} />
      <View style={textContainerStyle}>
        <Text style={TitleStyle.text}> {text}</Text>
        <Text style={TitleStyle.secondText}> {secondText}</Text>
      </View>
    </View>
  );
};
