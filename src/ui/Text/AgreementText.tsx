import React from 'react';
import {StyleSheet, View} from 'react-native';
import TextTitle from './TextCustom';
import {color} from '@utils/colors';
import {ScrollView} from 'react-native';

interface Props {}
const AgreementText: React.FC<Props> = () => {
  return (
    <View style={styles.viewContainer}>
      <ScrollView
        indicatorStyle="black"
        persistentScrollbar
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <TextTitle
          color="black"
          fontSize={15}
          fontFamily="Inter"
          fontWeight="700">
          Specific definitions:
        </TextTitle>

        <TextTitle
          color="black"
          fontSize={12}
          fontFamily="Inter"
          fontWeight="400">
          (a) Business Associate.  “Business Associate” shall generally have the
          same meaning as the term “business associate” at 45 CFR 160.103, and
          in reference to the party to this agreement, shall mean [Insert Name
          of Business Associate].
        </TextTitle>

        <TextTitle
          color="black"
          fontSize={12}
          fontFamily="Inter"
          fontWeight="400">
          (b) Covered Entity.  “Covered Entity” shall generally have the same
          meaning as the term “covered entity” at 45 CFR 160.103, and in
          reference to the party to this agreement, shall mean [Insert Name of
          Covered Entity].
        </TextTitle>

        <TextTitle
          color="black"
          fontSize={12}
          fontFamily="Inter"
          fontWeight="400">
          (c) HIPAA Rules.  “HIPAA Rules” shall mean the Privacy, Security,
          Breach Notification, and Enforcement Rules at 45 CFR Part 160 and Part
          164.
        </TextTitle>
        <TextTitle
          color="black"
          fontSize={12}
          fontFamily="Inter"
          fontWeight="400">
          (c) HIPAA Rules.  “HIPAA Rules” shall mean the Privacy, Security,
          Breach Notification, and Enforcement Rules at 45 CFR Part 160 and Part
          164.
        </TextTitle>
        <TextTitle
          color="black"
          fontSize={12}
          fontFamily="Inter"
          fontWeight="400">
          (c) HIPAA Rules.  “HIPAA Rules” shall mean the Privacy, Security,
          Breach Notification, and Enforcement Rules at 45 CFR Part 160 and Part
          164.
        </TextTitle>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    borderWidth: 1,
    borderColor: color.borderPrimary,
    borderRadius: 4,
    padding: 12,
    height: 250,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    gap: 16,
    paddingRight: 16,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default AgreementText;
