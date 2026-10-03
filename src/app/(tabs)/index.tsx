import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const width = useSharedValue( 100 );
  
  const handlePress = () => { 
    width.value = withSpring(Math.random() * 200 + 100);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Animated.View
          style={[{width}, styles.animationContainer]}
        />
        <Pressable onPress={handlePress}
          style={styles.customButton}
          >
          <Text style={styles.buttonText}>Change Width</Text>
        </Pressable>
        <Animated.View>
          <Text style={styles.header}> Animating styles and props </Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create( {
  safeArea: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
    height: 100,
    backgroundColor: "violet",
    borderRadius: 20,
    alignSelf: "center",
  },
  customButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    padding: 20,
  },
  animationContainer: {
    alignItems: "center",
    height: 100,
    marginVertical: 20,
    backgroundColor: "lightgray",
    borderRadius: 20,
  },
});
