import { Link } from 'expo-router'
import { StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
const TransitionScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Link href="/screens/AnimatingStylesProps" style={styles.link}>
        <Text style={styles.linkText}>Animating styles and Props</Text>
      </Link>
      <Link href="/(tabs)/transitions" style={styles.link}>
        <Text style={styles.linkText}>Go to Transitions</Text>
      </Link>
    </SafeAreaView>
  )
}

export default TransitionScreen

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        paddingHorizontal: 10,
    }, 
    linkText: {
        fontSize: 18,
        color: 'blue',
        fontWeight: 'bold',
    },
    link: {
        marginVertical: 10,
    }
})