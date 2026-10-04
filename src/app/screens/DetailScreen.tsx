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
      style={[ styles.screen, { backgroundColor: colors.background } ]}
      edges={[ 'bottom', 'left', 'right' ]} // the stack header handles the top
    >
      {item ? (
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={[ styles.imageFrame, { borderColor: colors.border } ]}>
            <Image source={item.image} style={styles.image} resizeMode='contain' />
          </View>

          <View style={styles.details}>
            <Text style={[ styles.name, { color: colors.primary } ]}>{item.name}</Text>
            <Text style={[ styles.description, { color: colors.text } ]}>
              {item.description}
            </Text>

            <View style={[ styles.priceRow, { borderColor: colors.border } ]}>
              <Text style={[ styles.priceLabel, { color: colors.text } ]}>Price</Text>
              <Text style={[ styles.priceValue, { color: colors.text } ]}>
                {item.price.toLocaleString()}
              </Text>
            </View>

            {item.moreInfo ? (
              <View style={styles.moreInfo}>
                <Text style={[ styles.moreInfoTitle, { color: colors.text } ]}>More info</Text>
                <Text style={[ styles.moreInfoText, { color: colors.text } ]}>
                  {item.moreInfo}
                </Text>
              </View>
            ) : null}
          </View>
        </ScrollView>
      ) : (
        <View style={styles.emptyState}>
          <Text style={{ color: colors.text }}>Item not found.</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default DetailScreen;

const styles = StyleSheet.create( {
  // Layout
  screen: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 32,
    gap: 24,
    alignItems: 'center',
  },

  // Image
  imageFrame: {
    width: '80%',
    height: 350,
    borderRadius: 20,
    borderWidth: 2,
    overflow: 'hidden', // clips the image to the rounded corners
  },
  image: {
    width: '100%',
    height: '100%',
  },

  // Details
  details: {
    width: '100%',
    gap: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    opacity: 0.8,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  priceLabel: {
    fontSize: 14,
    opacity: 0.6,
  },
  priceValue: {
    fontSize: 28,
    fontWeight: 'bold',
  },

  // More info
  moreInfo: {
    gap: 6,
    marginTop: 4,
  },
  moreInfoTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  moreInfoText: {
    fontSize: 15,
    lineHeight: 22,
    opacity: 0.7,
  },

  // Empty state
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
} );
