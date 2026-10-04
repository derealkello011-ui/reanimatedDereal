import { assets } from '@/constants/assets';
import { FlashList } from '@shopify/flash-list';
import { useRouter, useTheme } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type AssetItem = ( typeof assets )[ number ];

const ShopScreen = () => {
  const { colors } = useTheme();
  const router = useRouter();

  const handleItemPress = ( item: AssetItem ) => {
    router.push( {
      pathname: '/screens/DetailScreen',
      params: { id: item.id },
    } );
  };

  return (
    <SafeAreaView
      style={[ styles.container, { backgroundColor: colors.background } ]}
      edges={[ 'top', 'left', 'right' ]} // the stack header handles the top
    >
      <FlashList
        ListHeaderComponent={
          <View style={[styles.pageContainer, {borderColor: colors.border, backgroundColor: colors.card}]}>
            <Text style={[styles.pageHeader,{color: colors.text}]}>Our Products</Text>
          </View>
        }
        data={assets}
        keyExtractor={( item ) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
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
            <View style={styles.info}>
              <Image source={item.image} style={styles.image} resizeMode='cover' />
              <View style={styles.infoDesign}>
                <Text style={[styles.infoHeader, {color: colors.primary}]}>
                  {item.name}
                </Text>
                <Text style={[ styles.price, { color: colors.text } ]}>
                    {item.description}
                </Text >
                <Text style={[ styles.label, { color: colors.text } ]}>
                    {item.moreInfo}
                </Text >
              </View>
            </View>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
};

export default ShopScreen;

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
    width: 100,
    height: 100,
    aspectRatio: 1,
    borderRadius: 8,
  },
  info: {
    flex: 1,
    flexDirection: 'row',
    gap: 20
  },
  infoDesign: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center'
  },
  price: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '600',
  },
  label: {
    marginTop: 8,
    fontSize: 10,
    opacity: 0.6,
    fontWeight: '400',
  },
  infoHeader: {
    fontWeight: 'bold',
    fontSize: 20
  },
  pageContainer: {
    padding: 10,
    borderBottomWidth: 1,
    marginBottom: 5,
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15
  },
  pageHeader: {
    fontWeight: '600',
    fontSize: 30,
  }
} );
