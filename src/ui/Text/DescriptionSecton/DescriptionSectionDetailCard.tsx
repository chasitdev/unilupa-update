import React from 'react';
import {Image, View} from 'react-native';
import {styles} from './styles/description-section-detail-card.style.ts';
import TextCustom from '../TextCustom.tsx';

interface IPropsDesc {
  desc: string | string[] | undefined;
  title: string;
  icon?: any;
  center?: boolean;
  border?: boolean;
}
const DescriptionSectionDetailCard: React.FC<IPropsDesc> = ({
  desc,
  title,
  icon,
  center,
  border,
}: IPropsDesc) => {
  return (
    <View
      style={[
        styles.container,
        center && {alignItems: 'center'},
        border && {borderWidth: 1, borderColor: '#36363F', padding: 10},
      ]}>
      <View style={styles.wrapImage}>
        {icon && (
          <View style={styles.imageContainer}>
            <Image source={icon} style={styles.image} />
          </View>
        )}
        <TextCustom
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: '#ffffff',
            textAlign: 'center',
          }}>
          {title}
        </TextCustom>
      </View>
      <TextCustom
        style={{
          fontSize: 16,
          fontWeight: '400',
          color: '#91939F',
          textAlign: 'left',
        }}>
        {typeof desc === 'string'
          ? desc
          : Array.isArray(desc)
          ? desc.map((item, index) => (
              <TextCustom key={index} style={{color: '#91939F'}}>
                {'- ' + item}
                {'\n'}
                {index !== desc.length - 1 ? '\n' : ''}
              </TextCustom>
            ))
          : 'Немає даних'}
      </TextCustom>
    </View>
  );
};

export default DescriptionSectionDetailCard;
