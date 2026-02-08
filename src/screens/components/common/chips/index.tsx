import {Text, View} from 'react-native';
import ApproveIcon from '@/assets/Icons/Approve.svg';
import RejectIcon from '@/assets/Icons/reject.svg';
import PendingIcon from '@/assets/Icons/pending.svg';
import {ChipsStyle} from './style';

type Status = 'PENDING' | 'APPROVED' | 'REJECTED';

interface ChipsProps {
  status: Status;
}

type StatusConfig = {
  [key in Status]: {
    icon: React.ReactNode;
    text: string;
    color: string;
  };
};

export const Chips = ({status}: ChipsProps) => {
  const statusConfig: StatusConfig = {
    APPROVED: {
      icon: <ApproveIcon />,
      text: 'Approve Advertisement',
      color: '#32A700',
    },
    PENDING: {
      icon: <PendingIcon />,
      text: 'Pending for the announcement to be published',
      color: '#EDCF0E',
    },
    REJECTED: {
      icon: <RejectIcon />,
      text: 'Reject Advertisement',
      color: '#E21B1C',
    },
  };

  const currentStatus = statusConfig[status];

  return (
    <View style={ChipsStyle.container}>
      {currentStatus.icon}
      <Text style={[ChipsStyle.text, {color: currentStatus.color}]}>
        {currentStatus.text}
      </Text>
    </View>
  );
};
