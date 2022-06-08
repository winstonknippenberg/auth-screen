import React from 'react';
import { StyleSheet, Image, View } from 'react-native';

export const Welcome = () => {
  return (
    <View style={styles.welcome}>
      <View style={styles.logo}>
        <Image source={require('../assets/safeLogoBlue.png')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  welcome: {
    backgroundColor: '#202b4a',
    flex: 1,
  },
  logo: {
    marginTop: 150,
    alignItems: 'center',
  },
});
