import {deleteAccount} from '@api/deleteAccount';
import useAuth from 'src/hooks/auth/useAuth';
import {Navigation} from 'src/navigation/types/navigation.type';
import {RouteProp} from '@react-navigation/native';
import {icon} from 'src/assets/icons';
import React, {useState} from 'react';
import {Linking, Modal, ScrollView, StyleSheet, View} from 'react-native';
import PDFModal from 'src/ui/PDFModal';
import TopButtonSettings from 'src/ui/ScreenView/Settings Screen/TopButtonSettings';
import SettingsButton from 'src/ui/ScreenView/Settings Screen/SettingsButton';
import TextCustom from 'src/ui/Text/TextCustom';
import StyledButton from 'src/ui/Buttons/StyledButton';

interface Props {
  navigation: Navigation;
  route: RouteProp<Record<string, {userName: string}>, 'key'>;
}
const SettingsScreen: React.FC<Props> = props => {
  const auth = useAuth();
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [fileUrl, setFileUrl] = useState('');

  const remove = async () => {
    await deleteAccount();
    auth.logout();
  };

  return (
    <View style={styles.container}>
      <TopButtonSettings navigation={props.navigation} />

      <ScrollView
        style={styles.buttons}
        contentContainerStyle={styles.buttonsContainer}>
        {/* <SettingsButton
            title={'Редагувати профіль'}
            icon={icon.settingsProfile}
            color="white"
            onPress={() => {
              props.navigation.navigate({
                name: StackScreenBottomMenu.PROFILE,
                params: {
                  screen: ProfileScreen.EDIT_PROFILE,
                },
              });
            }}></SettingsButton> */}
        {/* <SettingsButton
            title={'Тип ВНЗ'}
            icon={icon.settingsVNZ}
            color="white"
            onPress={() => {
              props.navigation.navigate({
                name: StackScreenBottomMenu.PROFILE,
                params: {
                  screen: ProfileScreen.WHERE_YOU_GO_SETTINGS,
                  params: {
                    test: 'fewf',
                  },
                },
              });
            }}></SettingsButton> */}
        {/* <SettingsButton
            title={'Галузь освіти'}
            icon={icon.settingsOsvita}
            color="white"
            onPress={() => {
              props.navigation.navigate({
                name: StackScreenBottomMenu.PROFILE,
                params: {
                  screen: ProfileScreen.CHOOSE_EDUCATION_SETTINGS,
                  params: {
                    test: 'fewf',
                  },
                },
              });
            }}></SettingsButton> */}
        {/* <SettingsButton
            title={'Геолокація'}
            icon={icon.settingsLocation}
            color="white"
            onPress={() => {
              props.navigation.navigate({
                name: StackScreenBottomMenu.PROFILE,
                params: {
                  screen: ProfileScreen.LOCATION_SETTINGS,
                  params: {
                    test: 'fewf',
                  },
                },
              });
            }}></SettingsButton> */}

        <View style={styles.buttonGroup}>
          <SettingsButton
            title={'Індивідуальні можливості'}
            icon={icon.settingsTelegram}
            color="white"
            onPress={() => {
              Linking.openURL('https://t.me/unichance_bot');
            }}
          />
          <SettingsButton
            title={'Телеграм'}
            icon={icon.settingsTelegram}
            color="white"
            onPress={() => {
              Linking.openURL('https://t.me/unilupa');
            }}
          />
          <SettingsButton
            title={'Подкаст'}
            icon={icon.microphone}
            color="white"
            onPress={() => {
              Linking.openURL('https://linktr.ee/unilupa');
            }}
          />
          <SettingsButton
            title={'Служба турботи'}
            icon={icon.settingsSupport}
            color="white"
            onPress={() => {
              Linking.openURL('https://t.me/unilupacare');
            }}
          />
        </View>

        <View style={styles.buttonGroup}>
          <SettingsButton
            title={'Умови та положення'}
            icon={icon.settingsConditions}
            color="white"
            onPress={() => {
              setFileUrl(
                'https://hqua0325043.online-vm.com/img/docs/terms.pdf',
              );
            }}></SettingsButton>
          <SettingsButton
            title={'Політика конфіденційності'}
            icon={icon.settingsPrivacyPolicy}
            color="white"
            onPress={() => {
              setFileUrl(
                'https://hqua0325043.online-vm.com/img/docs/privacy.pdf',
              );
            }}></SettingsButton>
        </View>

        <View style={styles.buttonGroup}>
          <SettingsButton
            title={'Вихід'}
            icon={icon.settingsQuit}
            color="#D22B2B"
            onPress={() => {
              auth.logout();
            }}
          />

          <SettingsButton
            title={'Видалити акаунт'}
            icon={icon.trash}
            color="#D22B2B"
            onPress={() => {
              setIsDeleteModal(true);
            }}
          />
        </View>
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isDeleteModal}
        onRequestClose={() => {
          setIsDeleteModal(!isDeleteModal);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextCustom textAlign="center" fontSize={24}>
              {'Ви впевнені, що хочете видалити акаунт?\nЦя дія невідворотня'}
            </TextCustom>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 12,
              }}>
              <StyledButton
                color="white"
                borderWidth={0}
                isFlex
                title={'Видалити'}
                backgroundColor="#D22B2B"
                fontSIze={18}
                onPress={() => {
                  setIsDeleteModal(false);
                  remove();
                }}
              />
              <StyledButton
                color="black"
                borderWidth={0}
                isFlex
                title={'Скасувати'}
                fontSIze={18}
                onPress={() => {
                  setIsDeleteModal(false);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>

      <PDFModal
        isVisible={fileUrl != ''}
        onClose={function (): void {
          setFileUrl('');
        }}
        pdfUrl={fileUrl}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    gap: 42,
  },
  buttons: {
    gap: 12,
    width: '90%',
  },
  buttonsContainer: {
    gap: 12,
    paddingBottom: 100,
  },
  buttonGroup: {},
  centeredView: {
    flex: 1,
    backgroundColor: '#00000084',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    width: '80%',
    backgroundColor: '#262626',
    borderRadius: 12,
    padding: 32,
    gap: 16,
  },
});

export default SettingsScreen;
