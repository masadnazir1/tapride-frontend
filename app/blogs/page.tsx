import { getBlogs } from "../lib/getBlogs";
import BlogCard from "../components/sections/BlogCard/BlogCard";
import BlogFullWidth from "../components/sections/BlogCard/BlogFullWidth";
import styles from "./BlogsPage.module.css";
import Head from "next/head";
import PageHead from "../components/ui/PageHead/PageHead";

export default function BlogsPage() {
  const blogs = getBlogs();

  return (
    <>
      <Head>
        <title>Tapride Blog – Car Booking & Travel Guides</title>
        <meta
          name="description"
          content="Read Tapride Blog for car rental tips, travel guides, and ride booking advice across Pakistan. Explore Northern Pakistan safely and conveniently."
        />
        <meta
          name="keywords"
          content="Tapride, car booking Pakistan, car rentals, travel guides, Northern Pakistan trips, ride booking"
        />
      </Head>

      <PageHead
        title="Tapride Blog – Car Booking & Travel Guides"
        subtitle="Explore our latest tips, travel guides, and ride booking advice across Pakistan. Learn how to book your ride safely and conveniently."
        bgImage="/images/bg.jpg"
        overlay={true}
        overlayColor="rgba(0, 0, 0, 0.75)"
        gradientFrom="transparent"
        gradientTo="transparent"
        // height="340px"
      />

      <main className={styles.container}>
        <h1 className={styles.heading}>Tapride Blog</h1>

        <div className={styles.blogGrid}>
          {blogs.map((blog) =>
            blog.fullWidth ? (
              <BlogFullWidth key={blog.slug} blog={blog} />
            ) : (
              <BlogCard key={blog.slug} blog={blog} />
            )
          )}
        </div>
      </main>
    </>
  );
}
