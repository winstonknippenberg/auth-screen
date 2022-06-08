import React from 'react';
import { Text, StyleSheet, View, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface ConfirmationButtonProps {
  handleConfirmation: () => void;
}

export const ConfirmationButton = ({
  handleConfirmation,
}: ConfirmationButtonProps) => {
  return (
    <View>
      {/* @ts-ignore */}
      <LinearGradient
        start={{ x: 1, y: 0 }}
        colors={['#369aff', '#1b81e9']}
        style={styles.button}
      >
        <Pressable onPress={handleConfirmation}>
          <Text style={styles.buttonText}>אישור</Text>
        </Pressable>
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
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 15,
  },
});
