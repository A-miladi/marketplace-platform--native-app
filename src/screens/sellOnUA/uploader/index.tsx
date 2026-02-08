import Gallery from '@/assets/Icons/gallery.svg';
import {selectMultipleImages} from '@/utils/FileUploader';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  Platform,
  Alert,
} from 'react-native';
import {UploaderStyle} from './style';
import RemoveImage from '@/assets/Icons/Close.svg';
import {snackBar} from '@/utils/snackBar';

interface IPhotoUploaderProps {
  onImagesChange: (files: File[]) => void;
  imagePreviews: string[];
  setImagePreviews: (previews: string[]) => void;
}

export const PhotoUploader = ({
  onImagesChange,
  imagePreviews,
  setImagePreviews,
}: IPhotoUploaderProps) => {
  const {t} = useTranslation('SellOnUniq');
  const MAX_IMAGES = 7;
  const MAX_SIZE_MB = 1;

  const handleImageSelection = async () => {
    try {
      const images = await selectMultipleImages();
      if (!images) return;
      const validImages = images.filter(img => {
        if (img.size && img.size > MAX_SIZE_MB * 1024 * 1024) {
          snackBar(
            `Image ${img.name} exceeds ${MAX_SIZE_MB}MB limit`,
            'warning',
          );
          return false;
        }
        return true;
      });

      if (imagePreviews.length + validImages.length > MAX_IMAGES) {
        snackBar(`You can upload a maximum of ${MAX_IMAGES} images`, 'warning');
        return;
      }

      const newPreviews = [
        ...imagePreviews,
        ...validImages.map(img => img.uri),
      ];
      setImagePreviews(newPreviews);

      const files = await Promise.all(
        validImages.map(async img => {
          const response = await fetch(img.uri);
          const blob = await response.blob();
          return new File([blob], img.name || `image_${Date.now()}`, {
            type: img.type,
          });
        }),
      );
      onImagesChange(files);
    } catch (error) {
      snackBar('Failed to select images', 'danger');
    }
  };

  const handleRemoveImage = (index: number) => {
    const newPreviews = imagePreviews.filter((_, idx) => idx !== index);
    setImagePreviews(newPreviews);
    onImagesChange([]);
  };

  const renderImageItem = ({item, index}: {item: string; index: number}) => (
    <View style={UploaderStyle.imageContainer}>
      <Image source={{uri: item}} style={UploaderStyle.image} />
      <TouchableOpacity
        style={UploaderStyle.removeButton}
        onPress={() => handleRemoveImage(index)}>
        <RemoveImage />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={UploaderStyle.container}>
      <View style={UploaderStyle.uploader}>
        <TouchableOpacity
          style={[UploaderStyle.uploaderButton]}
          onPress={handleImageSelection}
          disabled={imagePreviews.length >= MAX_IMAGES}>
          <Gallery />
        </TouchableOpacity>
        <View style={UploaderStyle.textBox}>
          <Text style={UploaderStyle.title}>{t('selectPhoto.title')}</Text>
          <Text style={UploaderStyle.description}>
            {t('selectPhoto.addPhotosForAd')} ({imagePreviews.length}/
            {MAX_IMAGES})
          </Text>
        </View>
      </View>

      {imagePreviews.length > 0 && (
        <View>
          <FlatList
            data={imagePreviews}
            renderItem={renderImageItem}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={UploaderStyle.listContainer}
          />
        </View>
      )}
    </View>
  );
};
