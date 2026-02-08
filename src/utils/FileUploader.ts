import {Platform} from 'react-native';
//third parties
import {
  default as ImageCropPicker,
  default as ImagePicker,
} from 'react-native-image-crop-picker';
//utils
//constant
import {
  CAMERA_OPTIONS,
  GALLERY_MULTIPLE_IMAGE_OPTIONS,
  GALLERY_SINGLE_IMAGE_OPTIONS,
} from '@/constants/permission';

type ImageType = {
  uri: string;
  type: string;
  name: string;
  size?: number;
};

const selectMultipleImages = async () => {
  try {
    const imagePicker: any = await ImagePicker.openPicker(
      //@ts-ignore
      GALLERY_MULTIPLE_IMAGE_OPTIONS,
    );
    let imagesArray: ImageType[] = [];
    for (let i = 0; i < imagePicker.length; i++) {
      let randomChar = `${'userId'}_${(Math.random() + 1)
        .toString(36)
        .substring(2)}`;
      imagesArray.push({
        uri: imagePicker[i].path,
        type: imagePicker[i].mime,
        name:
          Platform?.OS === 'ios'
            ? imagePicker[i].filename
            : `${randomChar}.${imagePicker[i].mime.replace('image/', '')}`,
      });
    }
    return imagesArray;
  } catch (error: any) {
    return null;
  }
};

const selectSingleImage = async () => {
  try {
    const imagePicker = await ImageCropPicker.openPicker(
      //@ts-ignore
      GALLERY_SINGLE_IMAGE_OPTIONS,
    );
    const input = {
      uri: imagePicker.path,
      type: imagePicker.mime,
      name:
        Platform?.OS === 'ios'
          ? imagePicker.filename
          : `imageProfile.${imagePicker.mime.replace('image/', '')}`,
    };
    return input;
  } catch (err) {
    return null;
  }
};

const getImageWithCamera = async () => {
  try {
    const imagePicker = await ImageCropPicker.openCamera(CAMERA_OPTIONS);
    const input = {
      uri: imagePicker.path,
      type: imagePicker.mime,
      name:
        Platform?.OS === 'ios'
          ? imagePicker.filename
          : `${Math.random().toString(36)}.${imagePicker.mime.replace(
              'image/',
              '',
            )}`,
    };
    return input;
  } catch (err) {
    return null;
  }
};

// const getDocument = async () => {
//   try {
//     //@ts-ignore
//     const pickerResult = await DocumentPicker.pickSingle(DOCUMENT_OPTIONS);
//     const input = {
//       uri: pickerResult.fileCopyUri,
//       type: pickerResult.type,
//       name: pickerResult.name,
//     };
//     return input;
//   } catch (err) {
//     if (!DocumentPicker.isCancel(err)) {
//       //@ts-ignore
//       snackBar(err?.message, 'danger');
//       return null;
//     }
//     return null;
//   }
// };

export {getImageWithCamera, selectMultipleImages, selectSingleImage};
