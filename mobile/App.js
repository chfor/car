import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { theme } from './src/theme';
import Navigation from './src/navigation';
import { LogBox } from 'react-native';

// 忽略特定的警告
LogBox.ignoreLogs([
  'Asyncstorage has been extracted',
  'ViewPropTypes will be removed',
]);

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <Navigation />
    </PaperProvider>
  );
};

export default App;
