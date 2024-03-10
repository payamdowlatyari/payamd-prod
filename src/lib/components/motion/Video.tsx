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
    <div
      style={{
        maxWidth: "100vw",
        width: "400px",
        margin: "0 auto",
        position: "absolute",
      }}
    >
      <video
        playsInline
        loop
        muted
        controls
        autoPlay
        src="https://storage.googleapis.com/www.payamd.com/assets/img/bg74-comp-7m.mp4"
      />
    </div>
  );
}
