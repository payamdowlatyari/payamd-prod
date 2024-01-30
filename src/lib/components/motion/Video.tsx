import { scroll } from "framer-motion/dom";

export default function VideoPlay() {
  const video = document.querySelector("video");

  if (video) {
    video.pause();

    // Scrub through the video on scroll
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
        autoPlay={true}
        loop
        src="https://storage.googleapis.com/www.payamd.com/Portfolio/stuff-5575178-1080p.mp4"
      ></video>
    </div>
  );
}
