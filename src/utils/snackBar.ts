import {showMessage} from 'react-native-flash-message';
import {RW} from './DimensionsChange';

type messageType = 'success' | 'warning' | 'danger';

const snackBar = (message: string, type: messageType) => {
  let borderColor = '';
  let textColor = '';
  switch (type) {
    case 'success':
      borderColor = 'green';
      textColor = 'green';
      break;
    case 'warning':
      borderColor = 'orange';
      textColor = 'orange';
      break;
    case 'danger':
      borderColor = 'red';
      textColor = 'red';
      break;
    default:
      borderColor = 'black';
      textColor = 'black';
  }

  showMessage({
    message: message,
    type: type,
    color: textColor,
    position: 'top',
    style: {
      borderRadius: 16,
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: borderColor,
      padding: RW(2),
    },
    floating: true,
  });
};

export {snackBar};
