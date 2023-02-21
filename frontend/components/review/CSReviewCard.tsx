/* eslint-disable @next/next/no-img-element */
import ReviewStar from './ReviewStar';

interface Props {
  content: string;
  icon?: string;
  username: string;
  courseRating: number;
  column?: boolean;
}

const CSReviewCard = ({ content, icon, username, courseRating, column }: Props) => {
  return (
    <>
      <div className={`cs_review_card ${column && 'cs_review_card_column'}`}>
        <header>{content}</header>

        <div className={`user_info ${column && 'user_info_column'}`}>
          <div className="user_icon">
            {icon ? <img src={icon} alt="" /> : <i className="bx bx-user" />}
          </div>
          <div className="user_name">
            <div>{username}</div>
            <div>
              <ReviewStar rating={courseRating} />
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .cs_review_card {
          flex: 0 0 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-self: stretch;
          gap: 24px;

          max-width: 300px;
          padding: 32px 24px;

          background: #fff;
          box-shadow: 0px 64px 50px -32px rgba(6, 7, 37, 0.03);
          scroll-snap-align: start;
        }

        .cs_review_card_column {
          flex-direction: column-reverse;
          max-width: initial;
        }

        .cs_review_card .user_info {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .cs_review_card .user_info .user_name {
          display: flex;
          flex-direction: column;
          gap: 6px;

          font-weight: bold;
        }

        .cs_review_card .user_info .user_icon {
          display: flex;
          align-items: center;
          justify-content: center;

          width: 40px;
          height: 40px;

          border-radius: 100%;
        }
        .cs_review_card .user_info .user_icon img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 100%;
        }

        .cs_review_card .user_info .user_icon i {
          padding: 8px;
          font-size: 20px;
          border: 2px solid #000;
          border-radius: 100%;
        }

        .cs_review_card .user_info_column {
          gap: 18px;
        }

        .cs_review_card .user_info_column .user_name {
          gap: 8px;
        }
      `}</style>
    </>
  );
};

export default CSReviewCard;
