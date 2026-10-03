import { useTheme } from 'expo-router';
import { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface DemoCardProps {
  title: string;
  description: string;
  buttonLabel: string;
  onPress: () => void;
  children: ReactNode;
}
const STAGE_HEIGHT = 200;
const CARD_PADDING = 16;



const DemoCard = ( { title, description, buttonLabel, onPress, children }: DemoCardProps ) => {
  const { colors } = useTheme();

  return (
    <View style={[ styles.card, { backgroundColor: colors.card, borderColor: colors.border } ]}>
      <Text style={[ styles.cardTitle, { color: colors.text } ]}>{title}</Text>
      <Text style={[ styles.cardDescription, { color: colors.text } ]}>{description}</Text>

      <View style={styles.stage}>{children}</View>

      <Pressable
        onPress={onPress}
        style={( { pressed } ) => [
          styles.button,
          { backgroundColor: colors.primary, opacity: pressed ? 0.8 : 1 },
        ]}
      >
        <Text style={styles.buttonText}>{buttonLabel}</Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
      card: {
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    padding: CARD_PADDING,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  cardDescription: {
    fontSize: 14,
    marginTop: 2,
    opacity: 0.6,
    },
  stage: {
    height: STAGE_HEIGHT,
    marginVertical: 16,
    borderRadius: 12,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(128,128,128,0.12)',
    },
    button: {
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
export default DemoCard