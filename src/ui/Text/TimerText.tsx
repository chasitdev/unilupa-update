import React, {useEffect} from 'react';
import TextCustom from './TextCustom';
import {color} from '@utils/colors';

interface Props {
  seconds: number;
  onTick: (v: number) => void;
}
const TimerText: React.FC<Props> = props => {
  useEffect(() => {
    if (props.seconds > 0) {
      const timerId = setTimeout(() => props.onTick(props.seconds - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [props.seconds]);

  return (
    <TextCustom
      fontSize={16}
      lineHeight={24}
      fontWeight="400"
      color={color.buttonDark}
      underline={props.seconds <= 0}>
      {props.seconds > 0
        ? `Wait ${props.seconds}s for resend.`
        : 'Click to resend.'}
    </TextCustom>
  );
};

export default TimerText;
