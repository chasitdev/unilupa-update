import React, {useCallback, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewToken,
} from 'react-native';
import {Navigation} from 'src/navigation/types/navigation.type';
import {HomeScreen, StackScreenBottomMenu} from 'src/types/screens.type';
import {icon} from 'src/assets/icons';
import Slides from '../../ui/ScreenView/MainScreen/Slides';
import {UniversityInterface} from '../../ui/ScreenView/MainScreen/interfaces/university.interface';
import {INews} from 'src/screens/Opportunities/interface/opportunities.interface';

const {width: screenWidth} = Dimensions.get('window');

interface Props {
  navigation: Navigation;
  dataRecommendationList: UniversityInterface[] | INews[];
  onPress?: (path: string, id: string) => void;
  variant: 'university' | 'opportunities';
}

const RecommendationSlider: React.FC<Props> = ({
  navigation,
  dataRecommendationList,
  variant,
  onPress,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  });

  const handleViewableItemsChanged = useCallback(
    ({viewableItems}: {viewableItems: ViewToken[]}) => {
      if (viewableItems.length > 0) {
        setActiveSlide(viewableItems[0].index || 0);
      }
    },
    [],
  );

  const scrollToIndex = useCallback((index: number) => {
    try {
      flatListRef.current?.scrollToIndex({index, animated: true});
    } catch {
      flatListRef.current?.scrollToOffset({
        offset: index * screenWidth,
        animated: true,
      });
    }
  }, []);

  const goNext = () => {
    if (activeSlide < dataRecommendationList.length - 1) {
      scrollToIndex(activeSlide + 1);
    }
  };

  const goPrev = () => {
    if (activeSlide > 0) {
      scrollToIndex(activeSlide - 1);
    }
  };

  const navigateToUniversity = useCallback(
    (university: UniversityInterface) => {
      navigation.navigate({
        name: StackScreenBottomMenu.HOME,
        params: {
          screen: HomeScreen.UNIVERSITY_INFORMATION,
          params: {university},
        },
      });
    },
    [navigation],
  );

  const serializeSlide = useCallback(
    (item: any) => ({
      previewImageUrl:
        item?.previewImageUrl ?? item?.processed_data?.media?.[0]?.url ?? '',
      logo: item?.logo ?? '',
      fullName: item?.fullName ?? item?.processed_data?.title ?? '',
      shortName: item?.shortName ?? '',
      city: item?.city ?? item?.processed_data?.place_data?.country ?? '',
      adress: item?.adress ?? item?.processed_data?.place_data?.address ?? '',
    }),
    [],
  );

  const renderItem = useCallback(
    ({item}: {item: UniversityInterface | INews}) => {
      const onSlidePress = () => {
        if (variant === 'university') {
          navigateToUniversity(item as UniversityInterface);
        } else {
          onPress?.(StackScreenBottomMenu.OpportunitiesDetail, item.id);
        }
      };

      return <Slides slide={serializeSlide(item)} onPress={onSlidePress} />;
    },
    [navigateToUniversity, onPress, serializeSlide, variant],
  );

  const keyExtractor = useCallback((_, index: number) => `${index}`, []);

  if (!dataRecommendationList.length) return null;

  return (
    <View style={styles.container}>
      <View style={styles.carouselContainer}>
        <FlatList
          ref={flatListRef}
          data={dataRecommendationList}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={handleViewableItemsChanged}
          viewabilityConfig={viewabilityConfig.current}
          getItemLayout={(_, index) => ({
            length: screenWidth,
            offset: screenWidth * index,
            index,
          })}
          initialScrollIndex={0}
        />

        {/* Navigation Controls */}
        {activeSlide > 0 && (
          <TouchableOpacity
            style={[styles.controlButton, styles.leftControlButton]}
            onPress={goPrev}>
            <Image
              source={icon.png.backButtonRecomendation}
              style={styles.icon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}

        {activeSlide < dataRecommendationList.length - 1 && (
          <TouchableOpacity
            style={[styles.controlButton, styles.rightControlButton]}
            onPress={goNext}>
            <Image
              source={icon.png.nextButtonRecomendation}
              style={styles.icon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Pagination Dots */}
      <View style={styles.dotContainer}>
        {dataRecommendationList.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === activeSlide && styles.activeDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  carouselContainer: {
    position: 'relative',
  },
  icon: {
    width: 16,
    height: 16,
  },
  dotContainer: {
    marginTop: 8,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF55',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#FFFFFF',
    width: 8,
    height: 8,
  },
  controlButton: {
    position: 'absolute',
    top: '40%',
    backgroundColor: '#0E47F173',
    borderRadius: 4,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  leftControlButton: {
    left: 12,
  },
  rightControlButton: {
    right: 12,
  },
});

export default RecommendationSlider;
