import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import MaskedInput from '../../src/';
import { useCallback } from 'react';

let options = {
  precision: 2,
  separator: ',',
  delimiter: '.',
  unit: '$',
  suffixUnit: '',
  zeroCents: true,
};

export default function App() {
  const [result, setResult] = React.useState<string | number>(0);

  const onChangeCallback = useCallback((maskedText) => {
    setResult(maskedText);
  }, []);
  return (
    <View style={styles.container}>
      <MaskedInput
        options={options}
        placeholder={'testt test'}
        type={'money'}
        value={result}
        onChangeText={onChangeCallback}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
