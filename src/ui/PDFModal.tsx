import React from 'react';
import {Modal, StyleSheet, Button, SafeAreaView} from 'react-native';
import WebView from 'react-native-webview';

interface PDFModalProps {
  isVisible: boolean;
  onClose: () => void;
  pdfUrl: string;
}

const PDFModal: React.FC<PDFModalProps> = ({isVisible, onClose, pdfUrl}) => {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isVisible}
      onRequestClose={onClose}>
      <SafeAreaView style={styles.container}>
        <WebView source={{uri: pdfUrl}} style={styles.webview} />
        <Button title="Закрити" onPress={onClose} />
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default PDFModal;
