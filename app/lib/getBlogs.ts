import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Corrected directory path
const blogsDirectory = path.join(process.cwd(), "app", "blogs", "blogsMds");

export type Blog = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  image?: string;
  author?: string;
  tags?: string[];
  fullWidth?: boolean;
  content?: string;
};

export function getBlogs(): Blog[] {
  const files = fs.readdirSync(blogsDirectory);

  const blogs = files.map((filename) => {
    const filePath = path.join(blogsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContents);

    return {
      slug: filename.replace(/\.md$/, ""),
      title: data.title || "Untitled Blog",
      date: data.date || new Date().toISOString(),
      summary: data.summary || "",
      image: data.image || "/images/default-blog.jpg",
      author: data.author || "TapRide Editorial",
      tags: data.tags || [],
      fullWidth: data.fullWidth || false,
      content,
    };
  });

  // Sort newest first
  return blogs.sort((a, b) => (a.date < b.date ? 1 : -1));
}
