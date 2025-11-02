import useUniversityContext from 'src/hooks/university/useUnversityContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {icon} from 'src/assets/icons';

import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Navigation} from 'src/navigation/types/navigation.type';
import {StorageEnum} from 'src/navigation/types/storage.type';
import {unsaveUniversity} from 'src/api/unsaveUniversity';
import {saveUniversity} from 'src/api/saveUniversity';

interface Props {
  navigation: Navigation;
  itemId: string;
  title: string;
  onComparisonPress?: () => void;
  handleAddOrRemoveWishlist?: (newsId: string, title: string) => void;
  pathCameBack?: string;
  isSaved: boolean;
}

export interface TopBarRef {
  setOpacity: (newOpacity: number) => void;
}

const DetailHeaderActions = forwardRef<TopBarRef, Props>((props, ref) => {
  const isSaved = props.isSaved;
  const itemId = props.itemId;
  const title = props?.title;
  const [authToken, setAuthToken] = useState('');
  const universityContext = useUniversityContext();
  // const [isSaved, setIsSaved] = useState(false);
  const [opacity, setOpacity] = useState(1);

  // useEffect(()=>{
  //   console.log('add isSaved')
  //   props.isSavedWishlist && setIsSaved(props.isSavedWishlist);
  // },[props.isSavedWishlist])

  // Додаємо функціональність для рефів
  useImperativeHandle(ref, () => ({
    setOpacity: (newOpacity: number) => {
      setOpacity(newOpacity);
    },
  }));

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (authToken) {
  //       setIsSaved(
  //         universityContext.savedUniversities.some(
  //           (u: UniversityInterface) => u.id === itemId,
  //         ),
  //       );
  //     }
  //   };
  //   fetchData();
  // }, [authToken, itemId, universityContext]);

  useEffect(() => {
    const fetchToken = async () => {
      const token = await AsyncStorage.getItem(StorageEnum.accessToken);
      if (token) {
        setAuthToken(token);
      }
    };
    fetchToken();
  }, []);

  const toggleUniversitySave = async () => {
    // setIsSaved(!isSaved);
    try {
      if (isSaved) {
        const res = await unsaveUniversity(itemId);
        universityContext.setSavedUniversities(res.data || []);
      } else {
        const res = await saveUniversity(itemId);
        universityContext.setSavedUniversities(res.data || []);
      }
    } catch (error) {
      console.error('Error processing university:', error);
    }
  };

  const backToMain = () => {
    if (props?.pathCameBack) {
      return props.navigation.navigate(props?.pathCameBack);
    }
    props.navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.top, {opacity}]}>
        <TouchableOpacity style={styles.topButton} onPress={backToMain}>
          <Image source={icon.backIcon} style={styles.icon} />
        </TouchableOpacity>
        <View style={{flexDirection: 'row', gap: 16}}>
          {props.onComparisonPress && (
            <TouchableOpacity
              style={styles.topButton}
              onPress={props.onComparisonPress}>
              <Image source={icon.comparisonIcon} style={styles.icon} />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.topButton}
            onPress={
              props?.handleAddOrRemoveWishlist
                ? () => props.handleAddOrRemoveWishlist?.(itemId, title)
                : toggleUniversitySave
            }>
            <Image
              source={
                isSaved
                  ? icon.savedUniversityInformationButton
                  : icon.saveUniversityInformationButton
              }
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  safeArea: {
    width: '100%',
    zIndex: 3000,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 15,
    position: 'absolute',
    top: 16,
    alignSelf: 'center',
    zIndex: 3000,
  },
  icon: {
    width: 24,
    height: 24,
  },
  topButton: {
    backgroundColor: '#0E46F1',
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
});

export default DetailHeaderActions;
