"use client";

import { useState } from "react";
import styles from "./page.module.css";

export function YouTubeThumbnail({ youtubeId }: { youtubeId: string }) {
  return (
    <img
      src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
      alt=""
      className={styles.thumbnail}
      loading="lazy"
    />
  );
}

export default function GostovanjeVideo({ youtubeId, title }: { youtubeId: string; title: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className={styles.videoWrapper}>
      {playing ? (
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className={styles.iframe}
        />
      ) : (
        <button
          type="button"
          className={styles.thumbnailBtn}
          onClick={() => setPlaying(true)}
          aria-label="Пусти видео"
        >
          <YouTubeThumbnail youtubeId={youtubeId} />
          <div className={styles.playOverlay}>
            <div className={styles.playBtn}>
              <i className="fas fa-play" aria-hidden />
            </div>
          </div>
        </button>
      )}
    </div>
  );
}
