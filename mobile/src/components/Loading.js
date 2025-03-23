import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

const Loading = ({ message = '加载中...' }) => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#6200ee" />
    <Text style={styles.message}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  message: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default Loading;
