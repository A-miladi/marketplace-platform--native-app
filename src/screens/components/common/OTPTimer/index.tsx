import {colors} from '@/styles/colors';
import React, {useState, useEffect, FC} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

interface OTPTimerProps {
  duration?: number;
  onResend?: () => void;
}

export const OTPTimer: FC<OTPTimerProps> = ({duration = 120, onResend}) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isTimerActive, setIsTimerActive] = useState(true);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerActive(false);
    }

    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft]);

  const handleResend = () => {
    setTimeLeft(duration);
    setIsTimerActive(true);
    onResend?.();
  };

  return (
    <View style={{flexDirection: 'row', alignItems: 'center', paddingTop: 5}}>
      {isTimerActive ? (
        <Text style={{color: colors.primary[700]}}>
          Resend code ({formatTime(timeLeft)})
        </Text>
      ) : (
        <TouchableOpacity onPress={handleResend}>
          <Text style={{color: colors.primary[800]}}>Resend code</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
