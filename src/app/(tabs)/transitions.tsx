import { Href, Link, useTheme } from 'expo-router';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface RouteLink {
  label: string;
  href: Href;
}

const LINKS: RouteLink[] = [
    { label: 'Animating styles and Props', href: '/screens/AnimatingStylesProps' },
    { label: 'Go to Home', href: '/screens/HomeScreen' },
    { label: 'Go to Detail', href: '/screens/DetailScreen' },
];

const TransitionScreen = () => {
  const { colors } = useTheme();

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
