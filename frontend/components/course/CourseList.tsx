import { Prosto_One } from '@next/font/google';
import NotFound from '../layout/NotFound';
import CourseCard from './CourseCard';

interface Props {
  data: CourseDetail[];
}

interface CourseDetail {
  id: number;
  name: string;
  duration: number;
  review: number;
  rating: number;
  image: string;
  classmate: number;
  videoNum: number;
  price: number;
}

const CourseList = (props: Props) => {
  return (
    <>
      <div className="list">
        {props.data?.length !== 0 ? (
          <>
            {props.data.map((e) => (
              <CourseCard
                key={e.id}
                id={e.id}
                name={e.name}
                duration={e.duration}
                review={e.review}
                rating={e.rating}
                image={e.image}
                classmate={e.classmate}
                videoNum={e.videoNum}
                price={e.price}
              ></CourseCard>
            ))}
          </>
        ) : (
          <NotFound name="course" />
        )}
      </div>
      <style jsx>{`
        .list {
          display: grid;
          grid-template-columns: repeat(3, minmax(30%, 1fr));
          gap: 48px;
        }

        @media only screen and (max-width: 1024px) {
          .list {
            grid-template-columns: repeat(2, minmax(50%, 1fr));
            gap: 36px;
          }
        }

        @media only screen and (max-width: 768px) {
          .list {
            grid-template-columns: repeat(2, minmax(40%, 1fr));
          }
        }

        @media only screen and (max-width: 425px) {
          .list {
            grid-template-columns: repeat(1, minmax(100%, 1fr));
          }
        }
      `}</style>
    </>
  );
};

export default CourseList;
