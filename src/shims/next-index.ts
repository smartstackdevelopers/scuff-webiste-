export type Metadata = Record<string, unknown>;
export type Viewport = Record<string, unknown>;

export namespace MetadataRoute {
  export type Robots = Record<string, unknown>;
  export type Sitemap = Array<Record<string, unknown>>;
}

const NextShim = {};
export default NextShim;
