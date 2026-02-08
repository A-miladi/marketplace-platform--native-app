import CloseIcon from '@/assets/Icons/Close.svg';
import {colors} from '@/styles/colors';
import {RFS} from '@/utils/DimensionsChange';
import React, {FC} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import CustomBtn from '../common/button/Button';
import {ModalStyle} from './style';
interface IModalProps {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  AcceptAction?: () => void;
  CancelAction?: () => void;
  AcceptTitle?: string;
  CancelTitle?: string;
  centerText?: boolean;
  closer?: () => void;
  boldText?: boolean;
  center?: boolean;
  gap?: number;
  AcceptLoading?: boolean;
  CancelLoading?: boolean;
}
export const Modal: FC<IModalProps> = ({
  children,
  title,
  description,
  CancelAction,
  AcceptTitle,
  CancelTitle,
  AcceptAction,
  centerText = false,
  closer,
  boldText = false,
  center = false,
  gap = 15,
  AcceptLoading,
  CancelLoading,
}) => {
  return (
    <View
      style={[
        ModalStyle.container,
        center === true && ModalStyle.centerContainer,
      ]}>
      <View style={[ModalStyle.child, {gap}]}>
        {closer && (
          <TouchableOpacity onPress={closer} style={ModalStyle.CloseButton}>
            <CloseIcon width={25} height={25} />
          </TouchableOpacity>
        )}
        {title && (
          <Text
            style={[
              ModalStyle.title,
              centerText === true && {textAlign: 'center'},
            ]}>
            {title}
          </Text>
        )}

        {description && (
          <Text
            style={[
              ModalStyle.description,
              boldText === true && {
                color: colors.neutral[900],
                fontWeight: 'bold',
                fontSize: RFS(1.6),
              },
            ]}>
            {description}
          </Text>
        )}
        {children && <View style={ModalStyle.Children}>{children}</View>}

        {CancelAction && (
          <CustomBtn
            isLoading={CancelLoading}
            width={80}
            title={CancelTitle as string}
            radius={8}
            direction="rtl"
            titleColor={colors.primary[800]}
            backColor="white"
            borderColor={colors.primary[800]}
            borderWidth={1}
            onClick={CancelAction}
          />
        )}
        {AcceptAction && (
          <CustomBtn
            width={80}
            title={AcceptTitle as string}
            radius={8}
            direction="rtl"
            borderWidth={2}
            onClick={AcceptAction}
            isLoading={AcceptLoading}
          />
        )}
      </View>
    </View>
  );
};
