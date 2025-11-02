import {icon} from 'src/assets/icons';
import React from 'react';
import {
  Image,
  ImageURISource,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import {saveUniversity} from '@api/saveUniversity';
import {unsaveUniversity} from '@api/unsaveUniversity';
import {Navigation} from 'src/navigation/types/navigation.type';
import useUniversityContext from 'src/hooks/university/useUnversityContext';
import {
  HomeScreen,
  StackScreenBottomMenu,
  WishlistPath,
} from 'src/types/screens.type';
import {previewText} from '@utils/previewText';
import {UniversityInterface} from '../ScreenView/MainScreen/interfaces/university.interface';
import TextCustom from '../Text/TextCustom';

interface Props {
  navigation: Navigation;
  university: UniversityInterface;
  isSaved: boolean;
  unsavedIcon?: ImageURISource;
  onPress?: () => void;
}

const UniversityCard: React.FC<Props> = React.memo(props => {
  const universityContext = useUniversityContext();

  const save = async () => {
    universityContext.setSavedUniversities([
      ...(universityContext.savedUniversities || []),
      props.university,
    ]);

    await saveUniversity(props.university.id);
  };

  const unsave = async () => {
    universityContext.setSavedUniversities(
      [...(universityContext.savedUniversities || [])].filter(
        university => university.id !== props.university.id,
      ),
    );

    await unsaveUniversity(props.university.id);
  };

  const handleChangeScreen = (universityData: UniversityInterface) => {
    props.navigation.navigate({
      name:
        props.isSaved && props.unsavedIcon
          ? StackScreenBottomMenu.WISHLIST
          : StackScreenBottomMenu.HOME,
      params: {
        screen:
          props.isSaved && props.unsavedIcon
            ? WishlistPath.WISHLIST_UNIVERSITY_DETAIL
            : HomeScreen.UNIVERSITY_INFORMATION,
        params: {
          university: universityData,
        },
      },
    });
  };

  return (
    <TouchableOpacity
      onPress={() => {
        handleChangeScreen(props.university);
      }}>
      <View style={styles.item}>
        <TouchableOpacity
          onPress={() => {
            if (props.isSaved) {
              unsave();
            } else {
              save();
            }
          }}
          style={styles.saveButton}>
          <View>
            <Image
              source={
                props.isSaved
                  ? props.unsavedIcon
                    ? props.unsavedIcon
                    : icon.savedIcon
                  : icon.noSavedIcon
              }
              style={props.isSaved ? styles.iconSaved : styles.icon}
            />
          </View>
        </TouchableOpacity>

        <Image
          source={
            props.university.previewImageUrl || props.university.logo
              ? {uri: props.university.previewImageUrl || props.university.logo}
              : icon.defaultUniversityImage
          }
          style={styles.image}
        />
        <View style={styles.infoContainer}>
          <TextCustom style={styles.name}>
            {previewText(props.university.shortName, 60)}
          </TextCustom>
          <TextCustom style={styles.details}>
            {props.university.adress}
          </TextCustom>
          <TextCustom style={styles.price}>
            {props.university.price || 0} грн/рік
          </TextCustom>
          <View style={styles.ratingPosition}>
            {/* {renderStars(props.university.rating || 0)} */}
            <TextCustom style={styles.ratingText}>
              {props.university.rating || 0}
            </TextCustom>
            <Image source={icon.yellowStar} style={styles.star} />
          </View>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Linking.openURL(props.university.url || '')}>
          <Image source={icon.universityArrow} style={styles.arrowIcon} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  saveButton: {
    position: 'absolute',
    left: 15,
    top: 15,
    zIndex: 1,
    backgroundColor: 'white',
    padding: 1,
    borderRadius: 50,
    height: 32,
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
    // Тіні для iOS
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    // Тіні для Android
    elevation: 5,
  },
  arrowIcon: {
    width: 24,
    height: 24,
  },
  icon: {
    width: 14,
    height: 18,
  },
  iconSaved: {
    width: 18,
    height: 22,
  },
  saveIcon: {
    marginLeft: 2,
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#202026',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 10,
    alignItems: 'center',
    padding: 8,
    borderWidth: 1,
    borderColor: '#3D3B3E',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginRight: 10,
    alignSelf: 'flex-start',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-between',
    position: 'relative',
    gap: 15,
    marginBottom: 5,
    marginTop: 5,
    marginLeft: 3,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 19,
    color: 'white',
    marginRight: 16,
  },
  details: {
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 16,
    color: '#91939F',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 19,
    color: 'white',
    paddingBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  ratingPosition: {
    position: 'absolute',
    top: 0,
    right: -30,
    flexDirection: 'row',
    gap: 4,
  },
  ratingText: {
    marginLeft: 4,
    color: '#91939F',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 14,
  },
  button: {
    backgroundColor: '#0E46F1',
    padding: 3,
    borderRadius: 50,
    alignSelf: 'flex-end',
  },
  star: {
    width: 12,
    height: 12,
  },
});

export default UniversityCard;
