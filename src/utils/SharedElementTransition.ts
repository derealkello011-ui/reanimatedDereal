import { BounceInUp, SharedTransition } from 'react-native-reanimated';

export const SharedElementTransition = SharedTransition.duration( 550 ).springify().delay( 100 );

export const BouncyImageTransition = BounceInUp.duration( 1000 ).delay( 100 );
