import { Blog } from "../../../lib/getBlogs";
import Link from "next/link";
import Image from "next/image";
import styles from "./BlogCard.module.css";

export default function BlogCard({ blog }: { blog: Blog }) {
  return (
    <Link href={`/blogs/${blog.slug}`} className={styles.link}>
      <article className={styles.card}>
        <div className={styles.imageWrapper}>
          <Image
            src={blog.image || "/images/default-blog.jpg"}
            alt={blog.title}
            width={600}
            height={400}
            className={styles.image}
            priority={false}
          />
        </div>

        <div className={styles.content}>
          <h2 className={styles.title}>{blog.title}</h2>
          <p className={styles.date}>{blog.date}</p>
          <p className={styles.summary}>{blog.summary}</p>
        </div>
      </article>
    </Link>
  );
}
