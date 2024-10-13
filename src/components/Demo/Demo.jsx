import React from "react";

export default function Demo() {
  return (
    <div className="flex flex-col items-center my-5 mt-20 justify-center">
      <h1 className="text-4xl m-5 mb-16">Demo</h1>
      <div className="h-auto w-3/4 mx-10 bg-zinc-700 border">
        <video
          src="https://res.cloudinary.com/dpysbb5wf/video/upload/v1723836979/Demo_tsda7h.mp4"
          autoPlay
          loop
          muted
          controls
          className="w-full h-full object-cover"
        ></video>
      </div>
    </div>
  );
}
