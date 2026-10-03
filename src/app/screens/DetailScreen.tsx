import { useTheme } from 'expo-router';
import { Text, View } from 'react-native';

const DetailScreen = () => {
    const { colors } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: colors.text }}>DetailScreen</Text>
    </View>
  )
}

export default DetailScreen