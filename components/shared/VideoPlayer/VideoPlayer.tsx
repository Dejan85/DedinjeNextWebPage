"use client";

import React, { useRef, useState } from "react";
import styles from "./VideoPlayer.module.css";

interface VideoPlayerProps {
  videoSrc: string;
  poster?: string;
  overlayText?: string;
  caption?: string;
  className?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoSrc,
  poster = "",
  overlayText = "Погледајте видео",
  caption,
  className = "",
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
      videoRef.current.setAttribute("controls", "controls");
      setIsPlaying(true);
    }
  };

  const handleVideoEnded = () => {
    if (videoRef.current) {
      videoRef.current.removeAttribute("controls");
      setIsPlaying(false);
    }
  };

  return (
    <div className={className}>
      <div className={styles.videoWrapperModern}>
        <video
          ref={videoRef}
          poster={poster}
          onEnded={handleVideoEnded}
          autoPlay
          muted
          loop
        >
          <source src={videoSrc} type="video/mp4" />
          Ваш претраживач не подржава видео таг.
        </video>
        <div
          className={styles.videoPlayOverlay}
          onClick={playVideo}
          style={{
            opacity: isPlaying ? 0 : 1,
            background: isPlaying
              ? "transparent"
              : "linear-gradient(135deg, rgba(42, 157, 244, 0.4) 0%, rgba(10, 37, 64, 0.3) 100%)",
            pointerEvents: isPlaying ? "none" : "all",
          }}
        >
          <div className={styles.playButtonLarge}>
            <i className="fas fa-play"></i>
          </div>
          <p>{overlayText}</p>
        </div>
      </div>
      {caption && (
        <div className={styles.videoCaption}>
          <i className="fas fa-video"></i>
          <span>{caption}</span>
        </div>
      )}
    </div>
  );
};
