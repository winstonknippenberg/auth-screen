import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { Dimensions } from 'react-native';
const screen = Dimensions.get('screen');
const screenWidth = screen.width;
const screenHeight = screen.height;

interface VerificationCodeProps {
  codeState: [string, React.Dispatch<React.SetStateAction<string>>];
}

const CELL_COUNT = 6;

export const VerificationCode = (props: VerificationCodeProps) => {
  const [value, setValue] = props.codeState;
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [properties, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <View style={styles.root}>
      <CodeField
        ref={ref}
        {...properties}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}
          >
            {symbol ? '*' : isFocused ? <Cursor /> : null}
          </Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: { padding: 20 },
  codeFieldRoot: { marginTop: 5 },
  cell: {
    margin: 5,
    width: 50,
    paddingTop: 5,
    height: 50,
    lineHeight: 38,
    fontWeight: 'bold',
    fontSize: 30,
    borderRadius: 5,
    borderWidth: 2,
    backgroundColor: '#fff',
    borderColor: '#fff',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
});
