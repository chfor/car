import React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const Header = ({ title, showBack = true, rightAction }) => {
  const navigation = useNavigation();

  return (
    <Appbar.Header style={styles.header}>
      {showBack && (
        <Appbar.BackAction onPress={() => navigation.goBack()} />
      )}
      <Appbar.Content title={title} />
      {rightAction}
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  header: {
    elevation: 4,
  },
});

export default Header;
