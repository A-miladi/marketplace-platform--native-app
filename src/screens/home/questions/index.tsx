import {Text, View} from 'react-native';
import {QuestionStyle} from './Questions';
import {Collapse} from '@/screens/components/common/collapse';
import {Title} from '@/screens/components/common/title';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {CollapseStyle} from '@/screens/components/common/collapse/collapseStyle';

export const Questions = () => {
  const [isOpen, setIsOpen] = useState<number | null>(null);
  const handleToggle = (index: number) => {
    setIsOpen(prevIndex => (prevIndex === index ? null : index));
  };
  const {t} = useTranslation('FAQ');
  return (
    <View style={QuestionStyle.container}>
      <Title left={1} text={t('Title')} backgroundColor="#fff" />
      {[0, 1, 2, 3].map(index => (
        <Collapse
          hasBorder
          key={index}
          isOpen={isOpen === index}
          toggleCollapse={() => handleToggle(index)}
          title="Lorem Ipsum is simply dumy text of the ?">
          <Text style={CollapseStyle.answer}>
            Lorem Ipsum is simply dumy text of the printing and typesetting
            industry.Lorem Ipsum has been the indus standard dummy text ever
            since the 1500s , when an
          </Text>
        </Collapse>
      ))}
    </View>
  );
};
