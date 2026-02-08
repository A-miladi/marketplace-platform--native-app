import {IUserFeed} from '@/types/user';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {ActivityStyle} from './style';
import {CommentBox} from '../commentBox';
import {SingleCategory} from '@/screens/home/singleCategory/SingleCategory';
import {RH} from '@/utils/DimensionsChange';
type SellerTab = 'USER_COMMENTS' | 'USER_ADVERTISEMENT';

interface IActivityProps {
  userId?: number | string;
  comments?: IUserFeed[];
  onChangePage?: () => void;
  loadingComments?: boolean;
  page?: number;
  lastPage?: number;
}
export function Activity({
  userId,
  comments,
  onChangePage,
  loadingComments,
  page,
  lastPage,
}: IActivityProps) {
  const {t} = useTranslation('SellerProfile');
  const [activeTab, setActiveTab] = useState<SellerTab>('USER_COMMENTS');
  return (
    <>
      <View style={ActivityStyle.container}>
        <TouchableOpacity
          onPress={() => setActiveTab('USER_COMMENTS')}
          style={[
            ActivityStyle.tab,
            activeTab === 'USER_COMMENTS' && ActivityStyle.activeTab,
          ]}>
          <Text
            style={[
              ActivityStyle.text,
              activeTab === 'USER_COMMENTS' && ActivityStyle.activeText,
            ]}>
            {' '}
            {t('UserComments')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab('USER_ADVERTISEMENT')}
          style={[
            ActivityStyle.tab,
            activeTab === 'USER_ADVERTISEMENT' && ActivityStyle.activeTab,
          ]}>
          <Text
            style={[
              ActivityStyle.text,
              activeTab === 'USER_ADVERTISEMENT' && ActivityStyle.activeText,
            ]}>
            {' '}
            {t('UserAdvertisement')}
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {activeTab === 'USER_COMMENTS' ? (
          <CommentBox />
        ) : (
          <SingleCategory
            backgroundColor="white"
            color="white"
            hasTitle={false}
            paddingHorizontal={20}
            paddingBottom={RH(14)}
          />
        )}
      </ScrollView>
    </>
  );
}
