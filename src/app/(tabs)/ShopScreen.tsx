import { assets } from '@/constants/assets';
import { SharedElementTransition } from '@/utils/SharedElementTransition';
import { Ionicons } from '@expo/vector-icons';
import { FlashList, FlashListRef } from '@shopify/flash-list';
import { useRouter, useTheme } from 'expo-router';
import { useRef } from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

type AssetItem = ( typeof assets )[ number ];

// `FlashList<AssetItem>` keeps the list's generic type, so `item` stays typed
const AnimatedFlashList = Animated.createAnimatedComponent( FlashList<AssetItem> );

const SHOW_BUTTON_AFTER = 200; // scroll distance (px) at which the button is fully visible

const ShopScreen = () => {
  const { colors } = useTheme();
  const router = useRouter();

  const listRef = useRef<FlashListRef<AssetItem>>( null );
  const scrollY = useSharedValue( 0 );

  // Runs on the UI thread on every scroll event
  const onScroll = useAnimatedScrollHandler( ( event ) => {
    scrollY.set( event.contentOffset.y );
  } );

  // Fades and slides the button in as the user scrolls down
  const scrollTopButtonStyle = useAnimatedStyle( () => {
    const progress = interpolate(
      scrollY.get(),
      [ SHOW_BUTTON_AFTER - 100, SHOW_BUTTON_AFTER ],
      [ 0, 1 ],
      Extrapolation.CLAMP,
    );

    return {
      opacity: progress,
      transform: [ { translateY: ( 1 - progress ) * 20 } ],
    };
  } );

  const handleItemPress = ( item: AssetItem ) => {
    router.push( {
      pathname: '/screens/DetailScreen',
      params: { id: item.id },
    } );
  };

  const scrollToTop = () => {
    listRef.current?.scrollToOffset( { offset: 0, animated: true } );
  };

  return (
    <SafeAreaView
      style={[ styles.container, { backgroundColor: colors.background } ]}
      edges={[ 'top', 'left', 'right' ]}
    >
      <AnimatedFlashList
        ref={listRef}
        onScroll={onScroll}
        scrollEventThrottle={16}
        ListHeaderComponent={
          <View
            style={[
              styles.headerCard,
              { borderColor: colors.border, backgroundColor: colors.card },
            ]}
          >
            <Text style={[ styles.headerTitle, { color: colors.text } ]}>Our Products</Text>
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
            <View style={styles.cardRow}>
              <Animated.Image
                sharedTransitionTag={`image-${ item.id }`}
                sharedTransitionStyle={SharedElementTransition}
                source={item.image}
                style={styles.image}
                resizeMode='cover'
              />
              <View style={styles.textColumn}>
                <Text style={[ styles.name, { color: colors.primary } ]}>{item.name}</Text>
                <Text style={[ styles.description, { color: colors.text } ]}>
                  {item.description}
                </Text>
                <Text
                  numberOfLines={2}
                  style={[ styles.moreInfo, { color: colors.text } ]}
                >
                  {item.moreInfo}
                </Text>
              </View>
            </View>
          </Pressable>
        )}
      />

      <Animated.View style={[ styles.scrollTopButton, scrollTopButtonStyle ]}>
        <TouchableOpacity onPress={scrollToTop} accessibilityLabel='Scroll to top'>
          <Ionicons name='arrow-up-circle-sharp' size={40} color={colors.primary} />
        </TouchableOpacity>
      </Animated.View>
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

  // Header
  headerCard: {
    padding: 10,
    borderBottomWidth: 1,
    marginBottom: 5,
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  headerTitle: {
    fontWeight: '600',
    fontSize: 30,
  },

  // Card
  card: {
    margin: 6,
    padding: 8,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
  },
  cardRow: {
    flexDirection: 'row',
    gap: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  textColumn: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  description: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '600',
  },
  moreInfo: {
    marginTop: 8,
    fontSize: 10,
    opacity: 0.6,
    fontWeight: '400',
  },

  // Scroll-to-top button
  scrollTopButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
} );
