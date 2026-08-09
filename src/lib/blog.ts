import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

export type PostFrontmatter = {
  title: string;
  description: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  author: string;
  tags: string[];
  /** Path under /public, or omit for no hero image. */
  image?: string;
  imageAlt?: string;
};

export type Post = PostFrontmatter & {
  slug: string;
  readingMinutes: number;
};

export const POSTS_PER_PAGE = 6;

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "blog");

function readingMinutes(body: string): number {
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 225));
}

/**
 * Splits a leading `---` YAML frontmatter block from the body.
 *
 * This used to be gray-matter, which is unmaintained and hard-codes
 * `yaml.safeLoad` — an API js-yaml removed in v4 — so it can never take the
 * patched parser (js-yaml 3.15.1 is the last 3.x and carries CVE-2026-53550).
 * Calling js-yaml 4 directly is a dozen lines and drops both dependencies.
 */
function splitFrontmatter(raw: string): { data: Record<string, unknown>; content: string } {
  const match = /^﻿?---\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/.exec(raw);
  if (!match) return { data: {}, content: raw };

  const parsed = yaml.load(match[1], { filename: "frontmatter" });

  return {
    data: parsed && typeof parsed === "object" ? (parsed as Record<string, unknown>) : {},
    content: raw.slice(match[0].length),
  };
}

function parseFile(fileName: string): Post {
  const slug = fileName.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(CONTENT_DIR, fileName), "utf8");
  const { data, content } = splitFrontmatter(raw);

  const frontmatter = data as Partial<PostFrontmatter>;

  if (!frontmatter.title || !frontmatter.date) {
    throw new Error(
      `Blog post "${fileName}" is missing a required frontmatter field (title, date).`,
    );
  }

  return {
    slug,
    title: frontmatter.title,
    description: frontmatter.description ?? "",
    date: frontmatter.date,
    author: frontmatter.author ?? "Reinstate GBP",
    tags: frontmatter.tags ?? [],
    image: frontmatter.image,
    imageAlt: frontmatter.imageAlt,
    readingMinutes: readingMinutes(content),
  };
}

/** All posts, newest first. */
export function getAllPosts(): Post[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map(parseFile)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

export function getTotalPages(): number {
  return Math.max(1, Math.ceil(getAllPosts().length / POSTS_PER_PAGE));
}

export function getPostsForPage(page: number): Post[] {
  const start = (page - 1) * POSTS_PER_PAGE;
  return getAllPosts().slice(start, start + POSTS_PER_PAGE);
}

/**
 * Related posts, ranked by shared tags then recency. Falls back to the most
 * recent posts when nothing shares a tag, so the slot is never empty.
 */
export function getRelatedPosts(slug: string, limit = 3): Post[] {
  const all = getAllPosts();
  const current = all.find((post) => post.slug === slug);
  if (!current) return [];

  return all
    .filter((post) => post.slug !== slug)
    .map((post) => ({
      post,
      shared: post.tags.filter((tag) => current.tags.includes(tag)).length,
    }))
    .sort((a, b) => b.shared - a.shared || b.post.date.localeCompare(a.post.date))
    .slice(0, limit)
    .map((entry) => entry.post);
}
