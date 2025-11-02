import {UniversityInterface} from '../../ui/ScreenView/MainScreen/interfaces/university.interface';
import TextCustom from '../../ui/Text/TextCustom';
import UniversityImageGallery from '../../ui/ScreenView/University Information Screen/UniversityImageGallery';
import useUniversityContext from 'src/hooks/university/useUnversityContext';
import {icon} from 'src/assets/icons';

import React, {useRef} from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import ButtonBack from 'src/ui/Buttons/ButtonBack';

interface Props {}

const ComparisonScreen: React.FC<Props> = () => {
  const {comparisonUniversities, removeComparison, clearComparison} =
    useUniversityContext();

  const headerScrollRef = useRef<ScrollView>(null);
  const contentScrollRef = useRef<ScrollView>(null);

  const handleHorizontalScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;

    if (headerScrollRef.current) {
      headerScrollRef.current.scrollTo({x: offsetX, animated: false});
    }
    if (contentScrollRef.current) {
      contentScrollRef.current.scrollTo({x: offsetX, animated: false});
    }
  };

  const clearAllComparison = async () => {
    Alert.alert('Ви точно хочете очистити список порівняння?', '', [
      {
        text: 'Так',
        onPress: () => {
          clearComparison();
        },
      },
      {
        text: 'Ні',
        onPress: () => {},
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safe}>
        <View style={styles.top}>
          <ButtonBack />
          <TextCustom
            fontSize={20}
            fontWeight="600"
            lineHeight={24}
            color="white"
            style={styles.titleText}>
            Порівняння
          </TextCustom>

          <TouchableOpacity
            style={styles.topButton}
            onPress={clearAllComparison}>
            <Image source={icon.filterDelete} style={styles.icon} />
          </TouchableOpacity>
        </View>

        {comparisonUniversities.length <= 0 && (
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              paddingBottom: 120,
            }}>
            <TextCustom
              fontSize={16}
              fontWeight="600"
              lineHeight={19}
              color="white"
              style={{
                marginTop: 16,
                textAlign: 'center',
              }}>
              Список порівняння порожній
            </TextCustom>
          </View>
        )}

        {comparisonUniversities.length > 0 && (
          <View>
            <ScrollView
              horizontal
              ref={headerScrollRef}
              scrollEnabled={false}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                flexDirection: 'row',
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginTop: 16,
                  paddingLeft: 16,
                }}>
                <TextCustom
                  fontSize={14}
                  fontWeight="600"
                  lineHeight={19}
                  color="#91939F">
                  Навчальний заклад
                </TextCustom>

                <TextCustom
                  fontSize={14}
                  fontWeight="600"
                  lineHeight={19}
                  color="#91939F"
                  style={{
                    marginLeft: 160,
                  }}>
                  Повна назва
                </TextCustom>

                <TextCustom
                  fontSize={14}
                  fontWeight="600"
                  lineHeight={19}
                  color="#91939F"
                  style={{
                    marginLeft: 130,
                  }}>
                  Бюджетних місць
                </TextCustom>

                <TextCustom
                  fontSize={14}
                  fontWeight="600"
                  lineHeight={19}
                  color="#91939F"
                  style={{
                    marginLeft: 30,
                  }}>
                  Вартість
                </TextCustom>

                <TextCustom
                  fontSize={14}
                  fontWeight="600"
                  lineHeight={19}
                  color="#91939F"
                  style={{
                    marginLeft: 180,
                  }}>
                  Місто
                </TextCustom>

                <TextCustom
                  fontSize={14}
                  fontWeight="600"
                  lineHeight={19}
                  color="#91939F"
                  style={{
                    marginLeft: 120,
                  }}>
                  Рейтинг
                </TextCustom>

                <TextCustom
                  fontSize={14}
                  fontWeight="600"
                  lineHeight={19}
                  color="#91939F"
                  style={{
                    marginLeft: 130,
                    width: 800,
                  }}>
                  Галерея
                </TextCustom>
              </View>
            </ScrollView>

            <ScrollView
              horizontal={true} // Горизонтальна прокрутка
              showsHorizontalScrollIndicator={false} // Відключення індикатора
              ref={contentScrollRef}
              onScroll={handleHorizontalScroll} // Обробляємо горизонтальний скрол
              scrollEventThrottle={16} // Частота подій скролу
              contentContainerStyle={{
                flexDirection: 'row', // Розміщення елементів у горизонтальному напрямку
              }}>
              <ScrollView
                showsVerticalScrollIndicator={false} // Відключення вертикального індикатора
                style={{
                  marginTop: 16,
                }}
                contentContainerStyle={{
                  gap: 16, // Проміжки між елементами
                  paddingBottom: 120,
                }}>
                {comparisonUniversities.map(
                  (university: UniversityInterface) => (
                    <View
                      key={university.id}
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        backgroundColor: '#202026',
                        borderWidth: 1,
                        borderColor: '#3D3B3E',
                        borderRadius: 16,
                        padding: 16,
                      }}>
                      <View>
                        <TouchableOpacity
                          onPress={() => {
                            removeComparison(university);
                          }}
                          style={styles.saveButton}>
                          <View>
                            <Image
                              source={icon.unsaveUniversityButton}
                              style={styles.icon}
                            />
                          </View>
                        </TouchableOpacity>
                        <Image
                          source={
                            university.previewImageUrl || university.logo
                              ? {
                                  uri:
                                    university.previewImageUrl ||
                                    university.logo,
                                }
                              : icon.defaultUniversityImage
                          }
                          style={{width: 128, height: 128, borderRadius: 8}}
                        />
                      </View>

                      <View
                        style={{
                          width: 132,
                          marginLeft: 16,
                          justifyContent: 'center',
                          gap: 8,
                        }}>
                        <TextCustom
                          fontSize={16}
                          fontWeight="600"
                          lineHeight={19}
                          color="white">
                          {university.shortName}
                        </TextCustom>
                        <TextCustom
                          fontSize={14}
                          fontWeight="400"
                          lineHeight={16}
                          color="#91939F">
                          {university.adress || university.city}
                        </TextCustom>
                      </View>

                      <View
                        style={{
                          width: 200,
                          marginLeft: 16,
                          justifyContent: 'center',
                          gap: 8,
                        }}>
                        <TextCustom
                          fontSize={16}
                          fontWeight="600"
                          lineHeight={19}
                          color="white">
                          {university.fullName}
                        </TextCustom>
                      </View>

                      <View
                        style={{
                          width: 130,
                          marginLeft: 16,
                          justifyContent: 'center',
                          gap: 8,
                        }}>
                        <TextCustom
                          fontSize={16}
                          fontWeight="600"
                          lineHeight={19}
                          color="white">
                          {university.budgetSeatsCount || 0}
                        </TextCustom>
                      </View>

                      <View
                        style={{
                          width: 220,
                          marginLeft: 16,
                          justifyContent: 'center',
                          gap: 8,
                        }}>
                        <TextCustom
                          fontSize={16}
                          fontWeight="600"
                          lineHeight={19}
                          color="white">
                          від {university.priceFrom} до {university.priceTo} грн
                        </TextCustom>
                      </View>

                      <View
                        style={{
                          width: 100,
                          marginLeft: 16,
                          justifyContent: 'center',
                          gap: 8,
                        }}>
                        <TextCustom
                          fontSize={16}
                          fontWeight="600"
                          lineHeight={19}
                          color="white">
                          {university.city}
                        </TextCustom>
                      </View>

                      <View
                        style={{
                          width: 200,
                          marginLeft: 16,
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          gap: 8,
                        }}>
                        {[1, 2, 3, 4, 5].map((item, index) => (
                          <Image
                            key={index}
                            source={require('@assets/icons/star.png')}
                            style={{
                              width: 12,
                              height: 12,
                              tintColor:
                                Number.parseInt(university.rating.toString()) >
                                index
                                  ? 'yellow'
                                  : 'gray',
                            }}
                          />
                        ))}
                        <TextCustom fontSize={14} color="#91939F">
                          ({university.rating})
                        </TextCustom>
                      </View>

                      <View
                        style={{
                          width: 366,
                          marginLeft: 16,
                          justifyContent: 'center',
                          gap: 8,
                        }}>
                        <UniversityImageGallery
                          imagesUrl={university.imagesUrl}
                        />
                      </View>
                    </View>
                  ),
                )}
              </ScrollView>
            </ScrollView>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'black',
    flex: 1,
  },
  safe: {
    width: '100%',
    alignSelf: 'center',
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 15,
  },
  topButton: {
    backgroundColor: '#0E46F1',
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  titleText: {
    textAlign: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  saveButton: {
    position: 'absolute',
    left: 8,
    top: 8,
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
});

export default ComparisonScreen;
