import { Href, Link, useRouter, useTheme } from 'expo-router';
import { Button, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface RouteLink {
  label: string;
  href: Href;
}

const LINKS: RouteLink[] = [
  { label: 'Animating styles and Props', href: '/screens/AnimatingStylesProps' },
  { label: 'Go to Home', href: '/' },
];

const TransitionScreen = () => {
  const { colors } = useTheme();
  const router = useRouter();

  return (
    <SafeAreaView
      style={[ styles.container, { backgroundColor: colors.background } ]}
      edges={[ 'top', 'left', 'right' ]}
    >
      {LINKS.map( ( { label, href } ) => (
        <Link
          key={label}
          href={href}
          style={[ styles.link, { color: colors.primary } ]}
        >
          {label}
        </Link>
      ) )}

      <Button
        title='Open animation screen'
        color={colors.primary}
        onPress={() => router.push( '/screens/AnimatingStylesProps' )}
      />
    </SafeAreaView>
  );
};

export default TransitionScreen;

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  link: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
} );
