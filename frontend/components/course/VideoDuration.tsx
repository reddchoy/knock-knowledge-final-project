import { useRef, useState } from 'react';
import moment from 'moment';

interface Props {
  content?: string;
}

const VideoDuration = ({ content }: Props) => {
  const videoEl = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState<string>();

  const handleLoadedMetadata = () => {
    const video = videoEl?.current;
    if (!video) return;

    if (moment.unix(video.duration).utc().get('hour') === 0) {
      setDuration(moment.unix(video.duration).utc().format('mm[:]ss'));
    } else {
      setDuration(moment.unix(video.duration).utc().format('HH[:]mm[:]ss'));
    }
  };

  return (
    <>
      <video
        style={{ display: 'none' }}
        src={content}
        ref={videoEl}
        onLoadedMetadata={handleLoadedMetadata}
      />
      {duration}
    </>
  );
};

export default VideoDuration;
