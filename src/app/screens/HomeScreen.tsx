import { useTheme } from 'expo-router';
import { Text, View } from 'react-native';

const HomeScreen = () => {
    const { colors } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: colors.text }}>HomeScreen</Text>
    </View>
  )
}

export default HomeScreen