import {Navigation} from 'src/navigation/types/navigation.type';
import useUniversityContext from 'src/hooks/university/useUnversityContext';
import React, {ReactElement, useCallback, useEffect, useState} from 'react';
import {ImageURISource, StyleSheet, View} from 'react-native';
import UniversityCard from '../../Cardss/UniversityCard';
import {UniversityInterface} from './interfaces/university.interface';
import {FlatList} from 'react-native-gesture-handler';

interface Props {
  header: ReactElement;
  navigation: Navigation;
  initialUniversities: UniversityInterface[];
  saveIcon?: ImageURISource;
  unsaveIcon?: ImageURISource;
  onSavePress?: () => void;
  onUnsavePress?: () => void;
  sortMethod?: string;
  showAd?: boolean;
}

const UniversityList: React.FC<Props> = React.memo(props => {
  const [universities, setUniversities] = useState<UniversityInterface[]>([]);
  const universityContext = useUniversityContext();

  useEffect(() => {
    let sortedUniversities = [...props.initialUniversities];
    switch (props.sortMethod) {
      case 'nameA':
        sortedUniversities.sort((a, b) =>
          a.shortName.localeCompare(b.shortName),
        );
        break;
      case 'nameZ':
        sortedUniversities.sort((a, b) =>
          b.shortName.localeCompare(a.shortName),
        );
        break;
      case 'costMin':
        sortedUniversities.sort((a, b) => a.price - b.price);
        break;
      case 'costMax':
        sortedUniversities.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sortedUniversities.sort((a, b) => b.rating - a.rating);
        break;
      default:
        sortedUniversities.sort((a, b) =>
          a.shortName.localeCompare(b.shortName),
        );
    }
    setUniversities(sortedUniversities.sort((a, b) => b.rating - a.rating));
  }, [props.initialUniversities, props.sortMethod]);

  const renderItem = ({item, index}: any) => {
    // Кожен п'ятий елемент (index 4, 9, 14, ...)
    if ((index + 1) % 5 === 0 && props.showAd) {
      return (
        <View style={{flex: 1}}>
          <UniversityCard
            navigation={props.navigation}
            university={item}
            isSaved={universityContext.savedUniversities
              .map(univer => univer.id)
              .includes(item.id)}
            unsavedIcon={props.unsaveIcon}
            onPress={() => {
              const isSaved = universityContext.savedUniversities.some(
                univer => univer.id === item.id,
              );
              if (isSaved) {
                props.onUnsavePress?.();
              } else {
                props.onSavePress?.();
              }
            }}
          />
          {/* <Advertising size={BannerAdSize.LARGE_BANNER} /> */}
        </View>
      );
    }
    // Звичайний елемент
    return (
      <UniversityCard
        navigation={props.navigation}
        university={item}
        isSaved={universityContext.savedUniversities
          .map(univer => univer.id)
          .includes(item.id)}
        unsavedIcon={props.unsaveIcon}
        onPress={() => {
          const isAveSaved = universityContext.savedUniversities.some(
            univer => univer.id === item.id,
          );
          if (isAveSaved) {
            props.onUnsavePress?.();
          } else {
            props.onSavePress?.();
          }
        }}
      />
    );
  };

  const keyExtractor = useCallback((item: any) => item.id.toString(), []);
  // console.log('icon', props.unsaveIcon);
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}
      data={universities}
      style={styles.list}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ListHeaderComponent={props.header}
      decelerationRate="fast"
      directionalLockEnabled={true}
      disableVirtualization={true}
    />
  );
});

const styles = StyleSheet.create({
  list: {marginBottom: 145},
});

export default UniversityList;
