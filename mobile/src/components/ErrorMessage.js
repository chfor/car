import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-paper';

const ErrorMessage = ({ message, onRetry }) => (
  <View style={styles.container}>
    <Text style={styles.message}>{message}</Text>
    {onRetry && (
      <Button mode="contained" onPress={onRetry} style={styles.button}>
        重试
      </Button>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  message: {
    fontSize: 16,
    color: '#B00020',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
  },
});

export default ErrorMessage;
