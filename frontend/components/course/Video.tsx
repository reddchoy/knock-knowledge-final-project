import { useEffect, useRef } from 'react';

interface Props {
  url: string;
}

const Video = ({ url }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current?.load();
  }, [url]);

  return (
    <>
      <video ref={videoRef} width="100%" height="100%" controls autoPlay>
        <source src={url} />
        Your browser does not support the video tag.
      </video>
    </>
  );
};

export default Video;
