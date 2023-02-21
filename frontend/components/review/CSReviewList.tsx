import CSReviewCard from './CSReviewCard';
import NotFound from '../layout/NotFound';

interface Props {
  datas: ReviewCard[];
  column?: boolean;
}

interface ReviewCard {
  content: string;
  username: string;
  courseRating: number;
  id: number;
  user: {
    username: string;
    userProfiles: [
      {
        icon?: string;
      }
    ];
  };
}
const CSReviewList = (props: Props) => {
  return (
    <>
      <div className={`cs_review_list ${props.column && 'cs_review_list_column'}`}>
        {props.datas.length > 0 ? (
          props.datas
            .sort((a: any, b: any) => (a.id < b.id ? 1 : -1))
            .map((data) =>
              data.user.userProfiles.length > 0 ? (
                <CSReviewCard
                  content={data.content}
                  icon={data.user.userProfiles[0].icon}
                  username={data.user.username}
                  courseRating={data.courseRating}
                  column={props.column}
                  key={data.id}
                />
              ) : (
                <CSReviewCard
                  content={data.content}
                  username={data.user.username}
                  courseRating={data.courseRating}
                  column={props.column}
                  key={data.id}
                />
              )
            )
        ) : (
          <NotFound name="review" review />
        )}
      </div>
      <style jsx>{`
        .cs_review_list {
          display: flex;
          align-items: center;
          gap: 36px;

          max-width: 1440px;
          padding: 0 48px 48px 48px;

          overflow-x: scroll;
          scroll-snap-type: x mandatory;
          scroll-padding: 48px;
        }

        .cs_review_list_column {
          flex-direction: column;
          align-items: inherit;
          max-width: 100%;
          padding: 0;

          overflow-x: initial;
          scroll-snap-type: initial;
          scroll-padding: initial;
        }

        .cs_review_list::-webkit-scrollbar {
          display: none;
        }

        .cs_review_list:hover::-webkit-scrollbar {
          display: initial;
        }

        @media only screen and (max-width: 1024px) {
          .cs_review_list {
            width: 100vw;
          }
        }

        @media only screen and (max-width: 425px) {
          .cs_review_list {
            padding: 0 20px;
          }

          .cs_review_list_column {
            padding: 0;
          }
        }
      `}</style>
    </>
  );
};

export default CSReviewList;
