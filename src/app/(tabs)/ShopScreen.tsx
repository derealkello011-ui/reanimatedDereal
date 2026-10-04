import { assets } from '@/constants/assets';
import { FlashList } from '@shopify/flash-list';
import { useRouter, useTheme } from 'expo-router';
import { Image, Pressable, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type AssetItem = ( typeof assets )[ number ];

const HomeScreen = () => {
  const { colors } = useTheme();
  const router = useRouter();

  // Only the id travels in the route: params are serialized into the URL, so
  // objects and bundled images can't be passed. The detail screen looks the
  // full item up from `assets`.
  const handleItemPress = ( item: AssetItem ) => {
    router.push( {
      pathname: '/screens/DetailScreen',
      params: { id: item.id },
    } );
  };

  return (
    <SafeAreaView
      style={[ styles.container, { backgroundColor: colors.background } ]}
      edges={[ 'bottom', 'left', 'right' ]} // the stack header handles the top
    >
      <FlashList
        data={assets}
        numColumns={2}
        keyExtractor={( item ) => item.id}
        contentContainerStyle={styles.list}
        renderItem={( { item } ) => (
          <Pressable
            accessibilityRole='button'
            onPress={() => handleItemPress( item )}
            style={( { pressed } ) => [
              styles.card,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
                opacity: pressed ? 0.8 : 1,
              },
            ]}
          >
            <Image source={item.image} style={styles.image} resizeMode='cover' />
            <Text style={[ styles.price, { color: colors.text } ]}>
              {item.price.toLocaleString()}
            </Text>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create( {
  container: {
    flex: 1,
  },
  list: {
    padding: 6,
  },
  card: {
    margin: 6,
    padding: 8,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 8,
  },
  price: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '600',
  },
} );
