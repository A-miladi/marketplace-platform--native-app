import {SearchBar} from '@/screens/home/searchBar/SearchBar';
import {PageTitle} from '@/screens/profile/components/PageTitle';
import {UserTitle} from '@/screens/profile/components/userTitle';
import {useState} from 'react';
import {View} from 'react-native';
import {Activity} from './Acticity';
import {AddComment} from './addComment';
import {AddCommentModal} from './addCommentModal';
import {CommentsStyle} from './style';

export const Comments = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <View style={CommentsStyle.container}>
      <SearchBar />
      <PageTitle title="Add comment" paddingTop={0} />
      <UserTitle hasBorder={true} comments="24 comments" />
      <Activity />
      <AddComment onClick={() => setShowModal(true)} />
      {showModal && <AddCommentModal onClose={() => setShowModal(false)} />}
    </View>
  );
};
