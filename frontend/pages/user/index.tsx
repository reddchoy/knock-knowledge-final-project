/* eslint-disable @next/next/no-img-element */
import CourseList from '@/components/course/CourseList';
import NotFound from '@/components/layout/NotFound';
import UserRouteGuard from '@/components/guard/UserRouteGuard';
import { server } from '@/config';
import { User } from '@/models/User';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import Loader from "../../components/layout/Loader";

interface Course {
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

const fetcher = (...args: [string]) =>
  fetch(...args, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }).then((res) => res.json());

const UserProfile = () => {
  // const [courseData, setCourseData] = useState<Course[]>([]);
  // const [userData, setUserData] = useState<User>();
  const { data: userData, error: userError } = useSWR<User, any>(
    `${server}/user/getCurrentUser`,
    fetcher
  );
  const { data: courseData, error: courseError } = useSWR<Course[], any>(
    `${server}/user/orderedCourses`,
    fetcher
  );

  if (userError || courseError) return <NotFound name="Profile" />
  if (!userData || !courseData) return <Loader/>

  // useEffect(() => {
  //   const getOrderedCourse = async () => {
  //     const res = await fetch(`${server}/user/orderedCourses`, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${localStorage.getItem('token')}`,
  //       },
  //     });
  //     const data: Course[] = await res.json();
  //     if (data.length > 0) {
  //       setCourseData(data);
  //     }
  //   };
  //   if (courseData.length === 0) {
  //     getOrderedCourse();
  //   }
  // }, [courseData]);

  // useEffect(() => {
  //   const getCurrentUser = async () => {
  //     const res = await fetch(`${server}/user/getCurrentUser`, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${localStorage.getItem('token')}`,
  //       },
  //     });

  //     const data: User = await res.json();
  //     setUserData(data);
  //   };
  //   if (!userData) {
  //     getCurrentUser();
  //   }
  // }, [userData]);

  return (
    <UserRouteGuard>
      <>
        {
          <div className="header">
            <div className="header-inner">
              <div className="user-icon">
                {userData.userProfiles[0].icon ? (
                  <img src={userData.userProfiles[0].icon} alt="" />
                ) : (
                  <i className="bx bx-user" />
                )}
              </div>
              <div className="user-info">
                <div className="user-name">{userData.username}</div>
                <p>
                  {userData?.userProfiles[0]
                    ? userData.userProfiles[0].description
                    : 'Lorem ipsum dolor sit amet arcu duis integer. Blandit erat turpis luctus scelerisque sed iaculis euismod sodales volutpat condimentum dictum curabitur aliquam.'}
                </p>
              </div>
            </div>
          </div>
        }

        <div className="tab">
          <div className="menu">
            <ul className="tab-menu">
              <li>
                <i className="bx bxs-videos" />
                My Course
              </li>
              {/* <li>
                <i className="bx bxs-file" />
                Article
              </li>
              <li>
                <i className="bx bxs-book-alt" />
                Homework
              </li>
              <li>
                <i className="bx bxs-bookmark-alt" />
                Bookmark
              </li> */}
            </ul>
            {/* <ul className="sub-menu">
              <li>
                <b>My Course</b>
              </li>
            </ul> */}
          </div>
        </div>

        <div className="tab-content">
          {courseData.length > 0 ? <CourseList data={courseData} /> : <NotFound name="course" />}
        </div>

        <style jsx>{`
          .header {
            position: relative;
            margin: -24px -24px 0;
            padding: 60px 48px 80px;
            background: #fff;
          }

          .header-inner {
            display: flex;
            gap: 36px;
          }

          .user-icon {
            margin-top: 8px;
            width: 72px;
            height: 72px;
            border-radius: 100%;
            overflow: hidden;
          }

          .user-icon img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .user-icon i {
            padding: 16px;
            font-size: 36px;
            border: 2px solid #000;
            border-radius: 100%;
          }

          .user-info {
            flex: 0 0 60%;
            display: flex;
            flex-direction: column;
            gap: 18px;
          }

          .user-info .user-name {
            font-size: 36px;
            font-weight: bold;
            color: #264653;
          }

          .user-info p {
            color: #333;
            line-height: 24px;
          }

          .tab {
            position: sticky;
            margin-top: -36px;
          }

          .tab .tab-menu {
            display: flex;
            justify-content: space-between;
            background: #fff;
            box-shadow: 0px 7px 29px rgba(6, 7, 37, 0.03);
            overflow-x: auto;
          }

          .tab .tab-menu li {
            display: flex;
            align-items: center;
            gap: 16px;
            padding: 24px 36px;
            font-size: 18px;
            cursor: pointer;
          }

          .tab .tab-menu li:hover,
          .tab .tab-menu li:hover i {
            color: #666;
          }

          .tab .tab-menu li i {
            font-size: 24px;
          }

          .tab .sub-menu {
            display: flex;
            padding: 0 24px;
          }

          .tab .sub-menu li {
            padding: 48px 24px;
            font-size: 18px;
          }

          .tab-content {
            margin-top: 60px;
          }

          @media only screen and (max-width: 1024px) {
            .user-info {
              flex: 1;
            }
          }

          @media only screen and (max-width: 425px) {
            .header {
              padding: 24px 48px 60px;
            }

            .header-inner {
              display: flex;
              flex-direction: column;
              gap: 36px;
            }

            .tab .tab-menu li {
              padding: 24px;
            }
          }
        `}</style>
      </>
    </UserRouteGuard>
  );
};

export default UserProfile;
