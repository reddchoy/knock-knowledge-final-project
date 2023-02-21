import { server } from '@/config';
import ChapterCard from './ChapterCard';
import VideoDuration from './VideoDuration';

interface Props {
  data: any;
  isBought: boolean;
  onClick: (text: string) => void;
}

const ChapterList = ({ data, isBought, onClick }: Props) => {
  return (
    <>
      <div className="chapterList">
        <div
          className="chapterCard"
          onClick={() => {
            onClick(data.courseIntroVideo);
          }}
        >
          <p>Introduction video</p>
          <VideoDuration content={data.courseIntroVideo} />
        </div>

        {data.chapters && (
          <>
            {data.chapters
              .sort((a: any, b: any) => (a.chapterOrderNum > b.chapterOrderNum ? 1 : -1))
              .map((e: any) => (
                <ChapterCard
                  key={e.id}
                  order={e.chapterOrderNum}
                  title={e.chapterName}
                  getSection={e.sections}
                  isBought={isBought}
                  onClick={(text) => onClick(text)}
                />
              ))}
          </>
        )}
      </div>
      <style jsx>{`
        .chapterList {
          flex: 1 1 30%;
          display: flex;
          flex-direction: column;
          gap: 24px;
          height: 456px;
          overflow-x: auto;
        }

        @media only screen and (max-width: 768px) {
          .chapterList {
            flex: none;
            height: auto;
            overflow-x: auto;
          }
        }

        .chapterCard {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px;
          font-weight: bold;
          box-shadow: 0px 64px 50px -32px rgba(6, 7, 37, 0.03);
          border-bottom: 1px solid #eee;
          background: #fff;
          cursor: pointer;
        }

        .chapterCard:hover {
          background: #eee;
        }
      `}</style>
    </>
  );
};

export default ChapterList;
