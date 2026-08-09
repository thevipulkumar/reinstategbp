import Image, { type ImageProps } from "next/image";
import Link from "next/link";
import type { MDXComponents } from "mdx/types";

/**
 * Required by @next/mdx in the App Router. Post bodies inherit `.prose-body`
 * from the post template, so most elements need no override — these are the
 * ones where we want Next's Link/Image behaviour instead of raw tags.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: ({ href, children, ...props }) => {
      const url = String(href ?? "");
      if (url.startsWith("/")) {
        return (
          <Link href={url} {...props}>
            {children}
          </Link>
        );
      }
      return (
        <a href={url} target="_blank" rel="noopener noreferrer" {...props}>
          {children}
        </a>
      );
    },
    img: (props) => (
      <Image
        {...(props as ImageProps)}
        width={840}
        height={472}
        sizes="(min-width: 768px) 760px, 100vw"
        className="h-auto w-full rounded-image"
        alt={props.alt ?? ""}
      />
    ),
    ...components,
  };
}
