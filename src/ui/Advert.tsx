import React, {useRef} from 'react';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
// import {
//   BannerAd,
//   BannerAdSize,
//   TestIds,
//   useForeground,
// } from 'react-native-google-mobile-ads';

interface Props {
  size: any;
}

// const adUnitId = TestIds.ADAPTIVE_BANNER;

const Advertising: React.FC<Props> = props => {
  // const bannerRef = useRef<BannerAd>(null);

  // (iOS) WKWebView can terminate if app is in a "suspended state", resulting in an empty banner when app returns to foreground.
  // Therefore it's advised to "manually" request a new ad when the app is foregrounded (https://groups.google.com/g/google-admob-ads-sdk/c/rwBpqOUr8m8).
  // useForeground(() => {
  //   Platform.OS === 'ios' && bannerRef.current?.load();
  // });

  return (
    <View style={styles.container}>
      {/* <BannerAd ref={bannerRef} unitId={adUnitId} size={props.size} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    borderRadius: 16,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Advertising;
