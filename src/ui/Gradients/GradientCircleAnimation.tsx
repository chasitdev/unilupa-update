import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import Svg, {Circle} from 'react-native-svg';

export const CircleDotsGradientAnimation = () => {
  const [gradientColors, setGradientColors] = useState<string[]>([]);
  const circleRadius = 14;
  const dotsNum = 16;
  const centerX = 25;
  const centerY = 25;
  const animationSpeed = 50;

  useEffect(() => {
    const colors: string[] = [];
    for (let i = 0; i < dotsNum; i++) {
      const opacity = 1 - i / dotsNum;
      colors.push(`rgba(249, 238, 204, ${opacity})`);
    }
    setGradientColors(colors);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setGradientColors((prevColors: string[]): string[] => {
        const lastColor: string = prevColors.pop() || '';
        return [lastColor, ...prevColors];
      });
    }, animationSpeed);

    return () => clearInterval(interval);
  }, []);

  return (
    <View>
      <Svg height="50" width="50">
        {gradientColors.map((color, i) => {
          const angle = (i * 2 * Math.PI) / dotsNum;
          const x = centerX + circleRadius * Math.cos(angle);
          const y = centerY + circleRadius * Math.sin(angle);
          return <Circle key={i} cx={x} cy={y} r="2" fill={color} />;
        })}
      </Svg>
    </View>
  );
};
