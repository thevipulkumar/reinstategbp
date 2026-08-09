import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Post } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-card bg-white shadow-[0_2px_16px_rgba(0,0,0,0.05)] transition-shadow duration-300 hover:shadow-[0_12px_36px_rgba(0,0,0,0.1)]">
      {post.image ? (
        <Image
          src={post.image}
          alt={post.imageAlt ?? ""}
          width={800}
          height={450}
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
          className="aspect-video w-full object-cover"
        />
      ) : null}

      <div className="flex flex-1 flex-col p-7">
        <p className="flex flex-wrap items-center gap-x-2 text-[13px] text-muted">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readingMinutes} min read</span>
        </p>

        <h2 className="mt-3 text-[21px] font-semibold leading-snug">
          <Link href={`/blog/${post.slug}`} className="transition-colors hover:text-brand-dark">
            {/* Stretched hit area keeps the whole card clickable without nesting links. */}
            <span className="absolute inset-0" aria-hidden="true" />
            {post.title}
          </Link>
        </h2>

        <p className="mt-3 flex-1 text-[15px] leading-relaxed text-body">{post.description}</p>

        <span className="btn-label mt-6 inline-flex items-center gap-2 text-brand-dark">
          Read more
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform duration-200 group-hover:translate-x-1"
          />
        </span>
      </div>
    </article>
  );
}
