"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styles from "./page.module.css";

export default function AnnouncementDetail() {
  const params = useParams();
  const slug = params.slug;
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    fetch("/api/discover/corporate-announcements?slug=" + slug)
      .then(res => res.json())
      .then(data => {
        setData(Array.isArray(data) ? data[0] : data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.card} style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h1 className={styles.title} style={{ fontSize: "2rem" }}>{data?.title || "Announcement"}</h1>
        <div className={styles.cardContent}>
          <p>{data?.content || data?.description || "No details found."}</p>
          {data?.date && <p style={{ marginTop: "1rem", color: "#94a3b8" }}>{data.date}</p>}
        </div>
      </div>
    </div>
  );
}
