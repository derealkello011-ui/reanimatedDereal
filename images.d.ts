// Tells TypeScript what you get back when you import an image file.
// Metro bundles the image and returns an asset reference that React Native's
// <Image source={...} /> accepts.
//
// Keep this file free of top-level imports/exports: that is what makes the
// `declare module` blocks global. Imports are done inside each block instead.

declare module '*.png' {
  import { ImageSourcePropType } from 'react-native';
  const value: ImageSourcePropType;
  export default value;
}

declare module '*.jpg' {
  import { ImageSourcePropType } from 'react-native';
  const value: ImageSourcePropType;
  export default value;
}

declare module '*.jpeg' {
  import { ImageSourcePropType } from 'react-native';
  const value: ImageSourcePropType;
  export default value;
}

declare module '*.gif' {
  import { ImageSourcePropType } from 'react-native';
  const value: ImageSourcePropType;
  export default value;
}

declare module '*.webp' {
  import { ImageSourcePropType } from 'react-native';
  const value: ImageSourcePropType;
  export default value;
}