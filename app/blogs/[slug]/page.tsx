import { getBlogs } from "@/app/lib/getBlogs";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { remark } from "remark";
import html from "remark-html";
import styles from "../BlogPost.module.css";

type Props = { params: Promise<{ slug: string }> };

// Force static rendering for SEO-friendly static pages
export const dynamic = "force-static";

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;

  const blogs = getBlogs();
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) return notFound();

  const contentHtml = String(
    await remark()
      .use(html)
      .process(blog.content || "")
  );

  return (
    <main className={styles.container}>
      <nav className={styles.nav}>
        <Link href="/blogs" className={styles.backLink}>
          &larr; Back to Blogs
        </Link>
      </nav>

      <article className={styles.article}>
        {blog.image && (
          <div className={styles.imageWrapper}>
            <Image
              src={blog.image}
              alt={blog.title}
              width={1200}
              height={600}
              className={styles.image}
              priority
            />
          </div>
        )}

        <div className={styles.header}>
          <h1 className={styles.title}>{blog.title}</h1>
          <p className={styles.meta}>
            <span className={styles.date}>{blog.date}</span>
            {blog.author && (
              <>
                {" "}
                • <span className={styles.author}>{blog.author}</span>
              </>
            )}
          </p>
        </div>

        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </article>
    </main>
  );
}
