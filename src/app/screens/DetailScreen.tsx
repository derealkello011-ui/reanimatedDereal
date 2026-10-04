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
      style={[{ backgroundColor: colors.background } ]}
      edges={[ 'bottom', 'left', 'right' ]} // the stack header handles the top
    >
      {item ? (
                <ScrollView contentContainerStyle={styles.content}>
                    <View>
                        <View style={[styles.imageContainer, {borderColor: colors.border}]}>
                            <Image source={item.image} style={styles.image} resizeMode='contain' />
                        </View>
                      <View style={styles.info}>
                          <Text style={[styles.infoHeader, {color: colors.primary}]}>
                              {item.name}
                          </Text>
                          <View style={styles.infoSub}>
                                <Text style={[ styles.label, { color: colors.text } ]}>Price</Text>
                                <Text style={[ styles.price, { color: colors.text } ]}>
                                    {item.price.toLocaleString()}
                                </Text>
                          </View>
                            
                        </View>
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
    content: {
            padding: 20,
            gap: 20,
    },
    image: {
        width: '100%',
        // aspectRatio: 1,
        borderRadius: 20,
        height: '100%',
    },
    info: {
        gap: 4,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end'
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
        alignItems: 'center',
        justifyContent: 'center',
        },
    imageContainer: {
        width: '100%',
        height: 350,
        borderRadius: 20,
        borderWidth: 2,
        alignSelf: 'center'
    },
    infoSub: {
        flexDirection: 'column'
    },
    infoHeader: {
        fontWeight: 'bold',
        fontSize: 20,
    }
    } );
