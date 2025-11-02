import {Navigation} from 'src/navigation/types/navigation.type';
import UniversityList from '../../ui/ScreenView/MainScreen/UniversityList';
import TextCustom from '../../ui/Text/TextCustom';
import useUniversityContext from 'src/hooks/university/useUnversityContext';
import {icon} from 'src/assets/icons';
import React, {useMemo, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';

interface Props {
  navigation: Navigation;
}
const SavedUniversityScreen: React.FC<Props> = props => {
  const [type, setType] = useState('Всі');
  const universContext = useUniversityContext();

  const filteredUniversities = useMemo(() => {
    return universContext.savedUniversities.filter(
      univer => univer.type === type || type === 'Всі',
    );
  }, [type, universContext.savedUniversities]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <View style={styles.topText}>
          <TextCustom
            fontSize={32}
            fontWeight="600"
            lineHeight={38}
            color="white">
            Збережені
          </TextCustom>
        </View>
      </View>

      {filteredUniversities.length > 0 && (
        <View style={styles.scrollContainer}>
          <UniversityList
            navigation={props.navigation}
            initialUniversities={filteredUniversities}
            unsaveIcon={icon.unsaveUniversityButton}
            header={<></>}
          />
        </View>
      )}

      {filteredUniversities.length < 1 && (
        <View
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TextCustom color="white" textAlign="center">
            {'У вас ще немає\nзбережених закладів'}
          </TextCustom>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    width: '100%',
    backgroundColor: 'black',
    paddingHorizontal: 16,
  },
  top: {},
  topText: {
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 16,
  },
  buttons: {
    marginTop: 25,
  },
});

export default SavedUniversityScreen;
