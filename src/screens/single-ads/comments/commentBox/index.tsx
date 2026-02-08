import {Text, View} from 'react-native';
import {CommentBoxStyle} from './style';
import ProfileIcon from '@/assets/Icons/ProfileComment.svg';
import {_styles} from '@/styles/_styles';
import {FC} from 'react';
import {IUserFeed} from '@/types/user';
import {Rating} from '@/screens/components/common/rating';

export const CommentBox: FC<{data?: IUserFeed}> = ({data}) => {
  return (
    <View style={CommentBoxStyle.continue}>
      <View style={{..._styles.rowCenterSpace}}>
        <View style={{..._styles.rowCenter, gap: 6}}>
          <ProfileIcon />
          <Text style={CommentBoxStyle.title}>User Name</Text>
        </View>
        {data?.rating && <Rating rating={data?.rating} />}
      </View>
      <Text style={CommentBoxStyle.date}>03/08/2024</Text>
      <Text style={CommentBoxStyle.message}>
        Lorem Ipsum is simply dumy text of the printing and typesetting
        industry.Lorem Ipsum has been the indus standard dummy text ever since
        the 1500s , when an unknown printer took a galley of type and scrambled
        typesetting industry.
      </Text>
    </View>
  );
};
