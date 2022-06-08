import React from 'react';
import { Text, StyleSheet, View, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export const ConfirmationButton = () => {
  return (
    <View>
      {/* @ts-ignore */}
      <LinearGradient
        start={{ x: 1, y: 0 }}
        colors={['#369aff', '#1b81e9']}
        style={styles.button}
      >
        <Text style={styles.buttonText}>אישור</Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    padding: 15,
    elevation: 10,
    width: 300,
    textAlign: 'center',
    marginTop: 30,
    alignSelf: 'center',
    // backgroundColor: '#2f8cea',
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 15,
  },
});
