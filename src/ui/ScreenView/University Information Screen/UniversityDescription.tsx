import {icon} from 'src/assets/icons';
import React, {useState} from 'react';
import {Image, Linking, StyleSheet, TouchableOpacity, View} from 'react-native';
import TextTitle from '../../Text/TextCustom';

interface Props {
  description: string;
  url?: string;
}

const UniversityDescription: React.FC<Props> = props => {
  const [isExpanded, setIsExpanded] = useState(false);
  if (!props.description) {
    return <View style={styles.empty} />;
  }

  const shouldShowButton = props.description?.length > 300;

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const textToShow = isExpanded
    ? props.description
    : props.description.substring(0, 247) + '...';

  return (
    <View style={styles.text}>
      <TextTitle
        fontSize={20}
        fontWeight="600"
        lineHeight={24}
        style={styles.title}>
        Опис
      </TextTitle>
      <TextTitle
        fontSize={16}
        fontWeight="400"
        lineHeight={18}
        color="#8F8F92">
        {textToShow}
      </TextTitle>

      {!isExpanded && shouldShowButton && (
        <TextTitle
          onPress={toggleExpanded}
          fontSize={16}
          fontWeight="600"
          lineHeight={18}
          color="#53A1FF">
          Більше
        </TextTitle>
      )}

      {isExpanded && shouldShowButton && (
        <TextTitle
          onPress={toggleExpanded}
          fontSize={16}
          fontWeight="600"
          lineHeight={18}
          color="#53A1FF">
          Менше
        </TextTitle>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    padding: 14,
  },
  moreButton: {
    marginTop: 93,
    marginLeft: 5,
  },
  title: {
    marginBottom: 10,
  },
  empty: {
    marginBottom: 10,
  },
  imageContainer: {
    width: 24,
    height: 24,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  row: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 24,
  },
  linkText: {
    marginLeft: 18,
  },
});

export default UniversityDescription;
