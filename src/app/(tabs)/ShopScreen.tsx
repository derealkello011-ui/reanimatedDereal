import { assets } from '@/constants/assets';
import { FlashList } from '@shopify/flash-list';
import { useTheme } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ShopScreen = () => {
  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={[ styles.container, { backgroundColor: colors.background } ]}
      edges={[ 'top', 'left', 'right' ]}
    >
      <FlashList
        data={assets}
        keyExtractor={( _, index ) => String( index )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        numColumns={1}
        renderItem={( { item } ) => (
          <View style={styles.item}>
            <TouchableOpacity>
              <Image source={item.image} style={styles.image} />
              <Text style={[styles.price, { color: colors.text }]}>$ {item.price.toFixed(2)}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default ShopScreen;

const styles = StyleSheet.create( {
  container: {
    flex: 1, // FlashList needs a parent with a real size
  },
  list: {
    padding: 10,
  },
  item: {
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
  price: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
} );
