type ImageSourcePropType =
  | number // (например, require)
  | {uri: string; width?: number; height?: number}
  | Array<{uri: string; width?: number; height?: number}>;

export type {ImageSourcePropType};
