import { StyleSheet, View } from 'react-native';
import { Login } from './screens/Login';
import { Welcome } from './screens/Welcome';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Login /> */}
      <Welcome />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
