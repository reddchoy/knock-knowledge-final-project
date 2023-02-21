/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { server, url } from '@/config';
import Button from '@/components/layout/Button';
import ChapterList from '@/components/course/ChapterList';
import CourseContent from '@/components/course/CourseContent';
import CSReviewList from '@/components/review/CSReviewList';
import Video from '@/components/course/Video';
import CSReviewForm from '@/components/review/CSReviewForm';
import { useAppSelector } from '@/redux/store';
import NotFound from '@/components/layout/NotFound';
import ReviewStar from '@/components/review/ReviewStar';
import Meta from '@/components/layout/Meta';
import Link from 'next/link';
import Loader from "@/components/layout/Loader";

interface Props {
  openPopup: (e: boolean) => void;
  refreshCounter: (e: boolean) => void;
}

const CourseDetail = ({ openPopup, refreshCounter }: Props) => {
  const router = useRouter();
  const { id } = router.query;
  const [isLoading, setLoading] = useState(false)
  const [data, setData] = useState<any>({});
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [isBought, setIsBought] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [contentPage, setIsContentPage] = useState(true);
  const [reviewPage, setIsReviewPage] = useState(false);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const [userReviewed, setUserIsReviewed] = useState(false);
  const [inCart, setInCart] = useState(false);
  // const [userProfile, setUserProfile] = useState<any>({});

  const addToCart = async () => {
    const resp = await fetch(`${server}/user/shoppingCart/add/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await resp.json();

    switch (data.message) {
      case 'course added':
        setInCart(true);
        refreshCounter(true);
        break;
      case 'course added already':
        router.push('/shoppingCart');
        break;
      case 'Unauthorized':
        openPopup(true);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const checkToCart = async () => {
      const resp = await fetch(`${server}/user/shoppingCart/check/${id}`, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await resp.json();
      data.message === 'Unauthorized' ? setInCart(false) : setInCart(data.message);
    };

    const checkOrder = async () => {
      const resp = await fetch(`${server}/user/check/order/${id}`, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await resp.json();

      data.message === true && setIsBought(true);
    };

    const getCourse = async () => {
      setLoading(true)
      const resp = await fetch(`${server}/courses/detail/${id}`, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      });
      const data = await resp.json();
      setData(data);
      setHour(Math.floor(data.courseTotalDuration / 60));
      setMinute(data.courseTotalDuration % 60);
      setLoading(false)
      // setUserProfile(data.owner.userProfiles[0]);
    };
    if (id) {
      getCourse();

    }
    if(isAuthenticated){
      checkOrder();
      checkToCart();
    }
  }, [id, isBought, isAuthenticated]);

  useEffect(() => {
    const checkReviewed = async () => {
      const res = await fetch(`${server}/user/review/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await res.json();
      if (data.length > 0) {
        setUserIsReviewed(true);
      }
    };
    if (id && isAuthenticated) {
      checkReviewed();
    }
  }, [id, userReviewed, isAuthenticated]);

  if (isLoading) return <Loader/>

  return (
    <>
      {data && data.owner ? (
        <>
          <Meta title={`${data.name} | Course | Knock Knowledge`} />
          <div className="courseTitle">
            <p>{data.name}</p>
            <div className="share">
              <Link
                href={`https://www.facebook.com/sharer/sharer.php?u=${url + router.asPath}`}
                target="_blank"
              >
                <i className="bx bxl-facebook" />
              </Link>
              <Link
                href={`https://wa.me/?text=I want to share Knock Knowledge. for you.
                  ${url + router.asPath}`}
                target="_blank"
              >
                <i className="bx bxl-whatsapp" />
              </Link>
              <Link
                href={`https://telegram.me/share/url?url=I want to share Knock Knowledge. for you.
                  ${url + router.asPath}`}
                target="_blank"
              >
                <i className="bx bxl-telegram" />
              </Link>
            </div>
            {/* <i className="bx bx-bookmark-alt" /> */}
          </div>

          <div className="courseVideo">
            <div className="video">
              <Video url={videoUrl ? videoUrl : data.courseIntroVideo} />
            </div>
            <ChapterList data={data} isBought={isBought} onClick={(text) => setVideoUrl(text)} />
          </div>

          <div className="courseContent">
            <div className="content">
              <ul className="courseContentMenu">
                <li
                  onClick={() => {
                    setIsContentPage(true);
                    setIsReviewPage(false);
                  }}
                >
                  <i className="bx bxs-videos" />
                  Introduction
                </li>
                <li
                  onClick={() => {
                    setIsReviewPage(true);
                    setIsContentPage(false);
                  }}
                >
                  <i className="bx bxs-star" />
                  review
                </li>
                {/* <li>
                  <i className="bx bxs-chat" />
                  enquires
                </li>
                <li>
                  <i className="bx bxs-book-alt" />
                  works
                </li> */}
              </ul>
              <section>
                {contentPage && <CourseContent content={data.longDescription} />}
                {reviewPage && isAuthenticated && isBought && !userReviewed && <CSReviewForm />}
                {reviewPage && <CSReviewList datas={data.reviews} column={true} />}
              </section>
            </div>
            <div className="sideBar">
              <div className="buyCard">
                {!isBought ? (
                  <>
                    <div className="price">HKD${data.currentPrice}</div>
                    <div className="reviews">
                      <ReviewStar rating={data.rating} />
                      <small>{data.reviews.length} reviews</small>
                    </div>

                    <small>
                      {data.videoNum} videos{/** ・ {hour}h {minute}m */}・ {data.classmate}{' '}
                      classmates
                    </small>

                    <Button
                      onButton={addToCart}
                      txt={inCart ? `CHECK OUT` : 'ADD TO CART'}
                      color={inCart ? `#E76F51` : '#2A9D8F'}
                    />
                  </>
                ) : (
                  <div className="purchased-msg">
                    <i className="bx bxs-happy-alt" />
                    This course has been purchased.
                  </div>
                )}
              </div>
            </div>
          </div>
          {data.owner.userProfiles.length > 0 ? (
            <>
              <div className="courseTeacher">
                <div className="courseTeacherTitle">
                  <p className="title">About Teacher</p>
                  <p className="name">{data.owner.username}</p>
                </div>

                <div className="courseTeacherContent">
                  <div className="courseTeacherPicture">
                    {data.owner.userProfiles[0].icon ? (
                      <img src={data.owner.userProfiles[0].icon} alt="" />
                    ) : (
                      <i className="bx bx-user" />
                    )}
                  </div>
                  <p>{data.owner.userProfiles[0].description}</p>
                </div>
              </div>
            </>
          ) : (
            <NotFound name="teacher" />
          )}
        </>
      ) : (
        <NotFound name="course" full />
      )}

      <style jsx>{`
        .courseTitle {
          display: flex;
          justify-content: space-between;

          width: 100%;
          margin-bottom: 24px;
        }

        .courseTitle p {
          font-size: 36px;
          font-weight: bold;
          color: #264653;
        }

        .courseTitle .share {
          display: flex;
          gap: 16px;
        }

        .courseTitle i {
          padding: 8px;
          font-size: 28px;
          color: #264653;
        }

        .courseTitle i:hover {
          opacity: 0.75;
        }

        .courseVideo,
        .courseContent {
          display: flex;
          justify-content: space-between;
          gap: 24px;
          margin-bottom: 24px;
        }

        .courseVideo .video {
          flex: 0 0 70%;

          display: flex;
          justify-content: center;
          align-items: center;

          width: 100%;
          height: 456px;

          font-size: 64px;
          background: #000;
        }

        .courseContent .content {
          position: relative;
          flex: 0 0 70%;
          width: 70%;
        }

        .courseContent .content section {
          padding: 48px 0;
        }

        .courseContent .sideBar {
          width: 100%;
          padding-right: 10px;
        }

        .courseContent .buyCard {
          display: flex;
          flex-direction: column;
          gap: 12px;

          padding: 24px;
          background: #fff;
          box-shadow: 0px 64px 50px -32px rgba(6, 7, 37, 0.03);
        }

        .courseContent .buyCard small {
          color: #666;
        }

        .courseContent .buyCard .reviews {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .courseContent .buyCard .reviews .star {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .courseContent .buyCard .price {
          font-size: 36px;
          font-style: italic;
          font-weight: bold;
          color: #e76f51;
        }

        .courseContent .purchased-msg {
          display: flex;
          align-items: center;
          color: #2a9d8f;
          font-weight: bold;
          gap: 8px;
        }

        .courseContent .purchased-msg i {
          color: #2a9d8f;
        }

        .courseContent .content .courseContentMenu {
          display: flex;
          justify-content: space-around;
          width: 100%;
          border-top: 1px solid rgba(30, 30, 47, 0.1);
          border-bottom: 1px solid rgba(30, 30, 47, 0.1);
        }

        .courseContent .content .courseContentMenu li {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 24px;
          font-size: 18px;
          font-weight: bold;
          text-transform: uppercase;
          cursor: pointer;
        }

        .courseContent .content .courseContentMenu li:hover,
        .courseContent .content .courseContentMenu li:hover i {
          color: #666;
        }

        .courseTeacher {
          display: flex;
          flex-direction: column;
          gap: 24px;
          margin-top: 32px;
          padding-top: 32px;
          border-top: 1px solid rgba(30, 30, 47, 0.1);
        }

        .courseTeacher .courseTeacherTitle {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .courseTeacher .courseTeacherTitle .title {
          font-size: 32px;
          font-weight: bold;
        }

        .courseTeacher .courseTeacherTitle .name {
          font-size: 24px;
          font-weight: bold;
        }

        .courseTeacher .courseTeacherContent {
          display: flex;
          align-items: center;
          gap: 36px;
        }

        .courseTeacher .courseTeacherContent .courseTeacherPicture {
          display: flex;
          align-items: center;
          justify-content: center;

          width: 80px;
          height: 80px;

          border-radius: 100%;
          background: #fff;
          overflow: hidden;
        }

        .courseTeacher .courseTeacherContent .courseTeacherPicture img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .courseTeacher .courseTeacherContent i {
          padding: 24px;
          font-size: 24px;
          border: 2px solid #000;
          border-radius: 100%;
          background: #fff;
        }

        .courseTeacher .courseTeacherContent p {
          flex: 1;
        }

        @media only screen and (max-width: 1024px) {
          .courseContent .buyCard .price {
            font-size: 32px;
          }
          .courseContent .buyCard small {
            font-size: 12px;
          }
        }

        @media only screen and (max-width: 768px) {
          .courseTitle .share {
            gap: 6px;
          }

          .courseVideo {
            flex-direction: column;
          }

          .courseVideo .video {
            flex: none;
          }

          .courseContent {
            flex-direction: column-reverse;
          }

          .courseContent .content {
            width: 100%;
          }

          .courseContent .sideBar {
            padding-right: 0;
          }
        }

        @media only screen and (max-width: 425px) {
          .courseTitle {
            flex-direction: column;
            gap: 16px;
          }

          .courseTitle p,
          .courseTitle i {
            font-size: 32px;
          }

          .courseTitle .share {
            align-self: flex-end;
          }

          .courseVideo .video {
            height: 256px;
          }

          .courseContent .content section {
            padding: 24px 0;
          }

          .courseContent .content .courseContentMenu {
            justify-content: flex-start;
            overflow-x: scroll;
          }

          .courseContent .content .courseContentMenu li {
            padding: 24px 24px;
            font-size: 16px;
          }

          .courseTeacher .courseTeacherTitle,
          .courseTeacher .courseTeacherContent {
            flex-direction: column;
          }
        }
      `}</style>
    </>
  );
};

export default CourseDetail;
