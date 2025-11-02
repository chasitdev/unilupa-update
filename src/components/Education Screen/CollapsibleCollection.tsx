import {icon} from 'src/assets/icons';
import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const CollapsibleSection = ({title, children}) => {
  const [isOpen, setIsOpen] = useState(false);

  const rotateAnim = useRef(new Animated.Value(isOpen ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: isOpen ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isOpen, rotateAnim]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View style={styles.collapsibleSection}>
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() => {
          setIsOpen(!isOpen);
        }}>
        <Text style={styles.sectionHeaderText}>{title}</Text>
        <Animated.View style={{transform: [{rotate}]}}>
          <Image source={icon.listArrow} style={styles.arrow} />
        </Animated.View>
      </TouchableOpacity>
      {isOpen && <View style={styles.childrenContainer}>{children}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  collapsibleSection: {
    width: '100%',
    marginTop: 10,
    backgroundColor: '#1C1C1E',
    borderRadius: 16,
  },
  sectionHeader: {
    width: '100%',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionHeaderText: {
    color: 'white',
    fontWeight: 'bold',
    paddingRight: 20,
    width: '90%',
  },
  childrenContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    borderColor: '#8F8F92',
    gap: 0,
  },
  arrow: {
    width: 24,
    height: 24,
  },
});

export default CollapsibleSection;
