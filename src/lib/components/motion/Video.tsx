import { scroll } from "framer-motion/dom";

export default function VideoPlay() {
  const video = document.querySelector("video");

  if (video) {
    video.pause();

    scroll((progress) => {
      if (video.readyState) {
        video.currentTime = video.duration * progress;
      }
    });
  }

  return (
    <div className="video-container">
      <video
        muted
        autoPlay
        loop
        src="https://storage.googleapis.com/www.payamd.com/Portfolio/stuff-5575178-1080p.mp4"
      />
    </div>
  );
}
