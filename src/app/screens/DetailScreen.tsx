import { assets } from '@/constants/assets';
import { useLocalSearchParams, useTheme } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DetailScreen = () => {
  const { colors } = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();

  const item = assets.find( ( asset ) => asset.id === id );

  return (
    <SafeAreaView
      style={[ styles.container, { backgroundColor: colors.background } ]}
      edges={[ 'bottom', 'left', 'right' ]} // the stack header handles the top
    >
      {item ? (
        <ScrollView contentContainerStyle={styles.content}>
          <Image source={item.image} style={styles.image} resizeMode='contain' />
          <View style={styles.info}>
            <Text style={[ styles.label, { color: colors.text } ]}>Price</Text>
            <Text style={[ styles.price, { color: colors.text } ]}>
              {item.price.toLocaleString()}
            </Text>
          </View>
        </ScrollView>
      ) : (
        <View style={styles.empty}>
          <Text style={{ color: colors.text }}>Item not found.</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default DetailScreen;

const styles = StyleSheet.create( {
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    gap: 20,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 12,
  },
  info: {
    gap: 4,
  },
  label: {
    fontSize: 14,
    opacity: 0.6,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
} );
