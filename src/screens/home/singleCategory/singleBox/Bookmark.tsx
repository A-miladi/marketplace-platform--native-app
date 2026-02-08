import BookmarkIcon from '@/assets/Icons/bookmark.svg';
import IsBookMark from '@/assets/Icons/setBookMark.svg';
import {API_URL} from '@/constants/api';
import {useDelete, usePost} from '@/hooks';
import {Modal} from '@/screens/components/modal';
import {ResponseType} from '@/types';
import {BookMarkRequest} from '@/types/advertisement';
import {snackBar} from '@/utils/snackBar';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity} from 'react-native';

interface IBookMark {
  id: number;
  is_bookmarked: boolean;
}
export const BookMark = ({id, is_bookmarked}: IBookMark) => {
  const [openModal, setOpenModal] = useState(false);

  const openRemoveBookMarkModal = () => {
    setOpenModal(true);
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };
  return (
    <>
      {is_bookmarked ? (
        <TouchableOpacity
          style={{paddingRight: 6, paddingBottom: 4, paddingLeft: 2}}
          onPress={openRemoveBookMarkModal}>
          <IsBookMark width={17} height={17} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{paddingRight: 6, paddingBottom: 4, paddingLeft: 2}}>
          <BookmarkIcon width={17} height={17} />
        </TouchableOpacity>
      )}
      {openModal && <RemoveBookmark onClose={onCloseModal} id={id} />}
    </>
  );
};

interface RemoveBookMarkProps {
  id: number;
  onClose: () => void;
}
const RemoveBookmark = ({id, onClose}: RemoveBookMarkProps) => {
  const {t} = useTranslation('UserProfile');

  // const {loading: deleteLoading, execute: deleteExecute} = useDelete<
  //   ResponseType<object>,
  //   null
  // >(`${API_URL.User.Bookmark}/${id}`, {
  //   onSuccess: res => {
  //     onClose();
  //     snackBar(res.message, 'success');
  //     refetch();
  //   },
  //   onError: error => {
  //     snackBar(error, 'danger');
  //   },
  // });

  // const onRemoveBookMark = () => {
  //   deleteExecute();
  // };
  return (
    <Modal
      closer={onClose}
      title={t('FavoriteAdvertisement.RemoveModalTitle')}
      description={t('FavoriteAdvertisement.ModalDescription')}
      AcceptTitle={t('FavoriteAdvertisement.ModalCancelButton')}
      CancelTitle={t('FavoriteAdvertisement.ModalRemoveButton')}
      AcceptAction={onClose}
      // CancelAction={onRemoveBookMark}
      // CancelLoading={deleteLoading}
    />
  );
};
