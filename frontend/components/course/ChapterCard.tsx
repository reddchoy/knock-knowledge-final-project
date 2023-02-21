import { useState } from 'react';
import NotFound from '../layout/NotFound';
import ChapterSection from './ChapterSection';

interface Props {
  order: number;
  title: string;
  getSection: any;
  isBought: boolean;
  onClick: (text: string) => void;
}

const ChapterCard = ({ order, title, getSection, isBought, onClick }: Props) => {
  const isBrowser = () => typeof window !== 'undefined';
  const [toggle, setToggle] = useState(true);
  const [work, setWork] = useState<[{ order: number; title: string; content: string }] | null>();
  const [workPopup, setWorkPopup] = useState(false);
  return (
    <>
      <div className="chapterCard">
        <div className="chapterHeader" onClick={() => setToggle(!toggle)}>
          <div className="chapterTitle">
            <div>
              <b>Chapter {order} : </b>
              <p>{title}</p>
            </div>
            <i className={toggle ? 'bx bxs-chevron-down' : 'bx bxs-chevron-up'} />
          </div>
        </div>

        {toggle && getSection && (
          <>
            {getSection
              .sort((a: any, b: any) => (a.sectionOrderNum > b.sectionOrderNum ? 1 : -1))
              .map((e: any) => {
                const access = e.contentType === 'text' || !e.isLocked || isBought;
                return (
                  <section
                    key={e.id}
                    className={access ? 'hoverEffect' : ''}
                    style={{ cursor: access ? 'pointer' : 'auto' }}
                    onClick={() => {
                      if (e.contentType === 'video' && (!e.isLocked || isBought)) {
                        onClick(e.content);
                      } else if (e.contentType === 'text') {
                        setWork([
                          { order: e.sectionOrderNum, title: e.sectionName, content: e.content },
                        ]);
                        setWorkPopup(true);
                      }

                      if (access) {
                        if (!isBrowser()) return;
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                  >
                    <ChapterSection
                      name={e.sectionName}
                      lock={access ? false : true}
                      type={e.contentType}
                      order={e.sectionOrderNum}
                      content={e.content}
                    />
                  </section>
                );
              })}

            {workPopup && (
              <div className="work_popup_bg">
                <div className="work_popup">
                  <i
                    className="bx bx-x"
                    onClick={() => {
                      setWorkPopup(false);
                      setWork(null);
                    }}
                  />

                  {work ? (
                    <>
                      <header>
                        <div>
                          <i className="bx bxs-book-alt" />
                          <span> Chapter {order}</span>
                          <span>Section {work[0].order}</span>
                        </div>
                        <p>{work[0].title}</p>
                      </header>
                      <pre>{work[0].content}</pre>
                    </>
                  ) : (
                    <div className="error_msg">
                      <NotFound name="work" full />
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <style jsx>{`
        .chapterCard {
          display: flex;
          flex-direction: column;

          background: #fff;
          box-shadow: 0px 64px 50px -32px rgba(6, 7, 37, 0.03);
        }

        .chapterCard .chapterHeader {
          position: sticky;
          top: 0;

          display: flex;
          flex-direction: column;
          gap: 8px;

          padding: 18px 24px 16px;

          background: #fff;
          border-bottom: 1px solid #eee;

          cursor: pointer;
        }

        .chapterCard .chapterHeader .chapterTitle {
          display: flex;
          justify-content: space-between;
        }

        .chapterCard .chapterHeader .chapterTitle div {
          display: flex;
          gap: 8px;
        }

        .chapterCard .chapterHeader .chapterTitle div p {
          flex: 1;
        }

        .chapterCard .chapterHeader .chapterTitle i {
          font-size: 18px;
        }

        section {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 12px 24px;
        }

        section:not(:last-child) {
          border-bottom: 1px solid #eee;
        }

        .hoverEffect:hover {
          background: #eee;
        }

        .work_popup_bg {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 100;
          background: rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .work_popup {
          position: relative;
          max-width: 1152px;
          width: 80%;
          padding: 24px 0;
          background: rgba(255, 255, 255, 0.9);
        }

        .work_popup .bx-x {
          position: absolute;
          top: 0;
          right: 0;
          padding: 12px;
          font-size: 36px;

          cursor: pointer;
          &:hover {
            color: #666;
          }
        }

        .work_popup header {
          display: flex;
          gap: 24px;
          margin: 24px;
          font-size: 24px;
        }

        .work_popup header div {
          display: flex;
          align-items: center;
          gap: 16px;
          font-weight: bold;
        }

        .work_popup pre {
          height: 50vh;
          padding: 0 24px;
          white-space: pre-wrap;
          word-break: keep-all;

          line-height: 2rem;

          overflow-y: auto;
        }

        .error_msg {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @media only screen and (max-width: 425px) {
          .work_popup {
            width: 95%;
            height: 80vh;
          }

          .work_popup header {
            flex-direction: column;
            align-items: center;
            margin: 36px 0 24px;
          }

          .work_popup header div {
            font-size: 18px;
          }

          .work_popup header p {
            align-self: center;
          }
        }
      `}</style>
    </>
  );
};

export default ChapterCard;
