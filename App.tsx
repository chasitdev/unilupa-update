import Navigation from 'src/navigation/Navigation';
import { AuthProvider } from 'src/hooks/auth/AuthProvider';
import React from 'react';
import { Dimensions, LogBox, StyleSheet } from 'react-native';
import ErrorBoundary from 'react-native-error-boundary';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LanguageProvider } from './src/hooks/language/LanguageProvider';
import { UniversityProvider } from 'src/hooks/university/UniversityProvider';
LogBox.ignoreAllLogs();

const { width, height } = Dimensions.get('window');
export const aspect = height / width;
export const appHeight = height;
export const appWidth = width;

export default function App() {
  // const [role] = useState(Role.CLIENT);r

  return (
    <LanguageProvider>
      <ErrorBoundary>
        <GestureHandlerRootView style={styles.container}>
          <AuthProvider>
            <UniversityProvider>
              <Navigation />
            </UniversityProvider>
          </AuthProvider>
        </GestureHandlerRootView>
      </ErrorBoundary>
    </LanguageProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
