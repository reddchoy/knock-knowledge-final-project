import VideoDuration from './VideoDuration';

interface Props {
  name: string;
  lock: boolean;
  type: string;
  order: number;
  content: string;
}

const ChapterSection = ({ name, lock, type, order, content }: Props) => {
  return (
    <>
      <div className="section">
        <div>
          <i
            className={`bx ${
              lock ? 'bxs-lock' : type === 'video' ? 'bx-play-circle' : 'bxs-book-alt'
            }`}
          />
          <p>Section {order}</p>
        </div>
        <div>
          <VideoDuration content={content} />
        </div>
      </div>
      <div className="sectionTitle">{name}</div>

      <style jsx>{`
        .section {
          display: flex;
          justify-content: space-between;
          font-weight: bold;
        }

        .section div {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .sectionTitle {
          margin-left: 24px;
        }
      `}</style>
    </>
  );
};

export default ChapterSection;
