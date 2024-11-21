import React, { useEffect, useState } from "react";
import axios from "axios";

type Props = {
  videoUrl: string;
  title: string;
};

const CoursePlayer = ({ videoUrl, title }: Props) => {
  const [videoData, setVideoData] = useState({
    otp: "",
    playbackInfo: "",
  });

  useEffect(() => {
    axios
      .post(`http://localhost:4000/api/v1/get-vdo-cipherOTP`, {
        videoId: videoUrl,
      })
      .then((res: any) => {
        console.log(res);
        setVideoData(res.data);
      });
  }, [videoUrl]);
  return (
    <div style={{ paddingTop: "41%", position: "relative" }}>
      {/* Render video player here */}
      {videoData.otp && videoData.playbackInfo && (
        <iframe
          src={`https://player.vdocipher.com/v2/?otp=${videoData.otp}&playbackInfo=${videoData.playbackInfo}&player=Sl163LYDb4zXuPeL`}
          style={{
            border: 0,
            height: "100%",
            width: "90%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
          allowFullScreen={true}
          allow="encrypted-media"
          title={title}
        ></iframe>
      )}
    </div>
  );
};

export default CoursePlayer;
