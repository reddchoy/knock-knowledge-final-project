/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import Image from 'next/image';
import ReviewStar from '../review/ReviewStar';

interface Props {
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

const CourseCard = (props: Props) => {
  const hour = Math.floor(props.duration / 60);
  const minute = props.duration % 60;
  return (
    <>
      <div className="courseCard">
        <Link href={`/course/${props.id}`}>
          <div className="courseCard_image">
            {props.image ? <img src={props.image} alt="" /> : <i className="bx bx-image" />}
          </div>
        </Link>
        <div className="courseCard_header">
          <Link href={`/course/${props.id}`}>
            <p>{props.name}</p>
          </Link>
          {/* <i className="bx bx-bookmark-alt" /> */}
        </div>
        <hr />
        <small>
          {props.videoNum} videos{/**  ・ {hour}h {minute}m */} ・ {props.classmate} classmates
        </small>
        <div className="courseCard_footer">
          <div className="review">
            <ReviewStar rating={props.rating ? props.rating : 0} />
            <small>{props.review ? props.review : 0} reviews</small>
          </div>
          <div className="price">HKD${props.price}</div>
        </div>
      </div>
      <style jsx>{`
        .courseCard {
          max-width: 432px;
          width: 100%;
        }

        .courseCard_image {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 240px;
          font-size: 64px;
          background: #fff;
          box-shadow: 0px 64px 50px -32px rgba(6, 7, 37, 0.03);
        }

        .courseCard_image i {
          color: #ccc;
        }

        .courseCard_image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: 0 65%;
        }

        .courseCard_header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 24px 0 0;
          font-size: 24px;
        }

        .courseCard_header p {
          font-weight: bold;
        }

        hr {
          margin: 12px 0;
          border: 1px solid #f5f5f5;
        }

        small {
          font-size: 14px;
          color: #666666;
        }

        .courseCard_footer {
          display: flex;
          justify-content: space-between;
          padding: 18px 0;
        }

        .courseCard_footer .review {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .courseCard_footer .review .star {
          display: flex;
          gap: 6px;
        }

        .courseCard_footer .price {
          color: #e76f51;
          font-size: 24px;
          font-weight: bold;
          font-style: italic;
        }
      `}</style>
    </>
  );
};

export default CourseCard;
