declare module "excerpt-html" {
  export default function excerptHtml(
    html: string,
    options?: {
      moreRegExp?: RegExp;
      stripTags?: boolean;
      pruneLength?: number;
      pruneString?: string;
      pruneSeparator?: string;
    },
  ): string;
}
