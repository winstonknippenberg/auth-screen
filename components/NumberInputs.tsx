import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Dimensions } from 'react-native';
const screen = Dimensions.get('screen');
const screenWidth = screen.width;
const screenHeight = screen.height;

interface NumberInputsPros {
  numberState: [string, React.Dispatch<React.SetStateAction<string>>];
  areaCodeState: [string, React.Dispatch<React.SetStateAction<string>>];
}

export const NumberInputs = ({
  numberState,
  areaCodeState,
}: NumberInputsPros) => {
  const [number, onChangeNumber] = numberState;
  const [open, setOpen] = useState(false);
  const [areaCode, changeAreaCode] = areaCodeState;
  const [items, setItems] = useState([
    { label: '+972', value: '+972' },
    { label: '+1', value: '+1' },
    { label: '+976', value: '+976' },
  ]);

  return (
    <View style={styles.inputContainer}>
      <View style={styles.spinnerView}>
        <Text style={styles.label}>קידומת</Text>
        <DropDownPicker
          style={styles.inputSpinner}
          open={open}
          value={areaCode}
          items={items}
          setOpen={setOpen}
          setValue={changeAreaCode}
          setItems={setItems}
        />
      </View>
      <View style={styles.spinnerView}>
        <Text style={styles.label}>מספר</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber} // onChangeNumber(value)
          value={number}
          placeholder="מספר טלפון"
          keyboardType="numeric"
          focusable
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginRight: 10,
    marginLeft: 10,
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    alignContent: 'center',
    flexDirection: 'row',
  },
  input: {
    marginTop: 10,
    width: screenWidth * 0.51,
    height: screenHeight * 0.06,
    margin: 12,
    borderRadius: 5,
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 0.25,
    padding: 10,
  },
  inputSpinner: {
    borderRadius: 5,
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 0.25,
    marginTop: 10,
    width: screenWidth * 0.303,
    height: screenHeight * 0.06,
    margin: 12,
    padding: 10,
  },
  spinnerView: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
  },
  label: {
    color: '#868ca1',
    marginRight: 15,
    textAlign: 'right',
  },
});
